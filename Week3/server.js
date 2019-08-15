const fs = require('fs');
const express = require('express');
const app = express();

const {
  createList,
  createToDo,
  deleteList,
  deleteToDo,
  markAsDone,
  addReminder,
  callSelectQuery,
} = require('./functions.js');

app.use(express.json());

app.post('/list', async (req, res) => {
  res.json(await createList(req.body));
});

app.post('/todo', async (req, res) => {
  res.json(await createToDo(req.body));
});

app.delete('/list', async (req, res) => {
  res.json(await deleteList(req.body));
});

app.delete('/todo', async (req, res) => {
  res.json(await deleteToDo(req.body));
});

app.put('/todo', async (req, res) => {
  res.json(await markAsDone(req.body));
});

app.put('/list', async (req, res) => {
  res.json(await addReminder(req.body));
});

app.get('/:username/list', async (req, res) => {
  res.json(await callSelectQuery(req.params.username, 'myLists'));
});

app.get('/:username/todo', async (req, res) => {
  res.json(await callSelectQuery(req.params.username, 'myTodos'));
});

app.get('/:username/done', async (req, res) => {
  res.json(await callSelectQuery(req.params.username, 'myDoneTodos'));
});

app.get('/:username/reminders', async (req, res) => {
  res.json(await callSelectQuery(req.params.username, 'myReminders'));
});

app.listen(3000, () => {
  console.log('listening');
});
