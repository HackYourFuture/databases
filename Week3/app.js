const express = require("express");
const bodyParser = require("body-parser");
const logger = require("./logger");
const dbManager = require("./db");
const { port } = require("./config");
const {
  loginEndPoint,
  signupEndPoint,
  createTodoListEndPoint,
  deleteTodoListEndPoint,
  createTodoItemEndPoint,
  deleteTodoItemEndPoint,
  markTodoItemAsCompletedEndPoint,
  markTodoItemAsNotCompletedEndPoint
} = require("./api");

const app = express();
app.use(bodyParser.json());

function createUserEndPoints() {
  app.post("/login", loginEndPoint);
  app.post("/signup", signupEndPoint);
}

function createTodoListEndPoints() {
  app.post("./list", createTodoListEndPoint);
  app.delete("./list/:id", deleteTodoListEndPoint);
}

function createTodoItemEndPoints() {
  app.post("./list/item", createTodoItemEndPoint);
  app.delete("./list/item/:id", deleteTodoItemEndPoint);
}

function createTodoItemCompletionEndPoints() {
  app.post("./list/item/:id/complete", markTodoItemAsCompletedEndPoint);
  app.delete("./list/item/:id/complete", markTodoItemAsNotCompletedEndPoint);
}

async function main() {
  try {
    // Connect to the mysql server
    logger.log(await dbManager.connect());

    createUserEndPoints();
    createTodoListEndPoints();
    createTodoItemEndPoints();
    createTodoItemCompletionEndPoints();

    app.listen(port, () => {
      logger.log(`Server is listening on port ${port}`);
    });
  } catch (err) {
    logger.log(err.message, true);
  }
}

main();
