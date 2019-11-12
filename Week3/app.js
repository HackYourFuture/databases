const express = require("express");
const bodyParser = require("body-parser");
const logger = require("./logger");
const dbManager = require("./db");
const user = require("./user");
const { port } = require("./config");
const { successResponse, failureResponse } = require("./response");

const app = express();
app.use(bodyParser.json());
const responseObject = {
  message: "",
  operation: ""
};

function createUserEndPoints() {
  app.post("/login", (req, res) => {
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
            res.send(failureResponse(responseObject));
          }
        })
        .catch(err => {
          responseObject.message = `Query Error occurred. ${err.message}`;
          logger.log(responseObject.message, false);
          res.statusCode = 501;
          res.send(failureResponse(responseObject));
        });
    } else {
      responseObject.message = "username or id not provided.";
      logger.log(responseObject.message, false);
      res.statusCode = 403;
      res.send(failureResponse(responseObject));
    }
  });

  app.post("/signup", (req, res) => {
    responseObject.operation = "signup";
    logger.log(`POST: /signup, body: ${JSON.stringify(req.body)}`);
    const { username } = req.body;
    if (username) {
      dbManager
        .query("INSERt INTO User SET username = ?", username)
        .then(queryResult => {
          responseObject.message = "Successfully signed up.";
          user.username = username;
          user.id = queryResult["insertId"];
          logger.log(`${responseObject.message}: ${JSON.stringify(user)}`);
          res.send({
            ...successResponse(responseObject),
            id: user.id
          });
        })
        .catch(err => {
          responseObject.message = `Query Error occurred. ${err.message}`;
          logger.log(responseObject.message, false);
          res.statusCode = 501;
          res.send(failureResponse(responseObject));
        });
    } else {
      responseObject.message = "username not provided.";
      logger.log(responseObject.message, false);
      res.statusCode = 403;
      res.send(failureResponse(responseObject));
    }
  });
}

async function main() {
  try {
    // Connect to the mysql server
    logger.log(await dbManager.connect());

    createUserEndPoints();

    app.listen(port, () => {
      logger.log(`Server is listening on port ${port}`);
    });
  } catch (err) {
    logger.log(err.message, true);
  }
}

main();
