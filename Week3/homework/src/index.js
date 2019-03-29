'use-strict';

const express = require('express');
const routes = require('./routes');
const app = express();
const port = 3001;

app.use(express.json());
app.use('/ToDoApp', routes);

app.listen(port, () =>
  console.log(`
Todo app started! - Listening to port number ${port} at localhost ...
`)
);
