const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'todo',
});

// Create User
const createUser = (req, res) => {
  // const user_id = req.body.id;
  const user_name = req.body.name;
  // const email = req.body.email;
  if (!user_name) {
    return res.status(400).send('Please enter a username for user!');
  }
  const createUser = `INSERT INTO Users (username) VALUES (?);`;
  connection.query(createUser, [user_name], err => {
    if (err) {
      return res.status(500).send('Something went wrong');
    }
  });
  return res.status(201).send('New user successfully created!');
};

//Get users
const getUsers = (req, res) => {
  const getUsersQuery = `SELECT * from users`;
  connection.query(getUsersQuery, (err, results) => {
    if (err) {
      return res.status(500).send('Something went wrong');
    }
    res.json(results);
  });
};

// Get a single user
const getUser = (req, res) => {
  const user_id = req.params.id;
  const getUsersQuery = `SELECT * from users WHERE user_id = ?`;
  connection.query(getUsersQuery, [user_id], (err, results) => {
    if (err) {
      return res.status(500).send('Something went wrong');
    }
    res.json(results);
  });
};

// Update User
const updateUser = (req, res) => {
  const user_id = req.params.id;
  const user_name = req.body.name;
  const updateUsersQuery = `UPDATE users SET username = ?  WHERE user_id = ${user_id}`;
  connection.query(updateUsersQuery, [user_name], err => {
    if (err) {
      return res.status(500).send('Something went wrong');
    }
    res.status(200).send('user updated');
  });
};

// Create todolist
const createTodoList = (req, res) => {
  // const todolist_id = req.body.id;
  const user_id = req.body.user;
  const todolist_name = req.body.name;

  const createTodolist = `INSERT INTO todolist (user_id, todolist_Name) VALUES (?, ?)`;
  connection.query(createTodolist, [user_id, todolist_name], err => {
    if (err) {
      throw err;
    }
    res.status(200).send('Todolist created!');
  });
};

// Delete todo list
const deleteTodoList = (req, res) => {
  const todolist_id = req.params.id;
  const deleteTodoListQuery = `DELETE FROM todolist WHERE todolist_id = ?`;
  connection.query(deleteTodoListQuery, [todolist_id], err => {
    if (err) {
      return res.status(500).send('Something went wrong');
    }
    res.status(200).send('Todo list deleted');
  });
};

//Create todos list
const createTodo = (req, res) => {
  // const todo_id = req.body.id;
  const todolist_id = req.body.todolist_id;
  const todo_item = req.body.name;
  const tag = req.body.tag;
  // const reminder = req.body.reminder;
  const done = req.body.done;
  const createTodo = `INSERT INTO todos (todolist_id, todo_item, tag, done ) VALUES (?, ?, ?, ?)`;
  connection.query(createTodo, [todolist_id, todo_item, tag, done], err => {
    if (err) {
      return res.status(500).send('Something went wrong');
    }
    return res.status(201).send('Todo item created!');
  });
};

// Detete todos item
const deleteTodoItem = (req, res) => {
  const todo_id = req.params.id;
  if (!todo_id) {
    return res.status(400).send('Todo not found!');
  }
  const deleteTodoQuery = `DELETE FROM todos WHERE todo_id = ${todo_id}`;
  connection.query(deleteTodoQuery, [todo_id], err => {
    if (err) {
      return res.status(500).send('Something went wrong');
    }
    res.status(200).send('Todo item deleted');
  });
};

//

//Mark todo item as done
const markAsDone = (req, res) => {
  const todo_id = req.params.id;
  const updateTodoQuery = `UPDATE todos SET done = true  WHERE todo_id = ${todo_id}`;
  connection.query(updateTodoQuery, [todo_id], err => {
    if (err) {
      return res.status(500).send('Something went wrong');
    }
    res.status(200).send('Todo item marked as done');
  });
};

app.post('/create/user', createUser);
app.get('/users', getUsers);
app.get('/users/:id', getUser);
app.put('/users/:id', updateUser);
app.post('/create/todolist', createTodoList);
app.delete('/todolist/:id', deleteTodoList);
app.post('/create/todo', createTodo);
app.delete('/todo/:id', deleteTodoItem);
app.put('/todo/:id', markAsDone);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
