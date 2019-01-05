"use strict";
const util = require("util");
const mysql = require("mysql");

const CONNECTION_CONFIG = {
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword"
};
const connection = mysql.createConnection(CONNECTION_CONFIG);
const execQuery = util.promisify(connection.query.bind(connection));


const CREATE_DATABASE = `CREATE DATABASE IF NOT EXISTS todos;`;
const USE_DATABASE = `use todos`;
const CREATE_LISTS_TABLE = `
  CREATE TABLE IF NOT EXISTS lists (
    id INT NOT NULL AUTO_INCREMENT,
    user_id VARCHAR(25) NOT NULL,
    caption VARCHAR(50) DEFAULT '',
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
  );`;
const CREATE_USERS_TABLE = `
  CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(25) NOT NULL UNIQUE,
    user_name VARCHAR(20) NOT NULL,
    user_last_name VARCHAR(20) NOT NULL,
    PRIMARY KEY (id)
  );`;
const CREATE_ITEMS_TABLE = `
  CREATE TABLE IF NOT EXISTS items (
    id INT NOT NULL UNIQUE AUTO_INCREMENT,
    description VARCHAR(50) NOT NULL,
    is_completed BOOLEAN NOT NULL DEFAULT FALSE,
    list_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (list_id) REFERENCES lists(id)
  );`;
const CREATE_REMINDERS_TABLE = `
  CREATE TABLE IF NOT EXISTS reminders(
    id INT NOT NULL UNIQUE AUTO_INCREMENT,
    reminder DATETIME,
    list_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY(list_id) REFERENCES lists(id)
  );`;

async function seedDatabase() {

  try {
    await execQuery(CREATE_DATABASE);
    await execQuery(USE_DATABASE);
    await execQuery(CREATE_USERS_TABLE);
    await execQuery(CREATE_LISTS_TABLE);
    await execQuery(CREATE_ITEMS_TABLE);
    await execQuery(CREATE_REMINDERS_TABLE);
  } catch (err) {
    console.error(err.message);
  }

}
seedDatabase();

module.exports = {
  connection: connection,
  execQuery: execQuery
}