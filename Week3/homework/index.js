'use strict';

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = new express();

app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'todo_database',
});

connection.connect();

app.put(`/createList/:list`, (req, res) => {
  const { list } = req.params;
  connection.query(
    `CREATE TABLE ${list} (todo_id INT(11) NOT NULL AUTO_INCREMENT,  todo varchar(50), done enum("true", "false"), user_id INT,  PRIMARY KEY (todo_id)  );`,
    (error, results, fields) => {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        res.send(results);
      }
    },
  );
});

app.put(`/createUserList`, (req, res) => {
  connection.query(
    `CREATE TABLE User_List (user_id INT(11) NOT NULL AUTO_INCREMENT,  name varchar(50), email varchar(50),  PRIMARY KEY (user_id)  );`,
    (error, results, fields) => {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        res.send(results);
      }
    },
  );
});

app.post(`/addUser`, (req, res) => {
  const { name, email } = req.body;
  connection.query(
    `insert into User_List values (null, "${name}", "${email}"); `,
    (error, results, fields) => {
      if (error) {
        console.error(error);
        res.send(error);
      } else {
        res.send(results);
      }
    },
  );
});

app.post(`/insert/:todoList`, (req, res) => {
  const { todoList } = req.params;
  const { todo, done, user_id } = req.body;
  connection.query(
    `INSERT INTO ${todoList} VALUES(null, "${todo}", "${done}", ${user_id});`,
    (error, results, fields) => {
      if (error) {
        console.error(error);
        res.send(error);
      } else {
        res.send(results);
      }
    },
  );
});

app.delete(`/deleteItem/:todoList/:todoId`, async (req, res) => {
  const { todoList, todoId } = req.params;
  connection.query(
    `DELETE FROM ${todoList} WHERE todo_id = ${todoId} ;`,
    (error, results, fields) => {
      if (error) {
        console.error(error);
        res.send(error);
      } else {
        res.send(results);
      }
    },
  );
});

app.delete(`/delete/:todoList`, (req, res) => {
  const { todoList } = req.params;
  connection.query(`DROP TABLES ${todoList};`, (error, results, fields) => {
    if (error) {
      console.error(error);
      res.send(error);
    } else {
      res.send(results);
    }
  });
});

app.put(`/itemCompleted/:todoList/:todoId`, async (req, res) => {
  const { todoList, todoId } = req.params;
  connection.query(
    `UPDATE ${todoList} SET done = "true" WHERE todo_id = ${todoId};`,
    (error, results, fields) => {
      if (error) {
        console.error(error);
        res.send(error);
      } else {
        res.send(results);
      }
    },
  );
});

app.listen(3000, error => {
  if (error) {
    console.error(error);
  } else {
    console.log(`Started on port 3000`);
  }
});
