const express = require('express');
const bodyParser = require('body-parser');
const query = require('./query.js')
const app = express();

app.use(bodyParser.json());

app.get('/', (request, response) => {
  const main = query.showTables()
    .then(results => {
      return results;
    })
    .catch(err => console.error(err));
  response.send(main);
});

app.post('/adduser/:id', (request, response) => {
  query.addUser(request.params.id, request.params.name);
  response.send('done');
})

app.post('/addtodo/:id', (request, response) => {
  query.addTodo(request.params.id, request.params.user_id, request.params.title);
  response.send('done');
})

app.post('/additem/:id', (request, response) => {
  query.addItem(request.params.id, request.params.title, request.param.done);
  response.send('done');
})

app.post('/addreminder/:id', (request, response) => {
  query.addReminder(request.params.id, request.params.item_id, request.params.date);
  response.send('done');
})

app.delete('/delettodo/:id', (request, response) => {
  query.deletTodo(request.params.id)
  response.send('deleted');
})

app.delete('/deletitem/:id', (request, response) => {
  query.deleteItem(request.params.id)
  response.send('deleted');
})

app.listen(8000, consol.log(`listening on port 8000`));