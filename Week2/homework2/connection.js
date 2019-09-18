const util = require('util');
const mysql = require('mysql');

const CONNECTION_CONFIG = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
};
const con = mysql.createConnection(CONNECTION_CONFIG);
const execQuery = util.promisify(con.query.bind(con));
module.exports = { con, execQuery };
