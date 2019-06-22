'use-strict';

const validate = require('validate.js');
const { isEmpty, isString } = require('validate.js');
const connection = require('./connection');
const { updateTodo, updateList, updateUser, Completed } = require('./que');
const { allUsers, todoLists, todos } = require('./get');
const { errorHandler, userError, listError, todoError } = require('./errorHandler');
const constraints = {
  from: {
    email: true,
  },
};

const user = async (req, res) => {
  const body = req.body;
  isEmpty(body) ||
  isEmpty(body.user) ||
  !isString(body.user) ||
  validate({ from: body.email }, constraints)
    ? errorHandler(req, res, userError)
    : (await connection.query(updateUser, [body.user, body.email, req.params.userId])) &&
      allUsers(req, res);
};

const todoList = async (req, res) => {
  const body = req.body;
  !isString(body.todoListName) || isEmpty(body.todoListName) || isEmpty(body)
    ? errorHandler(req, res, listError)
    : await connection.query(updateList, [body.todoListName, body.reminder, req.params.todoListId]);
  todoLists(req, res);
};

const todo = async (req, res) => {
  const body = req.body;
  isEmpty(body.todo) || !isString(body.todo) || isEmpty(body)
    ? errorHandler(req, res, todoError)
    : await connection.query(updateTodo, [body.todo, body.dueDate, body.tag, req.params.todoId]);
  todos(req, res);
};

const markTodoAsCompleted = async (req, res) => {
  await connection.query(Completed, req.params.todoId);
  todos(req, res);
};

module.exports = { todo, todoList, user, markTodoAsCompleted };
