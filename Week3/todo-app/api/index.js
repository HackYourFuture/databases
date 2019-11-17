const loginEndPoint = require("./login");
const signupEndPoint = require("./signup");
const createTodoListEndPoint = require("./createTodoList");
const deleteTodoListEndPoint = require("./deleteTodoList");
const createTodoItemEndPoint = require("./createTodoItem");
const deleteTodoItemEndPoint = require("./deleteTodoItem");
const markItem = require("./markItem");
const createReminderEndPoint = require("./createReminder");
const deleteReminderEndPoint = require("./deleteReminder");
const attachTagToTodoItemEndPoint = require("./attachTagToTodoItem");
const removeTagFromTodoItemEndPoint = require("./removeTagFromTodoItem");
const createTagEndPoint = require("./createTag");
const getTodoListsEndPoint = require("./getTodoLists");
const getRemindersEndPoint = require("./getReminders");
const getTodoItemsEndPoint = require("./getTodoItems");
const getTagsEndPoint = require("./getTags");

module.exports = {
  loginEndPoint,
  signupEndPoint,
  getTodoListsEndPoint,
  createTodoListEndPoint,
  deleteTodoListEndPoint,
  getRemindersEndPoint,
  createReminderEndPoint,
  deleteReminderEndPoint,
  getTodoItemsEndPoint,
  createTodoItemEndPoint,
  deleteTodoItemEndPoint,
  markTodoItemAsCompletedEndPoint: markItem.bind(null, true),
  markTodoItemAsNotCompletedEndPoint: markItem.bind(null, false),
  attachTagToTodoItemEndPoint,
  removeTagFromTodoItemEndPoint,
  getTagsEndPoint,
  createTagEndPoint
};
