const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'user',
    password : 'password',
    database : 'todo_app'
  });
connection.connect();

module.exports = {
    connection : connection
}