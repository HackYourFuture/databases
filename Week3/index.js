const {
  createUser,
  getUserList,
  getOneUser,
  deleteUser,
  updateUser,
  createTodoList,
  getTodoList,
  getOneTodo,
  getOneTodoListItems,
  updateTodo,
  deleteTodo,
  createTodoItem,
  getTodoItemList,
  getOneTodoItem,
  updateTodoItem,
  deleteTodoItem,
} = require('./app');

const bodyParser = require('body-parser');
const Express = require('express');
const PORT = 3000;
const app = new Express();

app.use(bodyParser.json());

app.post(`/users`, createUser);
app.get(`/users`, getUserList);
app.get(`/users/:id`, getOneUser);
app.put(`/users/:id`, updateUser);
app.delete(`/users/:id`, deleteUser);
app.post(`/todos`, createTodoList);
app.get(`/todos`, getTodoList);
app.get(`/todos/:id`, getOneTodo);
app.get(`/todos/items/:id`, getOneTodoListItems);
app.put(`/todos/:id`, updateTodo);
app.delete(`/todos/:id`, deleteTodo);
app.post(`/items`, createTodoItem);
app.get(`/items`, getTodoItemList);
app.get(`/items/:id`, getOneTodoItem);
app.put(`/items/:id`, updateTodoItem);
app.delete(`/items/:id`, deleteTodoItem);

app.listen(PORT, error => {
  if (error) return console.error(error);

  console.log(`Server started on http://localhost:${PORT}`);
});
