const logger = require("../logger");
const dbManager = require("../db");
const user = require("../user");
const { successResponse, failureResponse } = require("../response");
const { responseObject } = require("../config");

const login = (req, res) => {
  responseObject.operation = "login";
  logger.log(`POST: /login, body: ${JSON.stringify(req.body)}`);
  const { username, id } = req.body;
  if (username && id) {
    dbManager
      .query("SELECT id, username FROM User WHERE id = ?", id)
      .then(queryResult => {
        if (queryResult.length > 0) {
          responseObject.message = "Successfully logged in.";
          user.id = id;
          user.username = username;
          logger.log(`${responseObject.message}: ${queryResult[0]}`);
          res.send(successResponse(responseObject));
        } else {
          responseObject.message = "No user found for provided credentials.";
          logger.log(responseObject.message, false);
          res.statusCode = 404;
          res.send(failureResponse(responseObject));
        }
      })
      .catch(err => {
        responseObject.message = `Query Error occurred. ${err.message}`;
        logger.log(responseObject.message, false);
        res.statusCode = 500;
        res.send(failureResponse(responseObject));
      });
  } else {
    responseObject.message = "username or id not provided.";
    logger.log(responseObject.message, false);
    res.statusCode = 403;
    res.send(failureResponse(responseObject));
  }
};

module.exports = login;
