const loginEndPoint = require("./login");
const signupEndPoint = require("./login");
const createTodoListEndPoint = require("./createTodoList");
const deleteTodoListEndPoint = require("./deleteTodoList");
const createTodoItemEndPoint = require("./createTodoItem");
const deleteTodoItemEndPoint = require("./deleteTodoItem");
const markItem = require("./markItem");

module.exports = {
  loginEndPoint,
  signupEndPoint,
  createTodoListEndPoint,
  deleteTodoListEndPoint,
  createTodoItemEndPoint,
  deleteTodoItemEndPoint,
  markTodoItemAsCompletedEndPoint: markItem.bind(null, true),
  markTodoItemAsNotCompletedEndPoint: markItem.bind(null, false)
};
