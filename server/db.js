import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const db = new pg.Client({
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT,
});


export default db;
