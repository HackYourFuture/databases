const http = require("http");
const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const myPck = require("./pck");

//create database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
  });

//connect to database server
db.connect(err => {
    if (err) throw err;
        console.log('DB connection successful...');
});

Object.values(myPck.dbQueries).forEach(element =>{
    // console.log(element);
    db.query(element, (err) => {
          if (err) throw err;
          console.log("db command executed.")
    });
  });

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({   // to support URL-encoded bodies
  extended: true
}));

//display all todo lists from database
app.get('/todo_lists', function (req, res) {
    console.log(req);
    db.query('select * from todo_lists', function (error, results, fields) {
       if (error) throw error;
       res.end(JSON.stringify(results));
     });
 });

//display single todo list from database
app.get('/todo_lists/:id', function (req, res) {
  db.query('select * from todo_lists where list_id=?', [req.params.id], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
 
//display all users from database
app.get('/users', function (req, res) {
  console.log(req);
  db.query('select * from users', function (error, results, fields) {
     if (error) throw error;
     res.end(JSON.stringify(results));
   });
});

//display single user from database
app.get('/users/:id', function (req, res) {
  console.log(req);
  db.query('select * from users where user_id = ?', [req.params.id], function (error, results, fields) {
     if (error) throw error;
     res.end(JSON.stringify(results));
   });
});

//display all categories from database
app.get('/categories', function (req, res) {
  console.log(req);
  db.query('select * from categories', function (error, results, fields) {
     if (error) throw error;
     res.end(JSON.stringify(results));
   });
});

//display single category from database
app.get('/categories/:id', function (req, res) {
  console.log(req);
  db.query('select * from categories where category_id = ?', [req.params.id], function (error, results, fields) {
     if (error) throw error;
     res.end(JSON.stringify(results));
   });
});

//display all todo items from database
app.get('/todos', function (req, res) {
  console.log(req);
  db.query('select * from todo_items', function (error, results, fields) {
     if (error) throw error;
     res.end(JSON.stringify(results));
   });
});


//display single todo item from database
app.get('/todos/:id', function (req, res) {
  console.log(req);
  db.query('select * from todo_items where item_id = ?', [req.params.id], function (error, results, fields) {
     if (error) throw error;
     res.end(JSON.stringify(results));
   });
});

//create a new user into database
app.post('/users', function (req, res) {
   const postData  = req.body;
   db.query('INSERT INTO users SET ?', postData, function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

//create a new todo list into database
app.post('/todo_lists', function (req, res) {
  const postData  = req.body;
  db.query('INSERT INTO todo_lists SET ?', postData, function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});

//create a new todo into database
app.post('/todos', function (req, res) {
  const postData  = req.body;
  db.query('INSERT INTO todo_items SET ?', postData, function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});

//create a new category into database
app.post('/categories', function (req, res) {
  const postData  = req.body;
  db.query('INSERT INTO categories SET ?', postData, function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});

//delete todo list from database
app.delete('/todo_lists/:id', function (req, res) {
  connection.query('DELETE FROM todo_lists WHERE list_id = ?', [req.params.id], function (error, results, fields) {
   if (error) throw error;
   res.end('Todo list has been deleted!');
 });
});

//delete todo item from database
app.delete('/todo_items/:id', function (req, res) {
  connection.query('DELETE FROM todo_items WHERE item_id = ?', [req.params.id], function (error, results, fields) {
   if (error) throw error;
   res.end('Todo item has been deleted!');
 });
});

//update todo item isComplete att. as yes or no
app.put('/todos', function (req, res) {
  db.query('UPDATE `todo_items` SET `isComplete`=? where `item_id`=?', [req.body.isComplete, req.body.item_id], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});

//create localhost connection
const server = app.listen(3000, "127.0.0.1", function () {

  const host = server.address().address
  const port = server.address().port
 
  console.log("Listening at http://%s:%s", host, port)
 
});