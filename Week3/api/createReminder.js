const logger = require("../logger");
const dbManager = require("../db");
const user = require("../user");
const { successResponse, failureResponse } = require("../response");
const { responseObject } = require("../config");

const createReminder = (req, res) => {
  responseObject.operation = "createReminder";
  logger.log(`POST: /list/remind, body: ${JSON.stringify(req.body)}`);
  const { user: userCredentials, todoListId, reminder } = req.body;
  if (!userCredentials) {
    responseObject.message = "user credentials not provided.";
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
  } else if (!todoListId) {
    responseObject.message = "todoListId property not provided.";
    logger.log(responseObject.message, false);
    res.statusCode = 403;
    res.send(failureResponse(responseObject));
  } else if (!reminder.description) {
    responseObject.message = "reminder has to have a description.";
    logger.log(responseObject.message, false);
    res.statusCode = 403;
    res.send(failureResponse(responseObject));
  } else if (!reminder.remindingTime) {
    responseObject.message = "reminder has to have a remindingTime.";
    logger.log(responseObject.message, false);
    res.statusCode = 403;
    res.send(failureResponse(responseObject));
  } else if (Number.isNaN(new Date(reminder.remindingTime).getTime())) {
    responseObject.message = "remindingTime has to be a valid time.";
    logger.log(responseObject.message, false);
    res.statusCode = 403;
    res.send(failureResponse(responseObject));
  } else if (
    new Date(reminder.remindingTime).getTime() < new Date().getTime()
  ) {
    responseObject.message = "remindingTime has to be a future time!";
    logger.log(responseObject.message, false);
    res.statusCode = 403;
    res.send(failureResponse(responseObject));
  } else {
    dbManager
      .query(
        "INSERT INTO Reminder SET description = ?, todoListID = ?, remindingTime = ?",
        reminder.description,
        todoListId,
        reminder.remindingTime
      )
      .then(queryResult => {
        responseObject.message = "Successfully added reminder to the list.";
        logger.log(`${responseObject.message}: ${JSON.stringify(user)}`);
        res.send({
          ...successResponse(responseObject),
          reminderId: queryResult["insertId"]
        });
      })
      .catch(err => {
        responseObject.message = `Query Error occurred. ${err.message}`;
        logger.log(responseObject.message, false);
        res.statusCode = 501;
        res.send(failureResponse(responseObject));
      });
  }
};

module.exports = createReminder;
