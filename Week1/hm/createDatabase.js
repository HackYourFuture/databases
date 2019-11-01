const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password : 'hyfpassword',
})

connection.connect();

connection.query('CREATE DATABASE world', function(error, results, fields){
    if(error) throw error;
    console.log('Database world created');
});
connection.end();
