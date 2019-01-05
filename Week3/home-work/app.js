const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const queries = require('./query.js');

app.use(bodyParser.json());



app.get('/user/:id', function (req, res) {
   queries.getAll(req.params.id).then(result => {
      res.send(result);
   }).catch(error => console.log(error));
});

app.post('/create-users/:id', function (req, res) {
   queries.createUser(req.params.id, req.body.firstName, req.body.lastName).then(result => {
      res.send(result);
   }).catch(error => console.log(error.message));
});

app.post('/create-list/:id', function (req, res) {
   queries.createList(req.params.id, req.body.category, req.body.prioritize).then(result => {
      res.send(result);
   }).catch(error => console.log(error.message));
});

app.get('/get-lists/:id', function (req, res) {
   queries.getAll(req.params.id).then(result => {
      res.send(result);
   }).catch(error => console.log(error.message));
});

app.post('/create-item/:id', function (req, res) {
   queries.createItem(req.params.id, req.body.todo, req.body.description, req.body.prioritize).then(result => {
      res.send(result);
   }).catch(error => console.log(error.message));
});

app.get('/get-items/:id', function (req, res) {
   queries.getAll(req.params.id).then(result => {
      res.send(result);
   }).catch(error => console.log(error.message));
});

app.delete('/delete-user/:id', function (req, res) {
   queries.deleteUser(req.params.id).then(result => {
      res.send(result);
   }).catch(error => console.log(error.message));
});


app.delete('/delete-list/:id', function (req, res) {
   queries.deleteList(req.params.id).then(result => {
      res.send(result);
   }).catch(error => console.log(error.message));
});

app.post('/item-completed/:id', function (req, res) {
   db.setItemCompleted(req.params.id).then(result => {
      res.send(result);
   }).catch(error => console.log(error.message));
});

app.put('/update-list/:id', function (req, res) {
   db.updateList(req.body.category, req.body.prioritize, req.params.id).then(result => {
      res.send(result);
   }).catch(error => console.log(error.message));
});

app.put('/update-item/:id', function (req, res) {
   db.updateList(req.body.todo, req.body.description, req.body.prioritize, req.params.id).then(result => {
      res.send(result);
   }).catch(error => console.log(error.message));
});

app.listen(8000, function () {
   console.log('app is running on port 8000');
});