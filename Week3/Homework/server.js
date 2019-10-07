const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const users = require('./users');
const list = require('./list');
const todos = require('./todos');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const middlewares = [
  express.static(path.join(__dirname, 'public')),
  bodyParser.urlencoded({ extended: false }),
];

app.use(middlewares);

app.use('/', users);
app.use('/', list);
app.use('/', todos);

app.listen(3000, () => {
  console.log('App running on port 3000');
});
