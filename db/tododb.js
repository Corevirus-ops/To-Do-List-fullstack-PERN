const {Pool} = require('pg');

const pool = new Pool({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    database: 'todo_pern',
    port: 5432
})

module.exports = pool;