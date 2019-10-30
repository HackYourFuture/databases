const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
});

connection.connect(err => {
  if (err) throw err;
  console.log('connected...');

  // Create Database
  connection.query(`CREATE DATABASE IF NOT EXISTS world;`, err => {
    if (err) throw err;
    console.log(`The database called 'world' was created`);
  });

  // Access created database
  connection.query('USE world;', err => {
    if (err) throw err;
    console.log(`You are in database "world"`);
  });
  connection.end();
});
