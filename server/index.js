import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import env from "dotenv";
import cors from "cors";
import bcrypt from "bcryptjs";
import db from "./db.js";
import session from "express-session";
import http from "http";
//import configureSocket from './socket.js';
import { Server } from 'socket.io';

const app = express();
const port = 3000;
env.config();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
})); 
app.use(bodyParser.json());
db.connect();

app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: 'lax'
    }
}));

const server = http.createServer(app);

const connectedUsers = new Map();
const io = new Server(server, {
    cors: {
    origin: process.env.FRONT_URL,
    methods: ["GET", "POST"],
    credentials: true
   }
 });

io.on('connection', (socket) => {    
    socket.on('user_connected', (username) => {
        connectedUsers.set(socket.id, username);
        console.log(`${username} connected succesfully with socket.id: ${socket.id}`);
    });

    socket.on('disconnect', () => {
        const username = connectedUsers.get(socket.id);
        if(username){
            connectedUsers.delete(socket.id);
            console.log(`${username} disconnected`);
        }
    });

    io.engine.on("connection_error", (err) => {
        console.log(err.req);      
        console.log(err.code);    
        console.log(err.message);
        console.log(err.context);
    });

    function notifyUser(username, invitation) {
        const userSocketId = connectedUsers.get(username);
        if(userSocketId){
            io.to(userSocketId).emit('new_invitation', invitation);
        }
    }
}); 




const isAuthenticated = (req, res, next) => {
    if(req.session.user){
        next();
    }else{
        res.status(403).json({redirect: '/', errorMessage: 'You must be logged in'});
    }
}

app.post('/welcome/login', async (req, res) => {
    const username = req.body.user;
    const password = req.body.pass;

    const result = (await db.query(
        "SELECT * FROM users WHERE username = $1 OR email = $2",
        [username, username])).rows[0];
    
    if(!result){
        return res.status(403).json({errorMessage: 'Unkown username'});
    }else{
        const isValid = await bcrypt.compare(password, result.user_pass);

        if(isValid){
            req.session.user = {
                id: result.user_id,
                username: result.username,
                email: result.email
            }
            return res.status(200).json({redirect: '/home', message: 'Login successful'});
        }else{
            return res.status(403).json({errorMessage: 'Incorrect password'});
        }
    }

});

app.post('/welcome/register', async (req, res) => {    
    const username = req.body.user;
    const password = req.body.pass;
    const email = req.body.email;

    const taken_username = (await db.query(
        "SELECT * FROM users WHERE username = $1", [username]
    )).rows[0];

    if(taken_username){
        return res.status(403).json({errorMessage: 'Username already taken'});
    }

    const taken_email = (await db.query(
        "SELECT * FROM users WHERE email = $1", [email]
    )).rows[0];

    if(taken_email){
        return res.status(403).json({errorMessage: "Email already registered"})
    }

    const hashed_password = await bcrypt.hash(password, 10);
    
    try {
        await db.query(
            "INSERT INTO users(username, email, user_pass) VALUES ($1, $2, $3)",
            [username, email, hashed_password]
        );

        const result = (
            await db.query('SELECT * FROM users WHERE username = $1', [username]
            )).rows[0];

        req.session.user = {
            id: result.user_id,
            username: result.username,
            email: result.email
        }

        res.status(200).json({redirect: '/home', message: 'Signup sucessful'});
    }catch(error){
        res.status(500).json({errorMessage: 'Internal  error, try again later'});
    }
});

app.get('/home', isAuthenticated, (req, res) => {
    if(req.session.user){
        const user_info = {
            username: req.session.user.username,
            email: req.session.user.email
        }
        res.status(200).json({user: user_info});
    }else{
        res.status(403).json({redirect: '/', errorMessage: 'You must be logged in to access this page'});
    }
});

app.get('/projects/:username', isAuthenticated, async (req, res) => {
    const { username } = req.params;

    try {
        const result = (await 
        db.query('SELECT * FROM projectsUser WHERE username = $1 AND (end_date = NULL OR end_date >= CURRENT_DATE OR end_date IS NULL) ORDER BY start_date DESC', 
        [username]));
        if(result.rows.length > 0){
            return res.status(200).json(result.rows);
        }else{
            return res.status(200).json([]);
        }

    } catch (error) {
        console.error(error);
        return res.status(403).json({});
    } 
});

