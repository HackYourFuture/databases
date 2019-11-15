const logger = require("../logger");
const dbManager = require("../db");
const user = require("../user");
const { successResponse, failureResponse } = require("../response");
const { responseObject } = require("../config");

const markItem = (isCompleted, req, res) => {
  responseObject.operation = isCompleted
    ? "markAsCompleted"
    : "markAsNotCompleted";
  logger.log(
    `${
      isCompleted ? "POST" : "DELETE"
    }: /list/item/:id/complete, body: ${JSON.stringify(req.body)}`
  );
  const { user: userCredentials } = req.body;
  const todoItemId = parseInt(req.params.id, 10);
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
  } else if (Number.isNaN(todoItemId)) {
    responseObject.message = "todo item id must be a number";
    logger.log(responseObject.message, false);
    res.statusCode = 403;
    res.send(failureResponse(responseObject));
  } else {
    dbManager
      .query(
        "UPDATE TodoItem SET isCompleted = ?, WHERE id = ?",
        isCompleted,
        todoItemId
      )
      .then(queryResult => {
        responseObject.message = `Successfully updated todo item as ${
          isCompleted ? "completed" : "not completed"
        }.`;
        logger.log(`${responseObject.message}: ${JSON.stringify(user)}`);
        res.send({ ...successResponse(responseObject), queryResult });
      })
      .catch(err => {
        responseObject.message = `Query Error occurred. ${err.message}`;
        logger.log(responseObject.message, false);
        res.statusCode = 501;
        res.send(failureResponse(responseObject));
      });
  }
};

module.exports = markItem;
