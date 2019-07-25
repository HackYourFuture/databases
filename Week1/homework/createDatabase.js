var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

function sendQuery(query) {
  connection.query(query, function(error, results, fields) {
    if (error) {
      throw error;
    }
    console.log('the reply is ', results[0]);
  });
}

connection.connect();

//create database and use it
var create_database = ['create database world', 'use world'];
for (let i = 0; i < create_database.length; i++) {
  sendQuery(create_database[i]);
}
