'use strict';

const express = require('express');
const app = express();
const mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'todo',
});

// Tables are created from MySQL command Line Client.

// Error handler function.
function errorHandler(err, res) {
  if (err) {
    console.log('Query did not execute:' + err);
    res.sendStatus(500);
  }
}
// 
// 
// Create New User
app.post('/:userName/:userPassword', (req, res) => createUser(connection, errorHandler, req, res));

function createUser(connection, errorHandler, req, res) {
  const {
    userName,
    userPassword
  } = req.params;
  const createUserQuery = 'INSERT INTO users (user_name, user_password) VALUES (?, ?);';
  connection.query(createUserQuery, [userName, userPassword], err => {
    errorHandler(err, res);
  });
  res.end();
}
// 
// 
// Delete User, it needs userID then only developer can delete the user.
app.delete('/:userID/:userName/:userPassword', (req, res) =>
  deleteUser(connection, errorHandler, req, res),
);

function deleteUser(connection, errorHandler, req, res) {
  const {
    userID,
    userName,
    userPassword
  } = req.params;
  const deleteUserQuery =
    'DELETE FROM users WHERE user_id = ? AND user_name = ? AND user_password = ?;';
  connection.query(deleteUserQuery, [userID, userName, userPassword], err => {
    errorHandler(err, res);
  });
  res.end();
}
// 
// 
// Create todo list
app.post('/:userName/:userPassword/:listName/:reminder', (req, res) =>
  createList(connection, errorHandler, req, res),
);

function createList(connection, errorHandler, req, res) {
  const {
    userName,
    userPassword,
    listName,
    reminder
  } = req.params;
  const selectUserIdQuery = 'SELECT user_id FROM users WHERE user_name = ? AND user_password = ?';
  connection.query(selectUserIdQuery, [userName, userPassword], (err, res) => {
    errorHandler(err, res);
    const createListQuery = `INSERT INTO lists (user_ID, list_name, Reminder) VALUES (?,?,?);`;
    connection.query(createListQuery, [res[0].user_id, listName, reminder], err => {
      errorHandler(err, res);
    });
  });
  res.end();
}
// 
// 
// Delete todo list
app.delete('/:userName/:userPassword/:listName/:listID', (req, res) =>
  deleteList(connection, errorHandler, req, res)
);

function deleteList(connection, errorHandler, req, res) {
  const {
    userName,
    userPassword,
    listName,
    listID
  } = req.params;
  const selectUserIdQuery = 'SELECT user_id FROM users WHERE user_name = ? AND user_password = ?;';
  connection.query(selectUserIdQuery, [userName, userPassword], (err, res) => {
    errorHandler(err, res);
    const deleteListQuery =
      'DELETE FROM lists WHERE user_id = ? AND list_name = ? AND list_id = ?;';
    connection.query(deleteListQuery, [res[0].user_id, listName, listID], err => {
      errorHandler(err, res);
    });
  });
  res.end();
}
// 
// 
// Insert items into todo list with remarks
app.post('/:userName/:userPassword/:listName/:itemName/:remarks', (req, res) =>
  insertItem(connection, errorHandler, req, res)
);

function insertItem(connection, errorHandler, req, res) {
  const {
    userName,
    userPassword,
    listName,
    itemName,
    remarks
  } = req.params;
  const selectUserIdQuery = 'SELECT user_id FROM users WHERE user_name = ? AND user_password = ?;';
  connection.query(selectUserIdQuery, [userName, userPassword], (err, res) => {
    errorHandler(err, res);
    const selectListIdQuery = `SELECT list_id FROM lists WHERE user_id = ? AND list_name =?;`;
    connection.query(selectListIdQuery, [res[0].user_id, listName], (err, res) => {
      errorHandler(err, res);
      const createListQuery = `INSERT INTO items (list_id, item_name, remarks) VALUES (?,?, ?);`;
      connection.query(createListQuery, [res[0].list_id, itemName, remarks], err => {
        errorHandler(err, res);
      });
    });
  });
  res.end();
}
// 
// 
// Mark item is done or not done.
app.patch('/:userName/:userPassword/:listName/:completed/:itemName', (req, res) =>
  markItem(connection, errorHandler, req, res)
);

function markItem(connection, errorHandler, req, res) {
  const {
    userName,
    userPassword,
    listName,
    completed,
    itemName
  } = req.params;
  const selectUserIdQuery = 'SELECT user_id FROM users WHERE user_name = ? AND user_password = ?;';
  connection.query(selectUserIdQuery, [userName, userPassword], (err, res) => {
    errorHandler(err, res);
    const selectListIdQuery = `SELECT list_id FROM lists WHERE user_id = ? AND list_name =?;`;
    connection.query(selectListIdQuery, [res[0].user_id, listName], (err, res) => {
      errorHandler(err, res);
      console.log(completed);
      const createListQuery = `UPDATE items SET completed = ? WHERE list_id =? AND Item_Name = ?;`;
      connection.query(createListQuery, [completed, res[0].list_id, itemName], err => {
        errorHandler(err, res);
      });
    });
  });
  res.end();
}


app.listen(4000, () => {
  console.log('Listening from server 4000');
});