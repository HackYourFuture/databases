'use strict';

const express = require('express');
const logger = require('morgan');
const app = express();
const port = process.env.PORT || 3000;
const {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  getUserLists,
  createList,
  getListById,
  deleteList,
  getTodos,
  getTodoById,
  addTodoWithTags,
  deleteTodo,
  markTodoDone,
  markTodoNotDone,
} = require('./helpers');

app.use(
  logger(
    '[:date[web]] ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms',
  ),
);

app.use(express.json());

//* Get all users
app.get('/user', getUsers);

//* Get a user by userid
app.get('/user/:userid', getUserById);

//* Create new user
app.post('/user', createUser);

//* Delete a user by userid
app.delete('/user/:userid', deleteUser);

//* Get lists of a user by userid
app.get('/user/:userid/list', getUserLists);

//* Create new list for a user, [optional] set a reminder
app.post('/user/:userid/list', createList);

//* Get a list by listid
app.get('/list/:listid', getListById);

//* Delete a list by listid
app.delete('/list/:listid', deleteList);

//* Get all Todos of a list by listid
app.get('/list/:listid/todo', getTodos);

//* Get Todo by todoid
app.get('/list/:listid/todo/:todoid', getTodoById);

//* Add new Todo to a list by listid, [optional] add multiple tags
app.post('/list/:listid/todo', addTodoWithTags);

//* Delete a Todo by todoid
app.delete('/list/:listid/todo/:todoid', deleteTodo);

//* Mark Todo as done
app.post('/list/:listid/todo/:todoid/done', markTodoDone);

//* Mark Todo as not done
app.delete('/list/:listid/todo/:todoid/done', markTodoNotDone);

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
