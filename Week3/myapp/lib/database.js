var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'todo_app'

});
connection.connect();

module.exports = {
  connection: connection
};