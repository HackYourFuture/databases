'use strict';

const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  port = process.env.PORT || 3000;

const mysql = require('mysql');
// connection configurations
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'hyfpassword',
  database: 'toDoApp',
});

// connect to database
connection.connect();

app.listen(port);

console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./app/appRoutes'); //importing route
routes(app); //register the route
