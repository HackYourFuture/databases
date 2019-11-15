const logger = require("../logger");
const dbManager = require("../db");
const user = require("../user");
const { successResponse, failureResponse } = require("../response");
const { responseObject } = require("../config");

const attachTagToTodoItem = (req, res) => {
  responseObject.operation = "attachTagToTodoItem";
  logger.log(
    `POST: /list/item/${req.params.todoItemId}/tag/${
      req.params.tagId
    }, body: ${JSON.stringify(req.body)}`
  );
  let { user: userCredentials } = req.body;
  const todoItemId = parseInt(req.params.todoItemId, 10);
  const tagId = parseInt(req.params.tagId, 10);
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
    responseObject.message = "todo Item Id mut be integer.";
    logger.log(responseObject.message, false);
    res.statusCode = 403;
    res.send(failureResponse(responseObject));
  } else if (Number.isNaN(tagId)) {
    responseObject.message = "tagId must be integer.";
    logger.log(responseObject.message, false);
    res.statusCode = 403;
    res.send(failureResponse(responseObject));
  } else {
    dbManager
      .query(
        "INSERT INTO TodoItemTags SET todoItemID = ?, tagID = ?",
        todoItemId,
        tagId
      )
      .then(() => {
        responseObject.message = "Successfully added tag to the todo item.";
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

module.exports = attachTagToTodoItem;
