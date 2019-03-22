'use-strict';
const fs = require('fs');
const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser2',
  password: 'hyfpassword',
});

const executeQuery = util.promisify(connection.query.bind(connection));

// const createDatabaseQuery = fs.readFileSync('../world.sql');

async function createDatabase() {
  connection.connect();
  try {
    await executeQuery('CREATE DATABASE IF NOT EXISTS new_world');
  } catch (error) {
    console.log(error);
  }
  connection.end();
}

createDatabase();
