const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'todo_app'
});

connection.connect((error) => {
  if (error) throw error
  console.log('DB connected')

});

connection.query = util.promisify(connection.query.bind(connection));

module.exports = connection;