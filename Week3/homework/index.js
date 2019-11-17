const express = require('express');
const list = require('./list');
const todo = require('./todo');

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.static('README.md'));
app.get('/', (req, res) => {
  res.send('Api');
});

app.get('/:person/', (req, res) => list.getLists(req, res));

app.post('/:person/addList', (req, res) => list.addList(req, res));

app.delete('/:person/deleteList/:id', (req, res) => list.deleteList(req, res));

app.put('/:person/', (req, res) => list.markAs(req, res));

app.post('/:person/:list_id', (req, res) => list.addReminder(req, res));

app.get('/:person/:list_id/', (req, res) => todo.getTodos(req, res));

app.post('/:person/:list_id/addTodo', (req, res) => todo.addTodo(req, res));

app.delete('/:person/:list_id/deleteTodo/:id', (req, res) => todo.deleteTodo(req, res));

app.put('/:person/:list_id/', (req, res) => todo.markAs(req, res));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
