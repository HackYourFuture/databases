const fs = require('fs');
const mysql = require('mysql');

const config = JSON.parse(fs.readFileSync('config-secret.json'));

const connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    port: config.port,
    database: config.database
});

connection.connect(err => { if (err) throw err; });

connection.query('SELECT * FROM user', function(error, results, fields) {
    console.log(results);
});

connection.end();
