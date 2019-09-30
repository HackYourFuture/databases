const mysql = require('mysql');
const util = require('util');
const { handelError } = require('../middleware/error');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'todos_app',
});

const execQuery = util.promisify(connection.query.bind(connection));
connection.connect(handelError('connecting...'));
module.exports = { execQuery };
