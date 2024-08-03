const mysql = require('mysql2');
const createDatabaseAndTables = require('./createTablesAndData'); // Import the SQL queries
// Create a connection to the MySQL database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    multipleStatements: true // Allows executing multiple queries at once
});
//execute the SQL queries
connection.query(createDatabaseAndTables, (err, results) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Database and tables created successfully');
    connection.end();
});