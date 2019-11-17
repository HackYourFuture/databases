const util = require("util");
const mysql = require("mysql");
const test = require("./importData.js");

// 1- create connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mosleh1234"
});
// 2- connect

connection.connect(err => {
  if (err) {
    throw err;
  }
  console.log("Mysql connected");
});
// // 3- Create database
let sql = "CREATE DATABASE IF NOT EXISTS todo_app";
connection.query(sql, err => {
  if (err) throw err;
});
// 4- use database my_todo
connection.query("USE todo_app", err => {
  if (err) throw err;
});

const execQuery = util.promisify(connection.query.bind(connection));

async function showTable(req, res) {
  const tableName = req.params.table;
  try {
    const showRecords = await execQuery(`SELECT * FROM ` + tableName);
    res.status(200).send(showRecords);
  } catch (error) {
    return res.status(404).send("error");
  }
  res.end();
}
async function createUser(req, res) {
  try {
    await execQuery(`INSERT INTO users (user_name,email) VALUES (?,?)`, [
      req.body.user_name,
      req.body.user_name
    ]);
    res.status(201).send("new user inserted");
  } catch (error) {
    return res
      .status(404)
      .send("something went wrong during inserting new item");
  }
  res.end();
}
async function deleteUser(req, res) {
  try {
    await execQuery(`DELETE FROM users WHERE user_ID = ?`, [req.params.id]);
    res.status(201).send("user deleted");
  } catch (error) {
    return res.status(404).send("something went wrong during deleting user");
  }
  res.end();
}

async function insertTask(req, res) {
  try {
    await execQuery(`INSERT INTO task (task_name, description) VALUES (?, ?)`, [
      req.body.task_name,
      req.body.description
    ]);
    res.status(201).send("new task inserted");
  } catch (error) {
    return res
      .status(404)
      .send("something went wrong during inserting new task");
  }
  res.end();
}

async function deleteTask(req, res) {
  try {
    await execQuery(`DELETE FROM task WHERE task_ID = ?`, [req.params.id]);
    res.status(201).send("task deleted");
  } catch (error) {
    return res.status(404).send("something went wrong during deleting task");
  }
  res.end();
}

async function createTodoList(req, res) {
  try {
    await execQuery(
      `INSERT INTO todo_list (list_name,category_ID) VALUES (?, ?)`,
      [req.body.list_name, req.body.category_ID]
    );
    res.status(201).send("new todo list created");
  } catch (error) {
    res.status(404).send("something went wrong during creating new todo list");
  }
  res.end();
}

async function deleteTodoList(req, res) {
  try {
    await execQuery(`DELETE FROM todo_list WHERE list_ID =?`, [req.params.id]);
    res.status(201).send("Todo list deleted");
  } catch (error) {
    return res
      .status(404)
      .send("something went wrong during deleting new todo list");
  }
  res.end();
}

async function markAsDone(req, res) {
  try {
    await execQuery(
      `UPDATE user_todo_list SET process = 'done'  WHERE list_ID =?`,
      [req.params.id]
    );
    res.status(201).send("todo list is completed");
  } catch (error) {
    return res.status(400).send("there is an error");
  }
  res.end();
}

async function setReminder(req, res) {
  try {
    await execQuery(
      `UPDATE user_todo_list SET reminder =? WHERE list_ID = ?`,
      [req.body.reminder, req.params.id]
    );
    res.status(201).send("you have set reminder");
  } catch (error) {
    return res.status(404).send("there is an error");
  }
  res.end();
}

module.exports = {
  connection,
  showTable,
  createUser,
  deleteUser,
  insertTask,
  deleteTask,
  createTodoList,
  deleteTodoList,
  markAsDone,
  setReminder
};
