const util = require('util');
const mysql = require('mysql');

function execQuery() {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'tododatabase',
  });

  connection.connect(err => {
    if (err) throw err;
    console.log('database is connected');
  });

  return util.promisify(connection.query.bind(connection));
}

module.exports.execQuery = execQuery();
