'use strict'

const express = require('express');
const todoMethodList = require('./app');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser());

const port = 3000;

//categories
app.get('/categories', async (req, res) => {
  const msg = await todoMethodList.listCategory();
  res.send(JSON.parse(msg));
});
//{"category": { "name": "Sport Lesson" }}
app.post('/categories', async (req, res) => {
  const msg = await todoMethodList.createCategory(JSON.parse(JSON.stringify(req.body.category)).name);

  res.send(msg);
});
app.put('/categories/:id', async (req, res) => {
  const msg = await todoMethodList.updateCategory(req.params.id, JSON.parse(JSON.stringify(req.body.category)).name);
  res.send(msg);
});
app.delete('/categories/:id', async (req, res) => {
  const msg = await todoMethodList.deleteCategory(req.params.id);
  res.send(msg);
});

//lists
app.get('/lists', async (req, res) => {
  const msg = await todoMethodList.listLists();
  res.send(msg);
});
//{"lists": { "name": "Sport Lesson", "activeCategoryId": 1, "reminderId":null }}
app.post('/lists', async (req, res) => {
  const msg = await todoMethodList.createList(JSON.parse(JSON.stringify(req.body.lists)).name, JSON.parse(JSON.stringify(req.body.lists)).activeCategoryId, JSON.parse(JSON.stringify(req.body.lists)).reminderId);
  res.send(msg);
});
app.put('/lists/:id', async (req, res) => {
  const msg = await todoMethodList.updateList(req.params.id, JSON.parse(JSON.stringify(req.body.lists)).name, JSON.parse(JSON.stringify(req.body.lists)).activeCategoryId, JSON.parse(JSON.stringify(req.body.lists)).reminderId);
  res.send(msg);
});
app.delete('/lists/:id', async (req, res) => {
  const msg = await todoMethodList.deleteList(req.params.id);
  res.send(msg);
});

//reminders
app.get('/reminders', async (req, res) => {
  const msg = await todoMethodList.listReminders();
  res.send(msg);
});
//{"reminder": { "name": "My birthday", "reminderStartDate": "2019-05-29", "reminderEndDate":"2019-05-30" }}
app.post('/reminders', async (req, res) => {
  const msg = await todoMethodList.createReminder(JSON.parse(JSON.stringify(req.body.reminder)).name, JSON.parse(JSON.stringify(req.body.reminder)).reminderStartDate, JSON.parse(JSON.stringify(req.body.reminder)).reminderEndDate);
  res.send(msg);
});
app.put('/reminders/:id', async (req, res) => {
  const msg = await todoMethodList.updateReminder(req.params.id, JSON.parse(JSON.stringify(req.body.reminder)).name, JSON.parse(JSON.stringify(req.body.reminder)).reminderStartDate, JSON.parse(JSON.stringify(req.body.reminder)).reminderEndDate);
  res.send(msg);
});
app.delete('/reminders/:id', async (req, res) => {
  const msg = await todoMethodList.deleteReminder(req.params.id);
  res.send(msg);
});


//tags
app.get('/tags', async (req, res) => {
  const msg = await todoMethodList.listTags();
  res.send(msg);
});
//{"tag": { "name": "Emergency"}}
app.post('/tags', async (req, res) => {
  const msg = await todoMethodList.createTags(JSON.parse(JSON.stringify(req.body.tag)).name);
  res.send(msg);
});
app.put('/tags/:id', async (req, res) => {
  const msg = await todoMethodList.updateTags(req.params.id, JSON.parse(JSON.stringify(req.body.tag)).name);
  res.send(msg);
});
app.delete('/tags/:id', async (req, res) => {
  const msg = await todoMethodList.deleteTags(req.params.id);
  res.send(msg);
});


