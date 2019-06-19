const mysql = require('mysql');
const express = require('express');
const routes = require('./src/routes');
const app = express();
const port = 3333;
app.use(express.json());
app.use('/ToDoApp', routes);
app.listen(port, () => {
  console.log(`
  Listening to port number ${port} at localhost ...
`);
});
