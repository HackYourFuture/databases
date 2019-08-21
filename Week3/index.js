const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'todo_appdb',
});

// Create User
const createUser = (req, res) => {
  const user_id = req.body.id;
  const user_name = req.body.name;
  const email = req.body.email;
  if (!user_id || !user_name) {
    return res.status(400).send('Please enter a name and id for user!');
  }
  const createUser = `INSERT INTO Users (User_id, Name, Email) VALUES (?, ?, ?);`;
  connection.query(createUser, [user_id, user_name, email], err => {
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
  const user_name = req.body.name;
  const user_id = req.params.id;
  const updateUsersQuery = `UPDATE users SET Name = ?  WHERE user_id = ?`;
  connection.query(updateUsersQuery, [user_name, user_id], err => {
    if (err) {
      return res.status(500).send('Something went wrong');
    }
    res.status(200).end();
  });
};

//Create Todo item
const createTodo = (req, res) => {
  const todo_id = req.body.id;
  const todo_name = req.body.name;
  const due_date = req.body.date;
  const tag = req.body.tag;
  const done = req.body.done;
  const todolist_id = req.body.todolist_id;
  const createTodo = `INSERT INTO todos (Todo_id, Todo_Name, Due_Date, Tag, Done, TodoList_id) VALUES (?, ?, ?, ?, ?, ?)`;
  connection.query(createTodo, [todo_id, todo_name, due_date, tag, done, todolist_id], err => {
    if (err) {
      return res.status(500).send('Something went wrong');
    }
    return res.status(201).send('Todo item created!');
  });
};

// Detete todo item
const deleteTodoItem = (req, res) => {
  const todo_id = req.params.id;
  if (!todo_id) {
    return res.status(400).send('Todo not found!');
  }
  const deleteTodoQuery = `DELETE FROM todos WHERE todo_id = ?`;
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
  const updateTodoQuery = `UPDATE todos SET Done = true  WHERE todo_id = ?`;
  connection.query(updateTodoQuery, [todo_id], err => {
    if (err) {
      return res.status(500).send('Something went wrong');
    }
    res.status(200).send('Todo item marked as done');
  });
};

// Create todo list
const createTodoList = (req, res) => {
  const todoList_id = req.body.id;
  const todoList_name = req.body.name;
  const reminder = req.body.reminder;
  const user_id = req.body.user;

  const createTodoList = `INSERT INTO todolist (TodoList_id, TodoList_Name, Reminder, User_id) VALUES (?, ?, ?, ?)`;
  connection.query(createTodoList, [todoList_id, todoList_name, reminder, user_id], err => {
    if (err) {
      throw err;
    }
    res.status(200).send('Todolist created!');
  });
};

// Delete todo list
const deleteTodoList = (req, res) => {
  const todo_id = req.params.id;
  const deleteTodoListQuery = `DELETE FROM todolist WHERE todolist_id = ?`;
  connection.query(deleteTodoListQuery, [todo_id], err => {
    if (err) {
      return res.status(500).send('Something went wrong');
    }
    res.status(200).send('Todo list deleted');
  });
};

// Add reminder
const addReminder = (req, res) => {
  const todolist_id = req.params.id;
  const reminder = req.body.reminder;
  const addReminderQuery = `UPDATE todolist SET Reminder = ?  WHERE todolist_id = ?`;
  connection.query(addReminderQuery, [todolist_id, reminder], err => {
    if (err) {
      return res.status(500).send('Something went wrong');
    }
    res.status(200).send('Todolist reminder is set!');
  });
};

app.post('/create/user', createUser);
app.get('/users', getUsers);
app.get('/users/:id', getUser);
app.put('/users/:id', updateUser);
app.post('/create/todo', createTodo);
app.put('/todo/:id', markAsDone);
app.post('/create/todolist', createTodoList);
app.delete('/todo/:id', deleteTodoItem);
app.delete('/todolist/:id', deleteTodoList);
app.put('/reminder/:id', addReminder);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
