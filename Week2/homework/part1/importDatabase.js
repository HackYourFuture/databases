'use strict';

const path = require('path');
const importDB = require('mysql-import');
const sqlFile = path.join(__dirname, '../../world.sql');

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
      console.log('new_world database is successfully created');
    });
};
module.exports = importDatabase;
