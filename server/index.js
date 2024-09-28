import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import env from "dotenv";
import cors from "cors";
import GoogleStrategy from "passport-google-oauth2";

const app = express();
const port = 3000;
env.config();
app.use(cors()); 
app.use(bodyParser.json());

app.post('/welcome/login', (req, res) => {
    console.log(req.body);
    res.json({redirect: '/home'});
});

app.post('/welcome/signin', (req, res) => {
    console.log(req.body);
    res.json({redirect: '/home'});
})

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});