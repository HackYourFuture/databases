const logger = require("../logger");
const dbManager = require("../db");
const user = require("../user");
const { successResponse, failureResponse } = require("../response");
const { responseObject } = require("../config");

const deleteReminder = (req, res) => {
  responseObject.operation = "deleteReminder";
  logger.log(
    `DELETE: /list/remind/${req.params.id}, body: ${JSON.stringify(req.body)}`
  );
  const { user: userCredentials } = req.body;
  const reminderId = parseInt(req.params.id, 10);
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
  } else if (Number.isNaN(reminderId)) {
    responseObject.message = "id must be an integer.";
    logger.log(responseObject.message, false);
    res.statusCode = 403;
    res.send(failureResponse(responseObject));
  } else {
    dbManager
      .query("DELETE FROM Reminder WHERE id = ?", reminderId)
      .then(() => {
        responseObject.message = "Successfully deleted the reminder.";
        logger.log(`${responseObject.message}: ${JSON.stringify(user)}`);
        res.send(successResponse(responseObject));
      })
      .catch(err => {
        responseObject.message = `Query Error occurred. ${err.message}`;
        logger.log(responseObject.message, false);
        res.statusCode = 501;
        res.send(failureResponse(responseObject));
      });
  }
};

module.exports = deleteReminder;
