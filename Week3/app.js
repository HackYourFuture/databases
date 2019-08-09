'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {
  addUser,
  addToDoList,
  addItem,
  addReminder,
  updateItem,
  deleteItem,
  deleteList,
} = require('./mysql');

app.use(bodyParser.json());

app.post('/users/:id', (req, res) => {
  addUser(req.body.userName, req.params.userId)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).send({ message: error.message }));
});

app.post('/ToDoList/:id', (req, res) => {
  addToDoList(req.body.listName, req.params.ToDoListId)
    .then(() => res.status(200).send(`${listName}is added!`))
    .catch(error => res.status(500).send({ message: "list couldn't be added!", error }));
});

app.post('/Item/:id', (req, res) => {
  addItem(req.body.description, req.params.itemId)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).send({ message: "Item couldn't be added!", error }));
});

app.post('/reminder/:id', (req, res) => {
  addReminder(req.params.reminderId, req.body.reminder)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).send({ message: 'list is not completed!', error }));
});

app.put('/Item/:id', (req, res) => {
  updateItem(req.params.itemId, req.body.isCompleted)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).send({ message: error.message }));
});

app.delete('/Item/:id', (req, res) => {
  deleteItem(req.params.itemId, res)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).send({ message: "Item couldn't be deleted!", error }));
});

app.delete('/ToDoList', (req, res) => {
  deleteList(req.params.ToDoListId, res)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).send({ message: 'Item not found!', error }));
});

const PORT = 5000;

app.listen(PORT, err => {
  if (err) {
    console.log(err);
  }
  console.log(`Server listening on http://localhost:${PORT}`);
});
