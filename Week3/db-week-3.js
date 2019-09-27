'use strict';
const util = require('util');
const fs = require('fs');
const mysql = require('mysql');
const express = require('express');
const app = express();
const port = 3020;

const readFile = util.promisify(fs.readFile);

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'todo',
  multipleStatements: true,
});

app.use(express.json());

const CREATE_TABLE_TODOS = `CREATE TABLE IF NOT EXISTS todos (
  todoid VARCHAR(30) PRIMARY KEY,
  reminder text
  );`;

const CREATE_TABLE_ITEMS = `CREATE TABLE IF NOT EXISTS items (
    item text,
    isdone enum('done', 'not_done'),
    belongs_to VARCHAR(30),
    
    FOREIGN KEY (belongs_to)
    REFERENCES todos(todoid)
    );`;

app.get('/', (req, res) => {
  const execQuery = util.promisify(connection.query.bind(connection));
  execQuery(CREATE_TABLE_TODOS);
  execQuery(CREATE_TABLE_ITEMS);
  connection.end();
  res.send('Your tables are created!');
});

app.listen(port, () => console.log(`You are listening to port ${port}`));
