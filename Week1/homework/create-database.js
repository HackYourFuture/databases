'use strict';
const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser2',
  password: 'hyfpassword',
});

const executeQuery = util.promisify(connection.query.bind(connection));

async function createDatabase() {
  connection.connect();
  try {
    await executeQuery('DROP DATABASE IF EXISTS world');
    await executeQuery('CREATE DATABASE IF NOT EXISTS world');
  } catch (error) {
    console.log(error);
  }
  connection.end();
}

module.exports = createDatabase;
