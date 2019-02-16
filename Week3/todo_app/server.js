'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const {
  addUser,
  addList,
  addItem,
  removeList,
  removeItem,
  markCompleted,
  activateReminder,
  showUserLists,
  showListItems,
} = require('./databaseActions.js');

const app = express();
app.use(bodyParser.json());

app.get('/users/:user_id', (req, res) => {
  const user_id = req.params.user_id;
  showUserLists(user_id)
    .then(result => res.send(result))
    .catch(err => console.error(err));
});

app.get('/users/lists/:list_id', (req, res) => {
  const list_id = req.params.list_id;
  showListItems(list_id)
    .then(result => res.send(result))
    .catch(err => console.error(err));
});

app.post('/users', (req, res) => {
  addUser(req.body)
    .then(result => res.send(result))
    .catch(err => console.error(err));
});

app.post('/users/:user_id', (req, res) => {
  const user_id = req.params.user_id;
  addList(user_id, req.body)
    .then(result => res.send(result))
    .catch(err => console.error(err));
});

app.post('/users/lists/:list_id', (req, res) => {
  const list_id = req.params.list_id;
  addItem(list_id, req.body)
    .then(result => res.send(result))
    .catch(err => console.error(err));
});

app.delete('/users/:user_id/:list_id', (req, res) => {
  const user_id = req.params.user_id;
  const list_id = req.params.list_id;
  removeList(user_id, list_id)
    .then(result => res.send(result))
    .catch(err => console.error(err));
});

app.delete('/users/lists/:list_id/:item_id', (req, res) => {
  const list_id = req.params.list_id;
  const item_id = req.params.item_id;
  removeItem(list_id, item_id)
    .then(result => res.send(result))
    .catch(err => console.error(err));
});

app.put('/users/lists/items/:item_id', (req, res) => {
  const item_id = req.params.item_id;
  markCompleted(item_id)
    .then(result => res.send(result))
    .catch(err => console.error(err));
});

app.put('/users/lists/:list_id/:time', (req, res) => {
  const time = req.params.time;
  const list_id = req.params.list_id;
  activateReminder(list_id, time)
    .then(result => res.send(result))
    .catch(err => console.error(err));
});

app.listen(3000);
