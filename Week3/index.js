const express = require('express');
const list = require('./list');
const todo = require('./todo');

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.static('README.md'));
app.get('/', (req, res) => {
  res.send('Welcome Todo Api');
});

app.get('/:owner/', (req, res) => list.getLists(req, res));

app.post('/:owner/addList', (req, res) => list.addList(req, res));

app.delete('/:owner/deleteList/:id', (req, res) => list.deleteList(req, res));

app.put('/:owner/', (req, res) => list.markAs(req, res));

app.post('/:owner/:list_id', (req, res) => list.addReminder(req, res));

app.get('/:owner/:list_id/', (req, res) => todo.getTodos(req, res));

app.post('/:owner/:list_id/addTodo', (req, res) => todo.addTodo(req, res));

app.delete('/:owner/:list_id/deleteTodo/:id', (req, res) => todo.deleteTodo(req, res));

app.put('/:owner/:list_id/', (req, res) => todo.markAs(req, res));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
