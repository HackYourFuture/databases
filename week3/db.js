const util = require('util');
const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'todo_app'
})

db.connect((err) => {
  if (err) throw err
  console.log('Connected to mySQL database!');
})

db.query = util.promisify(db.query.bind(db));

module.exports = db