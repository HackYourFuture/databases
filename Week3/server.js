const express = require('express');
const app = express();
const query = require('./query.js');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

//try here to show all the tables no success ... the result is always undefined
app.get(`/`, (req, res) => {
  const x = query
    .showAll()
    .then(result => {
      return result;
    })
    .catch(error => console.log(error.name));
  res.send(x);
});
app.post(`/addUser/:id`, (req, res) => {
  console.log(req.body.user_name);
  query.createUser(req.params.id, req.body.user_name);
  res.send(`we have got it`);
});
app.post(`/addTodo/:id`, (req, res) => {
  query.createTodo(req.params.id, req.body.todos_name, req.body.user_id);
  res.send(`todos have been created`);
});
app.post(`/addItem/:id`, (req, res) => {
  query.createItem(req.params.id, req.body.item_info, req.body.done, req.body.todos_id);
  res.send(`item has been add `);
});
app.post(`/addReminder/:id`, (req, res) => {
  query.createReminder(req.params.id, req.body.time_reminder, req.body.todos_id);
  res.send(`reminder have been added`);
});

app.put(`/updateItem/:id`, (req, res) => {
  query.updateItem(req.params.id);
  res.send(`one item has been updated`);
});

app.delete(`/deleteItem/:id`, (req, res) => {
  query.deleteItem(req.params.id);
  res.send(`the item has been deleted`);
});

app.delete(`/deleteTodos/:id`, (req, res) => {
  query.deleteTodos(req.params.id);
  res.send(`todos have been deleted`);
});

app.listen(3000, console.log(`the server is running now`));
