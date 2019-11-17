const logger = require("../logger");
const dbManager = require("../db");
const user = require("../user");
const { successResponse, failureResponse } = require("../response");
const { responseObject, isValidColorHex } = require("../config");

const createTag = (req, res) => {
  responseObject.operation = "createTag";
  logger.log(`POST: /tag, body: ${JSON.stringify(req.body)}`);
  const { user: userCredentials, tag } = req.body;
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
  } else if (!tag.name) {
    responseObject.message = "tag must have a name.";
    logger.log(responseObject.message, false);
    res.statusCode = 403;
    res.send(failureResponse(responseObject));
  } else if (tag.color && !isValidColorHex(tag.color)) {
    responseObject.message = "tag's color property is not a valid hex.";
    logger.log(responseObject.message, false);
    res.statusCode = 403;
    res.send(failureResponse(responseObject));
  } else {
    dbManager
      .query(
        "INSERT INTO Tag SET name = ?, description = ?, color = ?",
        tag.name,
        tag.description,
        tag.color ? tag.color : "000000"
      )
      .then(queryResult => {
        responseObject.message = "Successfully created a new tag.";
        logger.log(`${responseObject.message}: ${JSON.stringify(user)}`);
        res.send({
          ...successResponse(responseObject),
          tagId: queryResult["insertId"]
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

module.exports = createTag;
