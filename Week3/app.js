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
  createReminderEndPoint,
  deleteReminderEndPoint,
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
  // TODO: GET All List
  app.post("./list", createTodoListEndPoint);
  app.delete("./list/:id", deleteTodoListEndPoint);
  // TODO: GET All Reminders
  app.post("./list/remind", createReminderEndPoint);
  app.delete("./list/remind/:id", deleteReminderEndPoint);
}

function createTodoItemEndPoints() {
  // TODO: GET All Items
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
