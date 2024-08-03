const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: ' hyfuser',
    password: 'hyfpassword',
  //databese field is ommitted here during the time of creating  a  database named as myDatabase
    
}); 
// Create a connection to the MySQL database  --> optional  bcs mysql2 will create the connection automatically by createConnection()
connection.connect((err) => {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log('Connected as id ' + connection.threadId);
});
//create a database
connection.query('CREATE DATABASE myDatabase', (err, results) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Database created successfully');
});