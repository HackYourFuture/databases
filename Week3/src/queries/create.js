'use-strict';

const connection = require('./connection');
const uuid = require('uuid');
const { getUsers, getTaskLists, getTasks } = require('./get');

const createUserQuery = `INSERT INTO users VALUES(?, ?, ?)`;
const createTaskQuery = `INSERT INTO todos VALUES(?,?,?,?,STR_TO_DATE( ?, '%d/%m/%Y %H:%i:%s'),?)`;
const createTaskListQuery = `INSERT INTO todolists VALUES(?,?,?,STR_TO_DATE( ?, '%d/%m/%Y %H:%i:%s'))`;

const createNewUser = async (req, res) => {
  const { user, email } = req.body;
  if (user === '' || user === null) {
    res.status(400);
    res.json('Add a user name!');
  } else {
    await connection.query(createUserQuery, [uuid(), user, email]);
    getUsers(req, res);
  }
};

const createTask = async (req, res) => {
  const { todo, done, dueDate, tag } = req.body;
  const { todoListId } = req.params;
  if (todo === '' || todo === null) {
    res.status(400);
    res.json('Add  a to do !');
  } else {
    await connection.query(createTaskQuery, [todoListId, uuid(), todo, done, dueDate, tag]);
    getTasks(req, res);
  }
};

const createTaskList = async (req, res) => {
  const { todoListName, reminder } = req.body;
  const { userId } = req.params;
  if (todoListName === '' || todoListName === null) {
    res.status(400);
    res.json(' add a todo list name!');
  } else {
    await connection.query(createTaskListQuery, [userId, uuid(), todoListName, reminder]);
    getTaskLists(req, res);
  }
};

module.exports = { createNewUser, createTask, createTaskList };
