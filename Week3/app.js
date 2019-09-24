const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Api = require('./api');
const api = new Api();

// parse application/json
app.use(bodyParser.json());

// users
app.get('/users', api.getUsersHandler);
app.get('/user/:id', api.getUserHandler);
app.post('/users', api.createUserHandler);
app.delete('/user/:id', api.deleteUserHandler);
app.put('/user/:id', api.updateUser);

//Todo list
app.get('/todolist', api.getTodolistHandler);
app.get('/todolist/:id', api.getSpecificTodolistHandler);
app.post('/todolist', api.createTodolistHandler);
app.delete('/todolist/:id', api.deleteTodolistHandler);
app.put('/todolist/:id', api.updateTodolistHandler);

//Todo item
app.get('/todoitems', api.getTodoItemsHandler);
app.get('/todoitem/:id', api.getTodoItemHandler);
app.post('/todoitems', api.createTodoItemHandler);
app.delete('/todoitem/:id', api.deleteTodoItemHandler);
app.put('/todoitem/:id', api.updateTodoItemHandler);

const port = process.env.PORT || 3000;
app.listen(port, err => {
  if (err) return console.log(err);
  console.log(`Server started on http://localhost:${port}`);
});
