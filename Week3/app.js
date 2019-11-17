const mysql = require("mysql");

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const { 
  showTable,
  createUser,
  deleteUser,
  insertTask,
  deleteTask,
  createTodoList,
  deleteTodoList,
  markAsDone,
  setReminder } = require('./actions')


app.get('/:table', (req, res) => {
  showTable(req, res)
});

app.post('/user', (req,res) =>{
  createUser(req,res)
})

app.delete('/user/:id', (req,res) =>{
  deleteUser(req,res)
})

app.post('/task', (req, res) => {
  insertTask(req, res)
});

app.delete('/task/:id', (req, res) => {
  deleteTask(req, res)
})

app.post('/todo_list', (req, res) => {
  createTodoList(req, res)
})

app.delete('/todo_list/:id', (req, res) => {
  deleteTodoList(req, res)
})

app.put('/complete/:id', (req, res) => {
  markAsDone(req, res)
})

app.put('/reminder/:id', (req, res) => {
  setReminder(req, res)
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