app.get('/:username', isAuthenticated, async (req, res) => {
    /*
     * Get all the projects from a username
     */
    const { username } = req.params;
    
    try {
        const result = (await 
        db.query('SELECT * FROM projectsUser WHERE username = $1 ORDER BY start_date DESC', [username]));
        
        if(result.rows.length > 0){
            return res.status(200).json(result.rows);
        }else{
            return res.status(200).json([]);
        }

    } catch(error){
        console.error(error);
        return res.status(403).json({errorMessage: 'Error'});
    }

});

app.get('/:username/:project', isAuthenticated, async (req, res) => {
    
    /* 
     * Get the specific project of certain user
     * */
    const { username, project } = req.params;
    try {
        const result = (await 
        db.query('SELECT * FROM projectsUser WHERE username = $1 AND project = $2', [username, project]));
        
        if(result.rows.length > 0){
            return res.status(200).json(result.rows);
        }else{
            return res.status(200).json([]);
        }

    } catch(error) {
        console.error(error);
        return res.status(403).json({errorMessage: 'Error'});
    }
});

app.get('/api/getUsers/:projectId', isAuthenticated, async (req, res) => {
    const { projectId } = req.params;
    try {
        const result = (await 
        db.query('SELECT * FROM projectsuser WHERE project_id = $1', [ projectId ]));
        
        if(result.rows.length > 0){
            return res.status(200).json(result.rows);
        }else{
            return res.status(200).json([]);
        }
    } catch(error){
        console.error(error);
        return res.status(403).json({errorMessage: error});
    }
});


app.get('/api/getUserInfo/:username', isAuthenticated, async (req, res) => {
    const { username } = req.params;
    
    try {
        const result = (await 
        db.query('SELECT user_id AS "user_id", username AS "username", email AS "email" FROM users WHERE username = $1', [ username ]));

        if(result.rows.length > 0){
            return res.status(200).json(result.rows);
        } else {
            return res.status(200).json({});
        } 
    } catch(error) {
        console.error(error);
        return res.status(403).json({errorMessage: error});
    }
});

app.post('/api/createProject/:username/:new_project', isAuthenticated, async(req, res) => {
    const { username, new_project } = req.params;
    const user = req.body;

    if(!user.due_date){
        user.due_date = null;
    }
    try {
        const result = (await
        db.query("INSERT INTO projects (project_name, project_init_date, project_end_date, project_creator) VALUES($1, $2, $3, $4);", 
        [user.project, user.init_date, user.due_date, user.user_id]));

        res.status(200).json({redirect: `/${user.username}/${user.project}`})

    } catch(error) {
        console.error(error);
        return res.status(403).json({errorMessage: 'The project was not created'});
    }
});

app.get('/api/getTask/:taskId',  isAuthenticated, async(req, res) => {
    /*
     * Select an especific task info
     */

    const { taskId } = req.params;
    
    try {
        const result = (await
        db.query("SELECT * FROM tasks WHERE task_id = $1", [ taskId ])); 
               
        return res.status(200).json(result.rows);
        

    } catch (error) {
        console.error(error);
        return res.status(403).json({errorMessage: `error fetching task information ${taskId}`});
    }
});

app.get('/api/getTask/:username/:taskId', isAuthenticated, async (req, res) => {
    
    const { username, taskId } = req.params;

    try {
        const result = (await
        db.query("SELECT * FROM task_user WHERE username = $1 AND task_id = $2", [username, taskId]));

        return res.status(200).json(result.rows);

    } catch(error) {
        console.error(error);
        return res.status(400).json({errorMessage: `error fetching taks informatino ${taskId} for the user ${username}`})
    }
});


