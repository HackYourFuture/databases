const express = require('express');
const { addNewItem } = require('./modules/addNewItem');
const { addTodoList } = require('./modules/addTodoList');
const { removeToDoList } = require('./modules/removeTodoList');
const { removeItem } = require('./modules/removeItem');
const { markAsCompleted } = require('./modules/markAsCompleted');
const { getAllRows } = require('./modules/getAllRows');
const { getRowById } = require('./modules/getRowById');

const app = express();
app.use(express.json());

// Insert item(s) in ToDo list
app.post('/items/add', addNewItem);

// Create a new ToDo list
app.post('/todolist/add', addTodoList);

// Delete item(s) in ToDo list
app.delete('/items/:id', removeItem);

// Delete a ToDo list
app.delete('/todolist/:id', removeToDoList);

// Mark an item as completed
app.put('/todolist/completed/:id', markAsCompleted);

// select all rows from specific  table
app.get('/:tableName/all', getAllRows);

// select an row depend on ID
app.get('/:tableName/:id', getRowById);

app.listen(3000, () => {
  console.log('listening to port 3000');
});
