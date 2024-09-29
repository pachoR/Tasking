import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import env from "dotenv";
import cors from "cors";
import GoogleStrategy from "passport-google-oauth2";
import pg from "pg";
import db from "./db.js";


const app = express();
const port = 3000;
env.config();
app.use(cors()); 
app.use(bodyParser.json());

app.post('/welcome/login', async (req, res) => {
    db.connect();
    const username = req.body.user;
    const password = req.body.pass;
    console.log(req.body);

    const result = (await db.query("SELECT user_pass FROM users WHERE username = $1", [username])).rows;
    if(rows.length === 0){
        res.status(403).json({errorMessage: 'Invalid credentials'});
    }
    
});

app.post('/welcome/signin', (req, res) => {    
    res.status(403).json({redirect: false});
})

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});