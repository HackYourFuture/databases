'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const {
  retrieveTodoLists,
  addTodoList,
  addTodoItem,
  deleteTodoItem,
  deleteTodoList,
  markAsDone,
  reminder,
} = require('./actions');

const app = express();
app.use(bodyParser.json());

app.get('/todos/lists', retrieveTodoLists);
app.get('/todos/todoitems/:listname', retrieveTodoItems);
app.post('/todos/addnewlist', addTodoList);
app.post('/todos/addnewitem', addTodoItem);
app.delete('/todos/removeitem/:name', deleteTodoItem);
app.delete('/todos/removelist/:name', deleteTodoList);
app.put('/todos/done/:name', markAsDone);
app.get('/todos/reminder', reminder);

app.listen(3000);
