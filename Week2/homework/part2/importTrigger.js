'use strict';

const path = require('path');
const importDB = require('mysql-import');
const sqlFile = path.join(__dirname, './languageTrigger.sql');

const importTrigger = async () => {
  await importDB
    .config({
      host: 'localhost',
      user: 'hyfuser',
      password: 'hyfpassword',
      database: 'new_world',
      onerror: err => console.log(err.message),
    })
    .import(sqlFile)
    .then(() => {
      console.log('Language Trigger is successfully created');
    });
};

module.exports = importTrigger;
