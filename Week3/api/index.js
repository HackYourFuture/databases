const loginEndPoint = require("./login");
const signupEndPoint = require("./login");
const createTodoListEndPoint = require("./createTodoList");
const deleteTodoListEndPoint = require("./deleteTodoList");
const createTodoItemEndPoint = require("./createTodoItem");
const deleteTodoItemEndPoint = require("./deleteTodoItem");

module.exports = {
  loginEndPoint,
  signupEndPoint,
  createTodoListEndPoint,
  deleteTodoListEndPoint,
  createTodoItemEndPoint,
  deleteTodoItemEndPoint
};
