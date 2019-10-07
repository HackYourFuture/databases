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

// On path '/get_todos' Get table: task

router.get('/get_todos', (req, res) => {
  const queryString = 'SELECT * from task;';

  res.render('viewtodos', (err, html) => {
    connection.query(queryString, (err, rows, fields) => {
      if (err) {
        console.log(`Failed to query @ /get_todo: ${err}`);
      }
      console.log('Getting data from database @ /get_todos');

      res.write(html);
      res.write(`<h1>Todos</h1>
        <form id="delete_todo_form" action="/delete_todo" method="POST"><table>
        <tr><th>Todo</th><th> List </th><th> Category Tag </th><th> Deadline </th><th> Status </th><th></th><th></th></tr>`);
      for (i in rows) {
        if (Object.prototype.hasOwnProperty.call(rows, i)) {
          let taskState = '';
          const options = {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: 'numeric',
          };

          if (rows[i].complete == 'T') {
            taskState = 'Done';
          } else {
            taskState = 'Not Done';
          }
          res.write(
            `<tr>
          <td>${rows[i].task_name}</td> 
          <td>${rows[i].list_id}</td>
          <td>${rows[i].category_id}</td>
          <td>${rows[i].deadline.toLocaleString('en-GB', options)}</td>
          <td>${taskState}</td>
          <td><button value="${rows[i].task_id}" name="delete_todo_task"/>Delete</button></td>
          <td><button value="${
  rows[i].task_name
}" name="update_todo_task"/>Mark As Complete</button></td>
          </tr>`,
          );
        }
      }

      res.end('</table></form>');
    });
  });
});

// On path '/' add a todo task

router.post('/add_todo', (req, res) => {
  const todo = req.body.add_todo_input;
  const deadline = req.body.add_todo_deadline;
  const tag = req.body.add_todo_tag;
  const list = req.body.add_todo_list;
  const queryString = `INSERT INTO task (task_name, date_created, deadline, complete, category_id, list_id) 
  VALUES (? , now(), ?, 'F', ?, (SELECT list_id from task_list WHERE list_name=?));`;
  connection.query(queryString, [todo, deadline, tag, list], (err, rows, table) => {
    if (err) {
      console.log(`Failed to insert @ /add_todo: ${todo} ${err}`);
    }
    console.log(`@/add_todo : ${todo} added`);
    res.redirect('/');
  });
});

// On path '/get_todos' delete or update todo. I couldn't separate update from delete.

router.post('/delete_todo', (req, res) => {
  const task_id = req.body.delete_todo_task;
  const task_name = req.body.update_todo_task;
  console.log(req.body.update_todo_task);
  let queryString = 'DELETE from task WHERE task_id = ?;';
  if (req.body.update_todo_task != null) {
    queryString = 'UPDATE task SET complete="T" WHERE task_name = ?;';
  }
  connection.query(queryString, [task_id, task_name], (err, rows, fields) => {
    if (err) {
      console.log(`Failed to delete todo @ /delete_todo: ${task_id}} ${err}`);
    }
    console.log(`@/delete_todo : todo with id ${task_id} is deleted`);
    res.redirect('/get_todos');
  });
});

// On path '/get_category/:id' Get todos that belong to a specific category

router.get('/get_category/:id', (req, res) => {
  const category_id = req.params.id;

  const queryString = 'SELECT task_name FROM task WHERE category_id=?;';

  connection.query(queryString, [category_id], (err, rows, fields) => {
    if (err) {
      console.log(`Failed to query @ /get_category/${category_id} : ${err}`);
    }
    console.log('Getting data from database @ /get_category');
    res.write(`<h1>Todo Tasks in Category ${category_id}</h1>
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
