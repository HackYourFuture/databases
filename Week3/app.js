'use strict';

const express = require('express');
const util = require('util');
const mysql = require('mysql');
const app = express();

app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysql1',
  database: 'todo_list',
});

const execQuery = util.promisify(connection.query.bind(connection));

// get todo lists
app.get('/lists', async (req, res) => {
  try {
    await execQuery('SELECT * from lists');
    res.status(200).json({
      message: 'todo lists',
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

//items of a list
app.get('/items', async (req, res) => {
  try {
    await execQuery('SELECT * from items WHERE ID=?', req.listId);
    res.status(200).json({
      message: 'the todo items which are in the list of ${req.listId}',
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// Insert item
app.post('/items', async (req, res) => {
  try {
    await execQuery('INSERT INTO items (ID, Name) values(NULL,?)', [req.ID, req.Name]);
    res.status(200).json({
      message: ' ${req.ID} added',
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// Delete item from list
app.delete('/items/:id', async (req, res) => {
  try {
    await execQuery('DELETE FROM items WHERE ID =? AND ID =?', [req.id, req.ID]);
    res.status(200).json({
      message: '${req.id} deleted',
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// Create todo list
app.post('/list', async (req, res) => {
  try {
    await execQuery('INSERT INTO list (ID, Name, Reminder, status) values(NULL,?,?,NULL)', [
      req.Name,
      req.userID,
    ]);
    res.status(200).json({
      message: '${req.Name} created',
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// Delete a ToDo list
app.delete('/lists/:id', async (req, res) => {
  try {
    await execQuery('DELETE FROM lists WHERE ID=?', req.listId);
    res.status(200).json({
      message: '${req.ID} deleted',
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// completed item
app.put('/items/:id', async (req, res) => {
  try {
    await execQuery('UPDATE items SET completed= 1 WHERE ID=? AND ID=?', [req.id, req.listId]);
    res.status(200).json({
      message: ' ${req.id} is completed',
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// reminder for the list
app.post('/lists/:/reminder', async (req, res) => {
  try {
    await execQuery('UPDATE lists SET Reminder=? WHERE ID=?', [req.Reminder, req.listId]);
    res.status(200).json({
      message: 'set reminder date at ${req.listId}',
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
