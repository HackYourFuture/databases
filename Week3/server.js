'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const db = require('./queries.js');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/createUser/:id', (request, response) => {
  db.createUser(request.params.userId, request.body.userName);
  response.send('user added');
});

app.post('/createList/:id', (request, response) => {
  db.createList(request.params.listId, request.body.listName);
  response.send('new list is added');
});

app.post('/createItem/:id', (request, response) => {
  db.createItem(request.params.itemId, request.body.description);
  response.send('new item is added');
});

app.post('/createReminder/:id', (request, response) => {
  db.createReminder(request.params.reminderId, request.body.reminder);
  response.send('new reminder is added');
});

app.put('/updateItem/:id', (request, response) => {
  db.updateItem(request.params.itemId, request.body.isCompleted);
  response.send('task is completed');
});

app.delete('/deleteItem/:id', (request, response) => {
  db.deleteItem(request.params.itemId);
  response.send('item is deleted');
});

app.delete('/deleteList/:id', (request, response) => {
  db.deleteList(request.params.listId);
  response.send('list is deleted');
});

app.listen(port, () => console.log(`The app is listening to the port ${port}! =) enjoy!`));
