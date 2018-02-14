const mysql = require('mysql');

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'todo',
    password: 'todo',
    database: 'todo_app'
});
module.exports = dbConnection; 
