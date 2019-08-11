'use strict';

const express = require('express');
const app = express();
const port = 3000;

const {
  showRecords,
  showRecordById,
  createUser,
  createTodoList,
  createTodoItem,
  createReminder,
  createTag,
  deleteUserById,
  deleteTodoListById,
  deleteTodoItemById,
  deleteReminderById,
  deleteTagById,
  markItemWithListAsCompleted,
  markItemAsCompletedById,
} = require('./functions');

app.use(express.json());
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.get('/user', async (request, response) => {
  response.json(await showRecords(request.path));
});

app.get('/user/:id', async (request, response) => {
  response.json(await showRecordById(request.path, request.params.id));
});

app.get('/todolist', async (request, response) => {
  response.json(await showRecords(request.path));
});

app.get('/todolist/:id', async (request, response) => {
  response.json(await showRecordById(request.path, request.params.id));
});

app.get('/todoitem', async (request, response) => {
  response.json(await showRecords(request.path));
});

app.get('/todoitem/:id', async (request, response) => {
  response.json(await showRecordById(request.path, request.params.id));
});

app.get('/reminder', async (request, response) => {
  response.json(await showRecords(request.path));
});

app.get('/reminder/:id', async (request, response) => {
  response.json(await showRecordById(request.path, request.params.id));
});

app.get('/tag', async (request, response) => {
  response.json(await showRecords(request.path));
});

app.get('/tag/:id', async (request, response) => {
  response.json(await showRecordById(request.path, request.params.id));
});

app.post('/user', async (request, response) => {
  response.json(await createUser(request));
});

app.post('/todolist', async (request, response) => {
  response.json(await createTodoList(request));
});

app.post('/todoitem', async (request, response) => {
  response.json(await createTodoItem(request));
});

app.post('/reminder', async (request, response) => {
  response.json(await createReminder(request));
});

app.post('/tag', async (request, response) => {
  response.json(await createTag(request));
});

app.delete('/user/:id', async (request, response) => {
  response.json(await deleteUserById(request.params.id));
});

app.delete('/todolist/:id', async (request, response) => {
  response.json(await deleteTodoListById(request.params.id));
});

app.delete('/todoitem/:id', async (request, response) => {
  response.json(await deleteTodoItemById(request.params.id));
});

app.delete('/reminder/:id', async (request, response) => {
  response.json(await deleteReminderById(request.params.id));
});

app.delete('/tag/:id', async (request, response) => {
  response.json(await deleteTagById(request.params.id));
});

app.post('/todoitem/completed', async (request, response) => {
  response.json(await markItemWithListAsCompleted(request));
});

app.put('/todoitem/:id/completed', async (request, response) => {
  response.json(await markItemAsCompletedById(request.params.id));
});
