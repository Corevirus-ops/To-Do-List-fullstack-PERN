const {Pool} = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const {DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE, DB_PORT } = process.env;


const pool = new Pool({
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    database: DB_DATABASE,
    port: DB_PORT
})

module.exports = pool;