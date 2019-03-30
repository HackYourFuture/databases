'use strict';

const express = require('express');
const app = express();
const mysql = require('mysql');

const createUser = require('./createUser');
const createToDoList = require('./createToDoList');
const addRemainder = require('./addRemainder');
const createToDoItem = require('./createToDoItem');
const markItemAsCompleted = require('./markItemCompleted');
const deleteUser = require('./deleteUser');
const deleteToDoList = require('./deleteToDoList');
const deleteToDoItem = require('./deleteToDoItem');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: '7566',
  database: 'todo'
});

// ERROR-HANDLING FUNCTION
function errorHandler(err, res) {
  if (err) {
    console.log('Failed to query:' + err);
    res.sendStatus(500);
  }
}

// CREATE USER
app.post('/:username/:password', (req, res) => createUser(connection, errorHandler, req, res));

// CREATE TO-DO LIST
app.post('/:username/:password/:listDescription', (req, res) =>
  createToDoList(connection, errorHandler, req, res)
);

// ADD REMAINDER TO LIST
app.patch('/:username/:password/:listDescription/remainder/:remainder', (req, res) =>
  addRemainder(connection, errorHandler, req, res)
);

// CREATE TO-DO ITEM
app.post('/:username/:password/:listDescription/:toDoDescription', (req, res) =>
  createToDoItem(connection, errorHandler, req, res)
);

// MARK ITEM AS COMPLETED
app.patch('/:username/:password/:listDescription/:toDoDescription', (req, res) =>
  markItemAsCompleted(connection, errorHandler, req, res)
);

// DELETE USER
app.delete('/:username/:password', (req, res) => deleteUser(connection, errorHandler, req, res));

// DELETE TO-DO LIST
app.delete('/:username/:password/:listDescription', (req, res) =>
  deleteToDoList(connection, errorHandler, req, res)
);

// DELETE TO-DO ITEM
app.delete('/:username/:password/:listDescription/:toDoDescription', (req, res) =>
  deleteToDoItem(connection, errorHandler, req, res)
);

app.listen(3000, () => {
  console.log('Server is up and listening on 3000...');
});
