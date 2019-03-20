'use-strict';
const mysql_import = require('mysql-import');
mysql_import
  .config({
    host: 'localhost',
    user: 'hyfuser2',
    password: 'hyfpassword',
    database: 'new_world',
    onerror: err => console.log(err.message),
  })
  .import('../world.sql')
  .then(() => {
    console.log('All statements have been executed');
  });
