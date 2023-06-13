const mysql = require('mysql');

const config = {
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'meetup'
};

const db = mysql.createConnection(config);

//Connect to the Database
db.connect((error) => {
    if (error) throw error;
    console.log("Connection established");
  });

module.exports = db;
