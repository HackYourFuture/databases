const logger = require("../logger");
const dbManager = require("../db");
const user = require("../user");
const { successResponse, failureResponse } = require("../response");
const { responseObject } = require("../config");

const getReminders = (req, res) => {
  responseObject.operation = "getReminders";
  const userCredentials = {};
  userCredentials.id = req.headers.userId;
  userCredentials.username = req.headers.username;
  logger.log(`GET: /list/remind, headers: ${JSON.stringify(userCredentials)}`);
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
  } else {
    dbManager
      .query(
        "SELECT" +
          " userID" +
          " TodoList.id as TodoListId" +
          " TodoList.name as TodoListName," +
          " TodoList.description as TodoListDescription," +
          " Reminder.id as ReminderId," +
          " Reminder.description as ReminderDescription" +
          " Reminder.remindingTime as RemindingTime" +
          " FROM TodoList INNER JOIN Reminder" +
          " ON TodoList.id = Reminder.todoListID" +
          " WHERE userID = ?",
        user.id
      )
      .then(queryResult => {
        responseObject.message =
          "Successfully fetched the todo lists with reminders.";
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

module.exports = getReminders;
