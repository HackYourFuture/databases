'use strict';

const express = require('express');
const actions = require('./actions');

const app = express();
app.use(express.json());

app.post('/users', (req, res) => {
  actions
    .addUser(req.body)
    .then(data => res.send(data))
    .catch(error => console.log(error));
});

app.post('/users/:user_id', (req, res) => {
  actions
    .addList(req.params.user_id, req.body)
    .then(data => res.send(data))
    .catch(error => console.log(error));
});

app.post('/users/lists/:list_id', (req, res) => {
  actions
    .addItem(req.params.list_id, req.body)
    .then(data => res.send(data))
    .catch(error => console.log(error));
});

app.put('/users/lists/items/:item_id', (req, res) => {
  actions
    .markAsCompleted(req.params.item_id)
    .then(data => res.send(data))
    .catch(error => console.log(error));
});

app.put('/users/lists/:list_id/:time', (req, res) => {
  actions
    .addReminder(req.params.list_id, req.params.time)
    .then(data => res.send(data))
    .catch(error => console.log(error));
});

app.delete('/users/lists/:list_id/:item_id', (req, res) => {
  actions
    .deleteItem(req.params.list_id, req.params.item_id)
    .then(data => res.send(data))
    .catch(error => console.log(error));
});

app.delete('/users/:user_id/:list_id', (req, res) => {
  actions
    .deleteList(req.params.user_id, req.params.list_id)
    .then(data => res.send(data))
    .catch(error => console.log(error));
});

app.get('/users/:user_id', (req, res) => {
  actions
    .displayUser(req.params.user_id)
    .then(data => res.send(data))
    .catch(error => console.log(error));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, console.log(`Server listening on http://localhost:${PORT}`));
