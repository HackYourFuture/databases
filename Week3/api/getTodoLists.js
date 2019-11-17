const logger = require("../logger");
const dbManager = require("../db");
const user = require("../user");
const { successResponse, failureResponse } = require("../response");
const { responseObject } = require("../config");

const getTodoLists = (req, res) => {
  responseObject.operation = "getTodoLists";
  const userCredentials = {};
  userCredentials.id = req.headers.userId;
  userCredentials.username = req.headers.username;
  logger.log(`GET: /list, headers: ${JSON.stringify(userCredentials)}`);
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
        "SELECT id as TodoListId, name, description WHERE userID = ?",
        user.id
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

module.exports = getTodoLists;
