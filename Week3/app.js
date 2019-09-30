const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const User = require('./api/user');
const List = require('./api/list');
const Todo = require('./api/todo');
const user = new User();
const list = new List();
const todo = new Todo();
const { asyncMiddleware } = require('./middleware/error');
const { InternalServerErrorHandler, errorNotFoundHandler } = require('./middleware/error');
// parse application/json
app.use(bodyParser.json());
// users
app.get('/users', asyncMiddleware(user.getUsersHandler));
app.get('/user/:id', asyncMiddleware(user.getUserHandler));
app.post('/users', asyncMiddleware(user.createUserHandler));
app.delete('/user/:id', asyncMiddleware(user.deleteUserHandler));
app.put('/user/:id', asyncMiddleware(user.updateUser));

//Todo list
app.get('/todolist', asyncMiddleware(list.getTodolistHandler));
app.get('/todolist/:id', asyncMiddleware(list.getSpecificTodolistHandler));
app.post('/todolist', asyncMiddleware(list.createTodolistHandler));
app.delete('/todolist/:id', asyncMiddleware(list.deleteTodolistHandler));
app.put('/todolist/:id', asyncMiddleware(list.updateTodolistHandler));

//Todo item
app.get('/todoitems', asyncMiddleware(todo.getTodoItemsHandler));
app.get('/todoitem/:id', asyncMiddleware(todo.getTodoItemHandler));
app.post('/todoitems', asyncMiddleware(todo.createTodoItemHandler));
app.delete('/todoitem/:id', asyncMiddleware(todo.deleteTodoItemHandler));
app.put('/todoitem/:id', asyncMiddleware(todo.updateTodoItemHandler));

app.use(errorNotFoundHandler);
app.use(InternalServerErrorHandler);

const port = process.env.PORT || 3000;
app.listen(port, err => {
  if (err) return console.log(err);
  console.log(`Server started on http://localhost:${port}`);
});
