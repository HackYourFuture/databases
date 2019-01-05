"use strict";

const path = require("path");
const root = path.join(__dirname, "../");
const express = require("express");
const bodyParser = require("body-parser");
const db = require(root + "app/database.js");
const app = express();

app.use("/public", express.static(root + "public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => res.sendFile(root + "index.html"));

app.post("/users", (req, res) => {
  db.checkUser(req.body).then(user => {
    if (user.email === req.body.email) {
      res.send(user);
    }
  }).catch(err => {
    res.send(err.message);
  });
});

app.post("/register", (req, res) => {
  db.createAccount(req.body);
  db.checkUser(req.body).then(user => {
    if (user.email === req.body.email) {
      res.send(user);
    }
  }).catch(err => {
    res.send(err.message);
  });
});

app.post("/create-list", (req, res) => {
  db.insertTodosList(req.body).then(success => {
    res.send("A new list is created with one todo item!");
  }).catch(err => {
    res.send(err.message);
  });
});

app.post("/create-todo", (req, res) => {
  db.insertTodo(req.body).then(result => {
    result.message ? res.send(false) : res.send(true);
  }).catch(err => {
    res.send(err.message);
  });
});

app.get("/all-lists/:id", (req, res) => {
  db.getLists(req.params.id, "allLists").then(lists => {
    res.send(lists);
  }).catch(err => {
    res.send(err.message);
  });
});

app.get("/lists-with-reminder/:id", (req, res) => {
  db.getLists(req.params.id, "withReminder").then(lists => {
    res.send(lists);
  }).catch(err => {
    res.send(err.message);
  });
});

app.get("/lists-without-reminder/:id", (req, res) => {
  db.getLists(req.params.id, "withoutReminder").then(lists => {
    res.send(lists);
  }).catch(err => {
    res.send(err.message);
  });
});

app.get("/not-completed-todos/:id", (req, res) => {
  db.getLists(req.params.id, "not-completed").then(lists => {
    res.send(lists);
  }).catch(err => {
    res.send(err.message);
  });
});

app.get("/completed-todos/:id", (req, res) => {
  db.getLists(req.params.id, "completed").then(lists => {
    res.send(lists);
  }).catch(err => {
    res.send(err.message);
  });
});

app.post("/check-id", (req, res) => {
  db.checkID(req.body).then(result => {
    res.send(result);
  }).catch(err => {
    res.send(err.message);
  });
});

app.get("/list/:id", (req, res) => {
  db.getListByID(req.params.id).then(list => {
    res.send(list);
  }).catch(err => {
    res.send(err.message);
  });
});

app.post("/edit-item", (req, res) => {
  db.editItem(req.body).then(result => {
    result.affectedRows ? res.send(true) : res.send(false);
  }).catch(err => {
    console.log(err);
    res.send(err.message);
  });
});

app.post("/remove-item", (req, res) => {
  db.deleteItem(req.body).then(result => {
    result.affectedRows ? res.send(true) : res.send(false);
  }).catch(err => {
    console.log(err);
    res.send(err.message);
  });
});

app.listen(3000, () => console.log("Connected... \nGo to http://localhost:3000"));