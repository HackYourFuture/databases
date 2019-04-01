'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const query = require('./create_db.js');

app.use(bodyParser.json());

app.post('/createUser/:id', (request, response) => {
  query.createUser(request.params.userId, request.body.userName);
  response.send('user added');
});

app.post('/createList/:id', (request, response) => {
  query.createList(request.params.listId, request.body.listName);
  response.send('new list is added');
});

app.post('/createItem/:id', (request, response) => {
  query.createItem(request.params.itemId, request.body.description);
  response.send('new item is added');
});

app.post('/createReminder/:id', (request, response) => {
  query.createReminder(request.params.reminderId, request.body.reminder);
  response.send('new reminder is added');
});

app.put('/updateItem/:id', (request, response) => {
  query.updateItem(request.params.itemId, request.body.isCompleted);
  response.send('task is completed');
});

app.delete('/deleteItem/:id', (request, response) => {
  query.deleteItem(request.params.itemId);
  response.send('item is deleted');
});

app.delete('/deleteList/:id', (request, response) => {
  query.deleteList(request.params.listId);
  response.send('list is deleted');
});

app.listen(3000);
