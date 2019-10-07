/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */
const express = require('express');
const mysql = require('mysql');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

function getConnection() {
  return mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'TodoApplication',
    multipleStatements: true,
  });
}

const connection = getConnection();

// On path '/get_users' Get table: user

router.get('/get_users', (req, res) => {
  const queryString = 'SELECT * FROM user';
  res.render('viewtodos', (err, html) => {
    connection.query(queryString, (err, rows, fields) => {
      if (err) {
        console.log(`Failed to query @ /get_users: ${err}`);
      }
      console.log('Getting data from database @ /get_users');

      res.write(html);
      res.write(`<h1>Users</h1>
        <table><tr><th>Name</th><th>Email</th><th>Password</th>`);
      for (i in rows) {
        if (Object.prototype.hasOwnProperty.call(rows, i)) {
          res.write(`<tr><td>${rows[i].user_name}</td>
        <td>${rows[i].user_email}</td>
        <td>${rows[i].user_password}</td></tr>`);
        }
      }
      res.end('</table>');
    });
  });
});

// On path '/' Add a user

router.post('/add_user', (req, res) => {
  const user_name = req.body.add_user_name;
  const user_email = req.body.add_user_email;
  const user_password = req.body.add_user_password;
  const queryString = `INSERT into user (user_name, user_email, user_password)
  VALUES(?, ?, ?);`;
  connection.query(queryString, [user_name, user_email, user_password], (err, rows, fields) => {
    if (err) {
      console.log(`Failed to create ${user_name} @ /add_user:  ${err}`);
    }
    console.log(`@/add_user : User ${user_name} is created`);
    res.redirect('/');
  });
});

module.exports = router;
