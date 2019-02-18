const util = require('util');
const mysql = require('mysql');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());



const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'todo',
});

const execQuery = util.promisify(connection.query.bind(connection));

function todo_actions() {
  function formatoutput(output, res) {
    output
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  }

  app.post('/users', (req, res) => {
    const postuser = req.body;
    const sql = `INSERT INTO user SET ?;`;

    const rows = execQuery(sql, postuser);
    formatoutput(rows, res);
  });

  app.post('/list', (req, res) => {
    const postlist = req.body;
    const sql = `INSERT INTO list SET ?;`;

    const rows = execQuery(sql, postlist);
    formatoutput(rows, res);
  });
  app.post('/tasks', (req, res) => {
    const posttask = req.body;
    const sql = `INSERT INTO task SET ?;`;

    const rows = execQuery(sql, posttask);
    formatoutput(rows, res);
  });

  app.post('/reminders/', (req, res) => {
    const postreminder = req.body;
    const sql = `INSERT INTO reminders SET ?;`;

    const rows = execQuery(sql, postreminder);
    formatoutput(rows, res);
  });

  app.delete('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const sql = `DELETE FROM task WHERE id= ?;`;

    const rows = execQuery(sql, taskId);
    formatoutput(rows, res);
  });

  app.delete('/list/:id', (req, res) => {
    const listId = req.params.id;
    const sql = `DELETE FROM list WHERE id= ?;`;

    const rows = execQuery(sql, listId);
    formatoutput(rows, res);
  });

  app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    const sql = `DELETE FROM user WHERE id= ?;`;

    const rows = execQuery(sql, userId);
    formatoutput(rows, res);
  });

  app.put('/tasks/:id/completed', (req, res) => {
    const taskId = req.params.id;
    const sql = `UPDATE task SET done ='T' where id = ?; `;

    const rows = execQuery(sql, taskId);
    formatoutput(rows, res);
  });

  app.get('/users', (_req, res) => {
    const rows = execQuery('select * from user;');
    formatoutput(rows, res);
  });

  app.get('/list', (_req, res) => {
    const rows = execQuery('select * from list;');
    formatoutput(rows, res);
  });

  app.get('/tasks', (_req, res) => {
    const rows = execQuery('select * from task;');
    formatoutput(rows, res);
  });
  app.get('/reminders', (_req, res) => {
    const rows = execQuery('select * from reminders;');
    formatoutput(rows, res);
  });
}

todo_actions();

app.listen(4000, () => {
  console.log('server is listening on 4000');
});