import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import env from "dotenv";
import cors from "cors";
import bcrypt from "bcryptjs";
import db from "./db.js";
import session from "express-session";


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

app.get('/projects/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const result = (await db.query('SELECT * FROM projectsUser WHERE username = $1', username)).rows;
        if(result.length > 0){
            return res.status(200).json(result);
        }else{
            return res.status(200).json([]);
        }

    } catch (error) {

    } 
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});