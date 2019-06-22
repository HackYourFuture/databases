'use-strict';

const connection = require('./connection');
const nanoid = require('nanoid');
const validate = require('validate.js');
const { isEmpty, isString } = require('validate.js');
const { user, list, toDo } = require('./que');
const { allUsers, todoLists, todos } = require('./get');
const { errorHandler, userError, listError, todoError } = require('./errorHandler');
const constraints = {
  from: {
    email: true,
  },
};

const newUser = async (req, res) => {
  const body = req.body;
  isEmpty(body) ||
  isEmpty(body.user) ||
  !isString(body.user) ||
  validate({ from: body.email }, constraints)
    ? errorHandler(req, res, userError)
    : (await connection.query(user, [nanoid(), body.user, body.email])) && allUsers(req, res);
};

const newList = async (req, res) => {
  const body = req.body;
  const { todoListName, reminder } = body;
  !isString(todoListName) || isEmpty(todoListName) || isEmpty(body)
    ? errorHandler(req, res, listError)
    : (await connection.query(list, [req.params.userId, nanoid(), todoListName, reminder])) &&
      todoLists(req, res);
};

const newTodo = async (req, res) => {
  const body = req.body;
  const { todo, done, dueDate, tag } = body;
  isEmpty(todo) || !isString(todo) || isEmpty(body)
    ? errorHandler(req, res, todoError)
    : (await connection.query(toDo, [req.params.todoListId, nanoid(), todo, done, dueDate, tag])) &&
      todos(req, res);
};

module.exports = { newUser, newList, newTodo };
