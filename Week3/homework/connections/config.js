'use strict';

const mysql = require('mysql');
const config = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'BassamHager',
  database: 'todo_db',
});

config.connect(err => {
  if (err) console.log(`DB connection failed\nError: ${JSON.stringify(err, undefined, 2)}`);
  console.log(`DB connection succeeded...\n`);
});

module.exports = config;
