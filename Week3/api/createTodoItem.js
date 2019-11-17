const logger = require("../logger");
const dbManager = require("../db");
const user = require("../user");
const { successResponse, failureResponse } = require("../response");
const { responseObject } = require("../config");

const createTodoItem = (req, res) => {
  responseObject.operation = "createTodoItem";
  logger.log(`POST: /list/item, body: ${JSON.stringify(req.body)}`);
  const { user: userCredentials, todoListId, todoItem } = req.body;
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
  } else if (!todoItem.description) {
    responseObject.message = "todoItem has to have a description.";
    logger.log(responseObject.message, false);
    res.statusCode = 403;
    res.send(failureResponse(responseObject));
  } else {
    dbManager
      .query(
        "INSERT INTO TodoItem SET description = ?, todoListID = ?",
        todoItem.description,
        todoListId
      )
      .then(queryResult => {
        responseObject.message = "Successfully added item to the list.";
        logger.log(`${responseObject.message}: ${JSON.stringify(user)}`);
        res.send({
          ...successResponse(responseObject),
          itemId: queryResult["insertId"]
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

module.exports = createTodoItem;
