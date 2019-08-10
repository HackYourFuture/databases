'use strict';

const express = require('express');
const {
  todolists,
  todoitem,
  addTodoList,
  addTodoItem,
  deleteTodo,
  deleteTodoList,
  done,
  reminder,
} = require('./actions');

const app = express();
app.use(express.json());

app.get('/todos/lists', todolists);
app.get('/todos/todoitems/:listdescription', todoitem);
app.post('/todos/addnewlist', addTodoList);
app.post('/todos/addtodo', addTodoItem);
app.delete('/todos/removeitem/:name', deleteTodo);
app.delete('/todos/removelist/:description', deleteTodoList);
app.put('/todos/done/:name', done);
app.get('/todos/reminder', reminder);

app.listen(3000, () => console.log('Listening on port 3000'));
