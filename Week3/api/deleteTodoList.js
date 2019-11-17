const logger = require("../logger");
const dbManager = require("../db");
const user = require("../user");
const { successResponse, failureResponse } = require("../response");
const { responseObject } = require("../config");

const deleteTodoList = (req, res) => {
  responseObject.operation = "deleteTodoList";
  logger.log(
    `DELETE: /list/${req.params.id}, body: ${JSON.stringify(req.body)}`
  );
  const { user: userCredentials } = req.body;
  const todoListId = parseInt(req.params.id, 10);
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
  } else if (Number.isNaN(todoListId)) {
    responseObject.message = "id must be an integer.";
    logger.log(responseObject.message, false);
    res.statusCode = 403;
    res.send(failureResponse(responseObject));
  } else {
    dbManager
      .query("DELETE FROM TodoList WHERE id = ?", todoListId)
      .then(() => {
        responseObject.message = "Successfully deleted the list.";
        logger.log(`${responseObject.message}: ${JSON.stringify(user)}`);
        res.send(successResponse(responseObject));
      })
      .catch(err => {
        responseObject.message = `Query Error occurred. ${err.message}`;
        logger.log(responseObject.message, false);
        res.statusCode = 500;
        res.send(failureResponse(responseObject));
      });
  }
};

module.exports = deleteTodoList;
