const express = require("express");
const mysql = require("mysql");

// Create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "nodemysql",
});

// Connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("mysql connected");
});

const app = express();

// Create DB
app.get("/createdb", (req, res) => {
  const sql = "create database nodemysql";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Database created...");
  });
});

//  Create tables
app.get("/createpoststable", (req, res) => {
  const sql =
    "create table posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Posts table created...");
  });
});

// Insert post 1
app.get("/addpost1", (req, res) => {
  const post = { title: "Post One", body: "This is post number one" };
  const sql = "INSERT INTO posts SET ?";
  const query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post 1 added...");
  });
});

// Insert post 2
app.get("/addpost2", (req, res) => {
  const post = { title: "Post Two", body: "This is post number two" };
  const sql = "INSERT INTO posts SET ?";
  const query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post 2 added...");
  });
});

// select posts
app.get("/getposts", (req, res) => {
  const sql = "SELECT * FROM posts";
  const query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send("Posts fetched...");
  });
});

// select single post
app.get("/getpost/:id", (req, res) => {
  const sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
  const query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(`Post with id: ${req.params.id} fetched...`);
  });
});

//   update posts
app.get("/updatepost/:id", (req, res) => {
  const newTitle = "Updated Title";
  const sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
  const query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(`Post with id: ${req.params.id} updated...`);
  });
});

//   delete post
app.get("/deletepost/:id", (req, res) => {
  const sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
  const query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(`Post with id: ${req.params.id} deleted...`);
  });
});

app.listen("3000", () => {
  console.log("Server started on port 3000");
});
