const mysql = require('mysql');
const config = require('./constants');
const util = require('util');
const fs = require('fs');

function exitWithError(err,connection) {
  console.error(err.message);
  connection.end();
  process.exit(1);
}

const connection = mysql.createConnection(config);
const readFile = util.promisify(fs.readFile)

// We are binding 'this' inside query to the connection object
const execQuery = util.promisify(connection.query.bind(connection));

module.exports = {readFile, execQuery, connection};