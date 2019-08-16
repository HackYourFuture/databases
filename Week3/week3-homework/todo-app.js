const express = require('express');
const { showTable, addTodoItem, deleteTodoItem, addTodoList, deleteTodoList, markCompleted, addReminder } = require('./actions/action')
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());


app.get('/:table', (req, res) => {
  showTable(req, res)
});

app.post('/add_todo_item', (req, res) => {
  addTodoItem(req, res)
});

app.delete('/delete_todo_item/:id', (req, res) => {
  deleteTodoItem(req, res)
})

app.post('/add_todo_list', (req, res) => {
  addTodoList(req, res)
})

app.delete('/delete_todo_list/:id', (req, res) => {
  deleteTodoList(req, res)
})

app.put('/markcompleted_todo_list_item/:id', (req, res) => {
  markCompleted(req, res)
})

app.put('/reminder_user_todo_list/:id', (req, res) => {
  addReminder(req, res)
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening to port ${PORT}`));


