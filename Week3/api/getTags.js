const logger = require("../logger");
const dbManager = require("../db");
const user = require("../user");
const { successResponse, failureResponse } = require("../response");
const { responseObject } = require("../config");

const getTags = (req, res) => {
  responseObject.operation = "getTags";
  const userCredentials = {};
  userCredentials.id = req.headers.userId;
  userCredentials.username = req.headers.username;
  logger.log(`GET: /tag, headers: ${JSON.stringify(userCredentials)}`);
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
      .query("SELECT id, name, description, color FROM Tag ")
      .then(queryResult => {
        responseObject.message = "Successfully fetched the tags.";
        logger.log(`${responseObject.message}: ${JSON.stringify(user)}`);
        res.send({
          ...successResponse(responseObject),
          data: queryResult
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

module.exports = getTags;
