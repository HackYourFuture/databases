const http = require("http");
const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
  });

db.connect(err => {
    if (err) throw err;
        console.log('DB connection successful...');
});
  
const create_db = `CREATE DATABASE IF NOT EXISTS todo_app`;
db.query(create_db, (err) => {
  if (err) throw err;
  console.log('DB todo_app has been created.');
});

const use_db = `USE todo_app`;
db.query(use_db, (err) => {
  if (err) throw err;
  console.log('DB todo_app selected.');
});

const user = `CREATE TABLE IF NOT EXISTS user (
                                            user_id INT AUTO_INCREMENT, 
                                            name CHAR(52) NOT NULL, 
                                            PRIMARY KEY(user_id))`;

db.query(user, (err) => {
if (err) throw err;
console.log('User table created.');
});

const todo_lists = `CREATE TABLE IF NOT EXISTS todo_lists(
                                                        list_id INT AUTO_INCREMENT,
                                                        name CHAR(35),
                                                        description CHAR(200),
                                                        PRIMARY KEY(list_id))`;
                                                    
db.query(todo_lists, (err) => {
  if (err) throw err;
  console.log('Todo_lists table created.');
});

const todo_items = `CREATE TABLE IF NOT EXISTS todo_items(
                                                        item_id INT AUTO_INCREMENT,
                                                        name CHAR(35),
                                                        tag CHAR(35),
                                                        description CHAR(200),
                                                        isComplete CHAR(3),
                                                        deadline DATE,
                                                        PRIMARY KEY (item_id))`;

db.query(todo_items, (err) => {
if (err) throw err;
console.log('Todo_items table created.');
});

const categories = `CREATE TABLE IF NOT EXISTS categories(
                                                        category_id INT AUTO_INCREMENT,
                                                        name CHAR(35),
                                                        PRIMARY KEY(category_id))`;

db.query(categories, (err) => {
if (err) throw err;
console.log('Categories table created.');
});


app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/todo_lists', function (req, res) {
    console.log(req);
    db.query('select * from todo_lists', function (error, results, fields) {
       if (error) throw error;
       res.end(JSON.stringify(results));
     });
 });

const server = app.listen(3000, "127.0.0.1", function () {

  const host = server.address().address
  const port = server.address().port
 
  console.log("Listening at http://%s:%s", host, port)
 
});