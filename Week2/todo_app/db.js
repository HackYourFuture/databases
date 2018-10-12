const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'todo_app'
  });
connection.connect();

module.exports = {
    connection : connection
}