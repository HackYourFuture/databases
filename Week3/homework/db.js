'use strict';
const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'todo',
});

const execQuery = util.promisify(connection.query.bind(connection));

const createDatabase = `CREATE DATABASE IF NOT EXISTS todo;`;
const useDatabase = `use todo`;

const usersTable = `
  CREATE TABLE IF NOT EXISTS users (
    userId INT NOT NULL AUTO_INCREMENT,
    userName VARCHAR(25) NOT NULL UNIQUE,
    PRIMARY KEY (userId)
  );`;

const listsTable = `
  CREATE TABLE IF NOT EXISTS lists (
    listId INT NOT NULL AUTO_INCREMENT UNIQUE,
    userId INT NOT NULL,
    listName VARCHAR(50) DEFAULT '',
    PRIMARY KEY (listId),
    FOREIGN KEY (userId) REFERENCES users (userId)
    );`;

const itemsTable = `
  CREATE TABLE IF NOT EXISTS items (
    itemId INT NOT NULL UNIQUE AUTO_INCREMENT,
    description VARCHAR(100) NOT NULL,
    isCompleted BOOLEAN NOT NULL DEFAULT FALSE,
    listId INT NOT NULL,
    PRIMARY KEY (itemId),
    FOREIGN KEY (listId) REFERENCES lists(listId)
  );`;

const remindersTable = `
  CREATE TABLE IF NOT EXISTS reminders(
    reminderId INT NOT NULL UNIQUE AUTO_INCREMENT,
    reminder DATETIME,
    listId INT NOT NULL,
    PRIMARY KEY (reminderId),
    FOREIGN KEY(listId) REFERENCES lists(listId)
  );`;

async function seedDatabase() {
  try {
    await execQuery(createDatabase);
    await execQuery(useDatabase);
    await execQuery(usersTable);
    await execQuery(listsTable);
    await execQuery(itemsTable);
    await execQuery(remindersTable);
  } catch (err) {
    console.error(err.message);
  }
}
seedDatabase();

module.exports = {
  connection: connection,
  execQuery: execQuery,
};
