'use strict';

const fs = require('fs');
const mysql = require('mysql');
const { promisify } = require('util');
const { QUERIES } = require('./queries');
const pathFile = './assignment.json';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: '',
});

const execQuery = promisify(connection.query.bind(connection));
const readFileAsync = promisify(fs.readFile);

const runExecution = async () => {
  connection.connect();
  try {
    QUERIES.forEach(async data => {
      await execQuery(data);
    });
    const SELECT = await readFileAsync(pathFile);
    JSON.parse(SELECT).forEach(async data => {
      const result = await execQuery(data.query);
      console.log(data.name);
      console.log(JSON.parse(JSON.stringify(result)));
    });
  } catch (error) {
    console.error(error);
  } finally {
    connection.end();
  }
};

runExecution();