app.get('/api/getTasksUser/:username', async (req, res) => {
    const { done, project } = req.query;
    const { username } = req.params;
    const values = [username]; 
    
    let query = 'SELECT * FROM tasks_projects WHERE username = $1';

    query += ' AND done = $2';
    values.push(done === 'true'); 
    if (project) {
        query += ' AND project = $3';
        values.push(project);
    }

    query += ' ORDER BY due_date ASC';
     
    try {
        const result = await db.query(query, values);
        return res.status(200).json(result.rows);
    } catch (error) {
        console.error('Database query error:', error);
        return res.status(500).json({ errorMessage: `Error fetching tasks for the user: ${username}` });
    }
});

app.post('/api/setDone/:taskId/:userId', isAuthenticated, async (req, res) => {
    const { userId, taskId } = req.params;

    try {
        const response = (await
        db.query("UPDATE tasks_user SET done = True WHERE user_id=$1 AND task_id=$2", [userId, taskId]));
       
        if(response){
            return res.status(200).json({message: 'success'});
        }else{
            return res.status(500).json({errorMessage: `internal server error updating the task_id: ${taskId} for the user: ${userId}`});
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({errorMessage: `error setting task as done: ${error}`});
    }
});

app.get('/api/getSupervisedTasks/:username', async (req, res) => {
    const { username } = req.params;
    const { project } = req.query;
     
    let query = `SELECT * FROM tasks_view WHERE task_creator = '${username}'`; 
    
    if(project){
        query += ` AND project_name = '${project}' ORDER BY init_date DESC`;
    }
    
    try {
        const task_info = (await db.query(query)).rows;
        
        if(!task_info){
            return res.status(500).json({errorMessage: `error getting tasks supervised by the user ${username}`}); 
        }

        const taskMap = new Map();
        task_info.forEach((task) => {
            taskMap.set(task.task_id, {
                task_title: task.task_title,
                task_descp: task.task_descp,
                init_date: task.init_date,
                end_date: task.end_date,
                project_id: task.project_id,
                project_name: task.project_name,
                task_creator: task.task_creator,
                users_info: [],
            });
        });

        for(const task of task_info){ 
            const task_users = (await db.query('SELECT user_id, username, done FROM task_user WHERE task_id = $1 ORDER BY username', [ task.task_id ])).rows;
            const mapped_task = taskMap.get(task.task_id);

            if(task_users && mapped_task){
                mapped_task.users_info.push(...task_users);
            }
        }

        return res.status(200).json({supervisedInfo: Object.fromEntries(taskMap)});

    } catch (error) {
        return res.status(500).json({errorMessage: `error getting supervised tasks by the user ${username}: ${error}`});
    }
});

app.get('/api/getPendingInvitations/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const result = (await db.query('SELECT * FROM invitations WHERE username = $1 AND accepted = $2', [username, 'P'])).rows;
        
        if(result){
            result.forEach(async (res) => {
                 await db.query('UPDATE user_invitations SET inv_read = True WHERE invitation_id = $1', [res.invitation_id])
            })

            return res.status(200).json({result});
        }else{
            return res.status(500).json({error: `error fetching ${username}'s pending invitations `})
        }
    } catch (error) {
        console.error('ERR!', error);
    }
});


app.post('/api/setInvitationStatus/:invitationId/:status', async (req, res) => {
    const { invitationId, status } = req.params;
     
    if(status === 'A' || status === 'D'){
        
        const isPending = (await db.query("SELECT accepted FROM user_invitations WHERE invitation_id = $1", [invitationId])).rows[0].accepted;
        
        if(isPending == 'P'){
            try {
                await db.query('UPDATE user_invitations SET accepted = $1 WHERE invitation_id = $2', [status, invitationId]);
                return res.status(200).json({error: `status updated for invitation_id: ${invitationId} with status: ${status}`})
            } catch (error) {
                return res.status(500).json({error: `error updating status for invitation_id: ${invitationId} with status: ${status}`})
                console.error('ERR!', error);
            }
        }else{
            return res.status(400).json({error: `providing an invitation id (${invitationId}) on not pending status`})
        }
         
    } else {
        return res.status(400).json({error: `Wrong params send to setInvitationStatus, id: ${invitationId} with ${status} status`});
    }
});


app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
