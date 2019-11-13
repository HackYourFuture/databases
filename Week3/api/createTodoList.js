const logger = require("../logger");
const dbManager = require("../db");
const user = require("../user");
const { successResponse, failureResponse } = require("../response");
const { responseObject } = require("../config");

const createTodoList = (req, res) => {
  responseObject.operation = "createTodoList";
  logger.log(`POST: /list, body: ${JSON.stringify(req.body)}`);
  const { user: userCredentials, todoList } = req.body;
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
  } else if (!todoList) {
    responseObject.message = "todoList property not provided.";
    logger.log(responseObject.message, false);
    res.statusCode = 403;
    res.send(failureResponse(responseObject));
  } else if (!todoList.name) {
    responseObject.message = "todoList has to have a name";
    logger.log(responseObject.message, false);
    res.statusCode = 403;
    res.send(failureResponse(responseObject));
  } else {
    dbManager
      .query(
        "INSERT INTO TodoList SET name = ?, description = ?, userID = ?",
        todoList.name,
        todoList.description,
        user.id
      )
      .then(queryResult => {
        responseObject.message = "Successfully created the list.";
        logger.log(`${responseObject.message}: ${JSON.stringify(user)}`);
        res.send({
          ...successResponse(responseObject),
          listId: queryResult["insertId"]
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

module.exports = createTodoList;
