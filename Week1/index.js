const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
});

connection.connect(err => {
  if (err) {
    console.log(`Connection Error: ${err.message} (${err.code})`);
    process.exit();
  }
  console.log('Successfully connected to mysql server...');
});

connection.end();
