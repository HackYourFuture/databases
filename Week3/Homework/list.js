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

// On path '/get_lists' Get table: task_list

router.get('/get_lists', (req, res) => {
  const queryString = 'SELECT * FROM task_list';
  res.render('viewtodos', (err, html) => {
    connection.query(queryString, (err, rows, fields) => {
      if (err) {
        console.log(`Failed to query @ /get_lists: ${err}`);
      }
      console.log('Getting data from database @ /get_lists');

      res.write(html);
      res.write(`<h1>Todo Lists</h1>
    <form id="delete_list_form" action="/delete_list" method="POST">
        <table><tr><th>List Name</th><th>Reminder</th><th></th></tr>`);
      for (i in rows) {
        if (Object.prototype.hasOwnProperty.call(rows, i)) {
          res.write(`<tr><td>${rows[i].list_name}</td>
        <td>${rows[i].reminder_time.toLocaleString()}</td>
        <td><button value="${rows[i].list_id}" name="delete_todo_task"/>Delete</button></td></tr>`);
        }
      }
      res.end('</table></form>');
    });
  });
});

// On path '/' add a list

router.post('/add_list', (req, res) => {
  const list = req.body.add_list_input;
  const reminder = req.body.add_list_reminder;
  const queryString = `INSERT into task_list (list_name, reminder_time, user_id)
  VALUES(?, ?, null);`;
  connection.query(queryString, [list, reminder], (err, rows, fields) => {
    if (err) {
      console.log(`Failed to create ${list} @ /add_list:  ${err}`);
    }
    console.log(`@/add_list : List ${list} is created`);
    res.redirect('/');
  });
});

// On path '/get_lists' delete a list

router.post('/delete_list', (req, res) => {
  const list_id = req.body.delete_todo_task;

  const queryString = 'DELETE from task_list WHERE list_id = ?;';

  connection.query(queryString, [list_id], (err, rows, fields) => {
    if (err) {
      console.log(`Failed to delete list @ /delete_list: ${list_id}} ${err}`);
    }
    console.log(`@/delete_list : todo list with id ${list_id} is deleted`);
    res.redirect('/get_lists');
  });
});

// On path '/get_list/:id' Get todos that belong to a specific list

router.get('/get_list/:id', (req, res) => {
  const list_id = req.params.id;

  const queryString = 'SELECT task_name FROM task WHERE list_id=?;';

  connection.query(queryString, [list_id], (err, rows, fields) => {
    if (err) {
      console.log(`Failed to query @ /get_list/${list_id} : ${err}`);
    }
    console.log('Getting data from database @ /get_users');
    res.write(`<h1>Todo Tasks in List ${list_id}</h1>
        <ul>`);
    for (i in rows) {
      if (Object.prototype.hasOwnProperty.call(rows, i)) {
        res.write(`<li>${rows[i].task_name}</li>`);
      }
    }
    res.end('</ul>');
  });
});

module.exports = router;
