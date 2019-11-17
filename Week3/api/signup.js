const logger = require("../logger");
const dbManager = require("../db");
const user = require("../user");
const { successResponse, failureResponse } = require("../response");
const { responseObject } = require("../config");

const signup = (req, res) => {
  responseObject.operation = "signup";
  logger.log(`POST: /signup, body: ${JSON.stringify(req.body)}`);
  const { username } = req.body;
  if (username) {
    dbManager
      .query("INSERT INTO User SET username = ?", username)
      .then(queryResult => {
        responseObject.message = "Successfully signed up.";
        user.username = username;
        user.id = queryResult["insertId"];
        logger.log(`${responseObject.message}: ${JSON.stringify(user)}`);
        res.send({
          ...successResponse(responseObject),
          userId: user.id
        });
      })
      .catch(err => {
        responseObject.message = `Query Error occurred. ${err.message}`;
        logger.log(responseObject.message, false);
        res.statusCode = 500;
        res.send(failureResponse(responseObject));
      });
  } else {
    responseObject.message = "username not provided.";
    logger.log(responseObject.message, false);
    res.statusCode = 403;
    res.send(failureResponse(responseObject));
  }
};

module.exports = signup;
