const logger = require("../logger");
const dbManager = require("../db");
const user = require("../user");
const { successResponse, failureResponse } = require("../response");
const { responseObject } = require("../config");

const getTodoItems = (req, res) => {
  responseObject.operation = "getTodoItems";
  const userCredentials = {};
  userCredentials.id = req.headers.userId;
  userCredentials.username = req.headers.username;
  const todoListId = parseInt(req.params.id, 10);
  logger.log(`GET: /list/:id, headers: ${JSON.stringify(userCredentials)}`);
  if (!userCredentials) {
    responseObject.message =
      "user credentials not provided with the headers: userId, username.";
    logger.log(responseObject.message, false);
    res.statusCode = 403;
    res.send(failureResponse(responseObject));
  } else if (
    userCredentials.id !== user.id ||
    userCredentials.username !== user.username
  ) {
    responseObject.message =
      "user credentials do not match with the logged in user.";
    logger.log(responseObject.message, false);
    res.statusCode = 401;
    res.send(failureResponse(responseObject));
  } else if (Number.isNaN(todoListId)) {
    responseObject.message = "todo List Id parameter must be integer.";
    logger.log(responseObject.message, false);
    res.statusCode = 403;
    res.send(failureResponse(responseObject));
  } else {
    dbManager
      .query(
        "SELECT" +
          " TodoItem.id as todoItemId," +
          " TodoItem.description as todoItemDescription," +
          " isCompleted," +
          " Tag.id as tagId," +
          " Tag.name as tagName," +
          " Tag.description as tagDescription," +
          " Tag.color as tagColor," +
          " FROM TodoItem" +
          " INNER JOIN TodoItemTags" +
          " ON TodoItem.id = TodoItemTags.todoItemID" +
          " INNER JOIN Tag" +
          " ON TodoItemTags.tagID = Tag.id" +
          " WHERE TodoItem.todoListID = ?",
        todoListId
      )
      .then(queryResult => {
        responseObject.message = "Successfully fetched the todo lists.";
        logger.log(`${responseObject.message}: ${JSON.stringify(user)}`);
        res.send({
          ...successResponse(responseObject),
          data: queryResult
        });
      })
      .catch(err => {
        responseObject.message = `Query Error occurred. ${err.message}`;
        logger.log(responseObject.message, false);
        res.statusCode = 500;
        res.send(failureResponse(responseObject));
      });
  }
};

module.exports = getTodoItems;
