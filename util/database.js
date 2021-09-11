const myqsl = require('mysql2');
require('dotenv').config();

const pool = myqsl.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
});

module.exports = pool.promise();