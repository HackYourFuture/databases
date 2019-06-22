'use-strict';

const connection = require('./connection');
const get = require('./que');

const allUsers = (req, res) =>
  connection.query(get.allUsers, (error, results) => {
    error ? res.sendStatus(500) : res.status(200) && res.json(results);
  });

const todoLists = (req, res) =>
  connection.query(get.todoList, req.params.userId, (error, results) => {
    error ? res.send(error) : res.status(200) && res.json(results);
  });

const allLists = (req, res) =>
  connection.query(get.renderAfterList, req.params.userId, (error, results) => {
    error ? res.send(error) : res.status(200) && res.json(results);
  });

const todos = (req, res) =>
  connection.query(get.todos, req.params.todoListId, (error, results) => {
    error ? res.send(error) : res.status(200) && res.json(results);
  });

module.exports = { allUsers, todoLists, todos, allLists };
