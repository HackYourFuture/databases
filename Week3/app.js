const express = require('express');
const { addNewItem } = require('./modules/addNewItem');
const { addTodoList } = require('./modules/addTodoList');
const { removeRows } = require('./modules/removeRows');
const { markAsCompleted } = require('./modules/markAsCompleted');
const { getAllRows } = require('./modules/getAllRows');
const { getRowById } = require('./modules/getRowById');

const app = express();
app.use(express.json());

// Insert item(s) in ToDo list
app.post('/items/add', addNewItem);

// Create a new ToDo list
app.post('/todolist/add', addTodoList);

// Delete row(s) from a specific table
app.delete('/:table/:id', removeRows);

// Mark an item as completed
app.put('/todolist/completed/:id', markAsCompleted);

// select all rows from specific  table
app.get('/:tableName', getAllRows);

// select an row depend on ID
app.get('/:tableName/:id', getRowById);

app.listen(3000, () => {
  console.log('listening to port 3000');
});
