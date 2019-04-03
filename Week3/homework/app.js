'use strict';

// SERVER CONNECTION ------------------------------------
const express = require('express');
const app = require('./connections/server');
app.use(express.json());

// REQUIRE FUNCTIONS ------------------------------------
const {
  add_user,
  add_list,
  add_todo,
  delete_user,
  delete_list,
  delete_todo,
  todo_completed,
  add_reminder,
} = require('./funs');

// ADD USER ------------------------------------
app.post('/users', (req, res) => {
  add_user(req.body.new_user)
    .then(data => res.send(data))
    .catch(error => console.log(error.message));
});

// ADD LIST ------------------------------------
app.post('/lists/:user_id', (req, res) => {
  add_list(req.params.user_id, req.body.new_list)
    .then(data => res.send(data))
    .catch(error => console.log(error.message));
});

// ADD TODO ------------------------------------
app.post('/todos/:list_id', (req, res) => {
  add_todo(req.params.list_id, req.body.new_todo)
    .then(data => res.send(data))
    .catch(error => console.log(error.message));
});

// DELETE USER ------------------------------------
app.delete('/users/:user_id', (req, res) => {
  delete_user(req.params.user_id)
    .then(data => res.send(data))
    .catch(error => console.log(error.message));
});

// DELETE LIST ------------------------------------
app.delete('/lists/:list_id', (req, res) => {
  delete_list(req.params.list_id)
    .then(data => res.send(data))
    .catch(error => console.log(error.message));
});

// DELETE TODO ------------------------------------
app.delete('/todos/:todo_id', (req, res) => {
  delete_todo(req.params.todo_id)
    .then(data => res.send(data))
    .catch(error => console.log(error.message));
});

// TODO COMPLETED ------------------------------------
app.put('/todos/:todo_id', (req, res) => {
  todo_completed(req.params.todo_id)
    .then(data => res.send(data))
    .catch(error => console.log(error.message));
});

// ADD REMINDER ------------------------------------
app.put('/lists/:list_id', (req, res) => {
  add_reminder(req.params.list_id, req.body.new_reminder)
    .then(data => res.send(data))
    .catch(error => console.log(error.message));
});
