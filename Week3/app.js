'use strict';

const express = require('express');
const util = require('util');
const mysql = require('mysql');
const app = express();

app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'todo_list',
});

const execQuery = util.promisify(connection.query.bind(connection));

connection.connect();

// get todo list
app.get('/todolist/:id', async (req, res) => {
  try {
    const query1 = 'SELECT * from todolist WHERE ID=?';
    await execQuery(query1, req.params.id);
    res.status(200).json({
      message: 'the todo list with the id of ${req.params.id}',
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// get todo items
app.get('/todoitems/:listId', async (req, res) => {
  try {
    const query2 = 'SELECT * from todoitem WHERE TodoListID=?';
    await execQuery(query2, req.params.listId);
    res.status(200).json({
      message: 'the todo items which are in the list of ${req.params.listId}',
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// Insert item(s) in ToDo list
app.post('/insertTodoItems/:listId', async (req, res) => {
  try {
    const query3 =
      'INSERT INTO todoitem (ID, description, ,TodoListID, completed) values(NULL,?,?,?)';
    await execQuery(query3, [req.body.description, req.params.listId, req.body.completed]);
    res.status(200).json({
      message: 'inserted a todo item',
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// Delete item(s) in ToDo list
app.delete('/:listId/deleteTodoItems/:id', async (req, res) => {
  try {
    const query4 = 'DELETE FROM todoitem WHERE ID =? AND TodoListID =?';
    await execQuery(query4, [req.params.id, req.params.listId]);
    res.status(200).json({
      message: `todo with the id of ${req.params.id} is removed`,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// Create a new ToDo list
app.post('/createList', async (req, res) => {
  try {
    const query5 = 'INSERT INTO todolist (ID, Name, UserID, Reminder) values(NULL,?,?,NULL)';
    await execQuery(query5, [req.body.Name, req.body.UserID]);
    res.status(200).json({
      message: 'a new list created',
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// Delete a ToDo list
app.delete('/deleteTodoList/:id', async (req, res) => {
  try {
    const query6 = 'DELETE FROM todolist WHERE ID=?';
    await execQuery(query6, req.params.id);
    res.status(200).json({
      message: 'todo list with the id of ${req.params.id} is deleted',
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// Mark an item as completed
app.put('/:listId/markAsCompleted/:id', async (req, res) => {
  try {
    const query7 = 'UPDATE todoitem SET completed= 1 WHERE ID=? AND TodoListID=?';
    await execQuery(query7, [req.params.id, req.params.listId]);
    res.status(200).json({
      message: 'todo item with the id of ${req.params.id} is completed',
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// Add a reminder for the list (not for the item)
app.post('/:Id/reminder', async (req, res) => {
  try {
    const query8 = 'UPDATE todolist SET Reminder=? WHERE ID=?';
    await execQuery(query8, [req.body.Reminder, req.params.Id]);
    res.status(200).json({
      message: 'reminder date added to the TodoList with the id of ${req.params.Id}',
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

connection.end();

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
