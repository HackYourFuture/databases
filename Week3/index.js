const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const sqlconnection = require('./sqlqueries.js');
const util = require('util');
const pug = require('pug');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'todoapp',
});

const app = express();

const execQuery = util.promisify(connection.query.bind(connection));

app.use(
  session({
    secret: 'elpsykongroo',
    resave: true,
    saveUninitialized: true,
  }),
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'pug');

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/auth', function(request, response) {
  const username = request.body.username;
  const password = request.body.password;
  if (username && password) {
    connection.query(
      'SELECT * FROM users WHERE username = ? AND password = ?',
      [username, password],
      function(error, results, fields) {
        if (results.length > 0) {
          request.session.loggedin = true;
          request.session.username = username;
          response.redirect('/home');
        } else {
          response.send('Incorrect Username and/or Password!');
        }
        response.end();
      },
    );
  } else {
    response.send('Please enter Username and Password!');
    response.end();
  }
});

app.get('/home', async (request, response) => {
  if (request.session.loggedin) {
    try {
      console.log(request.session);
      const result = await execQuery(`SELECT * FROM todolists `);
      console.log(result);
      //response.render('home');
      // response.send('Welcome back, ' + request.session.username + '!');
      response.status(200).send(result);
    } catch (error) {
      return response.status(404).send({ error });
    }
  } else {
    response.send('Please login to view this page!');
  }
  response.end();
});

app.listen(3000);
