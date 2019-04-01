const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const db = require('./db.js');

app.use(bodyParser.json());

app.get('/user/:id', function(req, res) {
  db.getAll(req.params.id)
    .then(result => {
      res.send(result);
    })
    .catch(error => console.log(error));
});

app.post('/create-user/:id', function(req, res) {
  let id = req.params.id;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  db.createUser(id, firstName, lastName)
    .then(result => {
      res.send(result);
    })
    .catch(error => console.log(error.message));
});

app.post('/create-list/:id', function(req, res) {
  let UserId = req.params.id;
  let category = req.body.category;
  let prioritize = req.body.prioritize;
  db.createList(UserId, category, prioritize)
    .then(result => {
      res.send(result);
    })
    .catch(error => console.log(error.message));
});

app.get('/get-lists/:id', function(req, res) {
  db.getAll(req.params.id)
    .then(result => {
      res.send(result);
    })
    .catch(error => console.log(error));
});

app.post('/create-item/:id', function(req, res) {
  let listId = req.params.id;
  let todo = req.body.todo;
  let description = req.body.description;
  let prioritize = req.body.prioritize;
  db.createItem(listId, todo, description, prioritize)
    .then(result => {
      res.send(result);
    })
    .catch(error => console.log(error.message));
});

app.get('/get-items/:id', function(req, res) {
  db.getAll(req.params.id)
    .then(result => {
      res.send(result);
    })
    .catch(error => console.log(error));
});

app.delete('/delete-user/:id', function(req, res) {
  let id = req.params.id;
  db.deleteUser(id)
    .then(result => {
      res.send(result);
    })
    .catch(error => console.log(error.message));
});

app.delete('/delete-list/:id', function(req, res) {
  let id = req.params.id;
  db.deleteList(id)
    .then(result => {
      res.send(result);
    })
    .catch(error => console.log(error.message));
});

app.delete('/delete-item/:id', function(req, res) {
  let itemId = req.params.id;
  db.deleteItem(itemId)
    .then(result => {
      res.send(result);
    })
    .catch(error => console.log(error.message));
});

app.post('/item-completed/:id', function(req, res) {
  let listId = req.params.id;
  db.setItemCompleted(listId)
    .then(result => {
      res.send(result);
    })
    .catch(error => console.log(error.message));
});

app.put('/update-list/:id', function(req, res) {
  let listId = req.params.id;
  let category = req.body.category;
  let prioritize = req.body.prioritize;
  db.updateList(category, prioritize, listId)
    .then(result => {
      res.send(result);
    })
    .catch(error => console.log(error.message));
});

app.put('/update-item/:id', function(req, res) {
  let itemId = req.params.id;
  let todo = req.body.todo;
  let description = req.body.description;
  let prioritize = req.body.prioritize;
  db.updateList(todo, description, prioritize, itemId)
    .then(result => {
      res.send(result);
    })
    .catch(error => console.log(error.message));
});

app.listen(3001);
