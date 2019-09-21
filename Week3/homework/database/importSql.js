'use strict';

const path = require('path');
const importDB = require('mysql-import');
const sqlFile = path.join(__dirname, './todo.sql');

const importDatabase = async () => {
  await importDB
    .config({
      host: 'localhost',
      user: 'hyfuser',
      password: 'hyfpassword',
      database: 'userdb',
      onerror: err => console.log(err.message),
    })
    .import(sqlFile)
    .then(() => {
      console.log('todo database is successfully created');
    });
};
module.exports = importDatabase;
