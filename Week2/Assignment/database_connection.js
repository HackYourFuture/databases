require('dotenv').config();
const mysql = require('mysql2');
const util = require('util');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

const execQuery = util.promisify(connection.query.bind(connection));


module.exports = {
    connection,
    execQuery
}