//Users
app.get('/users', async (req, res) => {
  const msg = await todoMethodList.listUsers();
  res.send(msg);
});
//{"user": { "name": "Merve", "surname": "Aydin", "username":"maydin", "password":"1234", "email":"m@gmail.com", "tel":"06 123 456 30"}}
app.post('/users', async (req, res) => {
  const msg = await todoMethodList.createUser(JSON.parse(JSON.stringify(req.body.user)).name, JSON.parse(JSON.stringify(req.body.user)).surname, JSON.parse(JSON.stringify(req.body.user)).username, JSON.parse(JSON.stringify(req.body.user)).password, JSON.parse(JSON.stringify(req.body.user)).email, JSON.parse(JSON.stringify(req.body.user)).tel);
  res.send(msg);
});
app.put('/users/:id', async (req, res) => {
  const msg = await todoMethodList.updateUser(req.params.id, JSON.parse(JSON.stringify(req.body.user)).name, JSON.parse(JSON.stringify(req.body.user)).surname, JSON.parse(JSON.stringify(req.body.user)).username, JSON.parse(JSON.stringify(req.body.user)).password, JSON.parse(JSON.stringify(req.body.user)).email, JSON.parse(JSON.stringify(req.body.user)).tel);
  res.send(msg);
});
app.delete('/users/:id', async (req, res) => {
  const msg = await todoMethodList.deleteUser(req.params.id);
  res.send(msg);
});


//listToDoItems
app.get('/listToDoItems', async (req, res) => {
  const msg = await todoMethodList.listToDoItems();
  res.send(msg);
});
//{"listToDoItem": { "name": "ToDoItem", "description": "Desc", "activeListId":1, "isCompleted":true, "tagId":null}}
app.post('/listToDoItems', async (req, res) => {
  const msg = await todoMethodList.createToDoItem(JSON.parse(JSON.stringify(req.body.listToDoItem)).name, JSON.parse(JSON.stringify(req.body.listToDoItem)).description, JSON.parse(JSON.stringify(req.body.listToDoItem)).activeListId, JSON.parse(JSON.stringify(req.body.listToDoItem)).isCompleted, JSON.parse(JSON.stringify(req.body.listToDoItem)).tagId);
  res.send(msg);
});
app.put('/listToDoItems/:id', async (req, res) => {
  const msg = await todoMethodList.updateToDoItem(req.params.id, JSON.parse(JSON.stringify(req.body.listToDoItem)).name, JSON.parse(JSON.stringify(req.body.listToDoItem)).description, JSON.parse(JSON.stringify(req.body.listToDoItem)).activeListId, JSON.parse(JSON.stringify(req.body.listToDoItem)).isCompleted, JSON.parse(JSON.stringify(req.body.listToDoItem)).tagId);
  res.send(msg);
});
app.delete('/listToDoItems/:id', async (req, res) => {
  const msg = await todoMethodList.deleteToDoItem(req.params.id);
  res.send(msg);
});

//listUsersCatalogs
app.get('/listUsersCatalogs', async (req, res) => {
  const msg = await todoMethodList.listUsersCatalogs();
  res.send(msg);
});
//{"listUsersCatalog": { "userId": 3, "categoryId": 2, "readRight":true, "writeRight":true}}
app.post('/listUsersCatalogs', async (req, res) => {
  const msg = await todoMethodList.createUsersCatalogs(JSON.parse(JSON.stringify(req.body.listUsersCatalog)).userId, JSON.parse(JSON.stringify(req.body.listUsersCatalog)).categoryId, JSON.parse(JSON.stringify(req.body.listUsersCatalog)).readRight, JSON.parse(JSON.stringify(req.body.listUsersCatalog)).writeRight);
  res.send(msg);
});
app.put('/listUsersCatalogs/:id', async (req, res) => {
  const msg = await todoMethodList.updateUsersCatalogs(req.params.id, JSON.parse(JSON.stringify(req.body.listUsersCatalog)).userId, JSON.parse(JSON.stringify(req.body.listUsersCatalog)).categoryId, JSON.parse(JSON.stringify(req.body.listUsersCatalog)).readRight, JSON.parse(JSON.stringify(req.body.listUsersCatalog)).writeRight);
  res.send(msg);
});
app.delete('/listUsersCatalogs/:id', async (req, res) => {
  const msg = await todoMethodList.deleteUsersCatalogs(req.params.id);
  res.send(msg);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

/*GET=read
POST
PUT=update
DELETE */