"use strict";

const bodyParser = require("body-parser");
const express = require("express");
const db = require("./queries.js");
const app = express();

app.use(bodyParser.json());

app.post("/create-user/:id", (req, res) => {
  db.createUser(req.params.id, req.body.user_name, req.body.user_last_name);
  res.send("user added successfully");
});

app.post("/create-list/:id", (req, res) => {
  db.createList(req.params.id, req.body.caption);
  res.send("new list was added successfully");
});

app.post("/create-item/:id", (req, res) => {
  db.createItem(req.params.id, req.body.description);
  res.send("new item was added successfully");
});

app.post("/create-reminder/:id", (req, res) => {
  db.createReminder(req.params.id, req.body.reminder);
  res.send("new reminder was added successfully");
  console.log(res);

});


app.put("/update-item/:id", (req, res) => {
  db.updateItem(req.params.id, req.body.is_completed);
  res.send("task is completed");
});

app.delete("/delete-item/:id", (req, res) => {
  db.deleteItem(req.params.id);
  res.send(" item was deleted successfully");
});

app.delete("/delete-list/:id", (req, res) => {
  db.deleteList(req.params.id);
  res.send("list was deleted successfully");
});

app.listen(3000);
console.log("listening on 3000");