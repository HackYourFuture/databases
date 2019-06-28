const express = require('express');
const bodyParser = require('body-parser');

const createTodoList = require('./actions/create_todo_list');
const createTodo = require('./actions/create_todo');
const createUser = require('./actions/create_user');

const deleteTodoList = require('./actions/delete_todo_list');
const deleteTodo = require('./actions/delete_todo');
const deleteUser = require('./actions/delete_user');

const updateTodoList = require('./actions/update_todo_list');
const updateTodo = require('./actions/update_todo');
const updateUser = require('./actions/update_user');

const readTodo = require('./actions/read_todo');
const readAllTodos = require('./actions/read_all_todos');

const markAsDone = require('./actions/mark_as_done');
const markAsNotDone = require('./actions/mark_as_not_done');
const setReminder = require('./actions/set_reminder');

const app = express();
app.use(bodyParser.json());

//To read unique or alltodos

app.get('/alltodos', (request, response) => {
  readAllTodos(response);
});
app.get('/todos/:id', (request, response) => {
  readTodo(request, response);
});

//to update todolists, todos, users

app.post('/todolist/:id', (request, response) => {
  updateTodoList(request, response);
});
app.post('/todo/:id', (request, response) => {
  console.log(request.params.id);
  updateTodo(request, response);
});
app.post('/user/:id', (request, response) => {
  console.log(request.params.id);
  updateUser(request, response);
});

//to create todolist, todo, user

app.post('/todolists', (request, response) => {
  createTodoList(request, response);
});
app.post('/todos', (request, response) => {
  createTodo(request, response);
});
app.post('/users', (request, response) => {
  createUser(request, response);
});

//to delete todolists, todos, users

app.delete('/todolists/:id', (request, response) => {
  deleteTodoList(request, response);
});
app.delete('/todos/:id', (request, response) => {
  deleteTodo(request, response);
});
app.delete('/users/:id', (request, response) => {
  deleteUser(request, response);
});

//to markasdone, markasnotdone and to set reminder

app.post('/todos/:id/done', (request, response) => {
  markAsDone(request, response);
});
app.delete('/todos/:id/done', (request, response) => {
  markAsNotDone(request, response);
});
app.post('/todos/:id', (request, response) => {
  setReminder(request, response);
});

module.exports = app;
