'user strict';

const mysql = require('mysql');

//local mysql db connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser2',
  password: 'hyfpassword',
  database: 'toDoApp',
});

connection.connect(err => {
  if (err) throw err;
});

module.exports = connection;
