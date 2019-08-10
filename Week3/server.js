const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.json());

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'toDoList',
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('database connected');
});

require('./routs')(app);

const port = 5555;
app.listen(port, () => {
  console.log('server is listening to ' + port);
});
