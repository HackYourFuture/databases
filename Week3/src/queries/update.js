'use-strict';

const connection = require('./connection');
const { getUsers, getTaskLists, getTasks } = require('./get');

const updateUserQuery = `UPDATE users SET Name = ?,Email = ?WHERE User_Id = ?;`;
const updateTaskListQuery = `UPDATE todolists SET ToDoList_Name = ?,Reminder = STR_TO_DATE( ?, '%d/%m/%Y %H:%i:%s')WHERE ToDoList_Id = ?;`;
const updateTaskQuery = `UPDATE todos SET Todo_Name = ?,Due_date = STR_TO_DATE( ?, '%d/%m/%Y %H:%i:%s'),Tag = '?'WHERE Todo_Id = ?;`;

const updateUser = async (req, res) => {
  const { user, email } = req.body;
  const { userId } = req.params;
  if (user === '' || user === null) {
    res.status(400);
    res.json('Add a user');
  } else {
    await connection.query(updateUserQuery, [user, email, userId]);
    getUsers(req, res);
  }
};

const updateTaskList = async (req, res) => {
  const { todoListName, reminder } = req.body;
  const { todoListId, userId } = req.params;
  if (todoListName === '' || todoListName === null) {
    res.status(400);
    res.json('Please add task list name!');
  } else {
    await connection.query(updateTaskListQuery, [todoListName, reminder, todoListId]);
    getTaskLists(req, res);
  }
};

const updateTask = async (req, res) => {
  const { todo, dueDate, tag } = req.body;
  const { todoId, todoListId } = req.params;
  if (todo === '' || todo === null) {
    res.status(400);
    res.json(' add task name!');
  } else {
    await connection.query(updateTaskQuery, [todo, dueDate, tag, todoId]);
    getTasks(req, res);
  }
};

module.exports = { updateUser, updateTaskList, updateTask };
