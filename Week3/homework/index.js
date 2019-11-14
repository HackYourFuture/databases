const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "todo_app"
});

// Create user
const createUser = (req, res) => {
  const user_id = req.body.user_id;
  const user_name = req.body.user_name;
  const createUser = `INSERT INTO users (user_id, user_name) VALUES (?, ?)`;
  connection.query(createUser, [user_id, user_name], err => {
    if (err) throw err;
    return res.send(`New user added!`).end();
  });
};

// Get all users
const getUsers = (req, res) => {
  const getUsers = `SELECT * FROM users`;
  connection.query(getUsers, (err, results) => {
    if (err) throw err;
    res.json(results).end();
  });
};

//  Get user
const getUser = (req, res) => {
  const user_id = req.params.id;
  const getUser = `SELECT * FROM users WHERE user_id = ?`;
  connection.query(getUser, [user_id], (err, results) => {
    if (err) throw err;
    res.json(results).end();
  });
};

// Update user
const updateUser = (req, res) => {
  const user_id = req.params.id;
  const user_name = req.body.name;
  const updateUserQuery = `UPDATE users SET user_name = ? WHERE user_id = ?`;
  connection.query(updateUserQuery, [user_name, user_id], err => {
    if (err) throw err;
    res.send(`User ${user_id} is updated`).end();
  });
};

// Create todo list
const createTodoList = (req, res) => {
  const todolist_id = req.body.todolist_id;
  const todolist_name = req.body.name;
  const reminder = req.body.reminder;
  const user_id = req.body.user_id;
  const createTodoList = `INSERT INTO todo_list (todoList_id, todoList_Name, reminder, user_id) VALUES (?, ?, ?, ?)`;
  connection.query(
    createTodoList,
    [todolist_id, todolist_name, reminder, user_id],
    err => {
      if (err) throw err;
      res.send(`Todo list has been created`).end();
    }
  );
};

// Get todo lists
const getTodoList = (req, res) => {
  const getTodoListQuery = `SELECT * FROM todo_list`;
  connection.query(getTodoListQuery, (err, results) => {
    if (err) throw err;
    res.json(results).end();
  });
};

// Delete todo list
const deleteTodoList = (req, res) => {
  const id = req.params.id;
  const deleteTodoListQuery = `DELETE FROM todo_list WHERE todolist_id = ?`;
  connection.query(deleteTodoListQuery, [id], err => {
    if (err) throw err;
    res.send("Todo list deleted").end();
  });
};

// Set Reminder
const setReminder = (req, res) => {
  const todo_list_id = req.params.id;
  const reminder = req.body.reminder;
  const reminderQuery = `UPDATE todo_list SET reminder = ? WHERE todolist_id = ?`;
  connection.query(reminderQuery, [reminder, todo_list_id], err => {
    if (err) throw err;
    res.send(`Todolist reminder is updated`).end();
  });
};

// Create todo item
const createTodo = (req, res) => {
  const todo_id = req.body.todo_id;
  const todo_name = req.body.todo_name;
  const end_date = req.body.end_date;
  const tag = req.body.tag;
  const done = req.body.done;
  const todolist_id = req.body.todolist_id;

  const createTodoQuery = `INSERT INTO todos (todo_id, todo_name, end_date, tag, done, todolist_id) VALUES (?, ?, ?, ?, ?, ?)`;
  connection.query(
    createTodoQuery,
    [todo_id, todo_name, end_date, tag, done, todolist_id],
    err => {
      if (err) throw err;
      return res.send("Todo item created!").end();
    }
  );
};

// Get todo items
const getTodos = (req, res) => {
  const getTodosQuery = `SELECT * FROM todos`;
  connection.query(getTodosQuery, (err, results) => {
    if (err) throw err;
    res.json(results).end();
  });
};

// Delete todo item
const deleteTodoItem = (req, res) => {
  const todoId = req.params.id;
  const deleteTodoQuery = `DELETE FROM todos WHERE todo_id = ?`;
  connection.query(deleteTodoQuery, [todoId], err => {
    if (err) throw err;
    return res.send(`Reminder is set`).end();
  });
};

// Mark as done
const markAsDone = (req, res) => {
  const todoId = req.body.todo_id;
  const markAsDoneQuery = `UPDATE todos SET done = true WHERE todo_id = ?`;
  connection.query(markAsDoneQuery, [todoId], err => {
    if (err) throw err;
    return res.send(`Todo is marked as DONE`).end();
  });
};

app.post("/create/user", createUser);
app.get("/users", getUsers);
app.get("/users/:id", getUser);
app.put("/users/:id", updateUser);

app.post("/create/todolist", createTodoList);
app.get("/todolist", getTodoList);
app.delete("/todolist/:id", deleteTodoList);
app.patch("/reminder/:id", setReminder);

app.post("/create/todo", createTodo);
app.get("/todo", getTodos);
app.delete("/todo/:id", deleteTodoItem);
app.put("/todo/:id", markAsDone);

const PORT = 3000;
app.listen(PORT, error => {
  if (error) return console.error(error);
  console.log(`Server started on http://localhost:${PORT}`);
});
