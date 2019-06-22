'use-strict';

const connection = require('./connection');
const { removeUser, removeList, removeTodo } = require('./que');
const { allUsers, todos, allLists } = require('./get');

const user = async (req, res) => {
  await connection.query(removeUser, req.params.userId);
  allUsers(req, res);
};

const todoList = async (req, res) => {
  await connection.query(removeList, req.params.todoListId);
  allLists(req, res);
};

const todo = async (req, res) => {
  await connection.query(removeTodo, req.params.todoId);
  todos(req, res);
};

module.exports = { user, todoList, todo };
