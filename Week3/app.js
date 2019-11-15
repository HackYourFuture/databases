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
  markTodoItemAsNotCompletedEndPoint,
  attachTagToTodoItemEndPoint,
  removeTagFromTodoItemEndPoint,
  createTagEndPoint
} = require("./api");

const app = express();
app.use(bodyParser.json());

function createUserEndPoints() {
  app.post("/login", loginEndPoint);
  app.post("/signup", signupEndPoint);
}

function createTodoListEndPoints() {
  // TODO: GET All List
  app.post("/list", createTodoListEndPoint);
  app.delete("/list/:id", deleteTodoListEndPoint);
  // TODO: GET All Reminders
  app.post("/list/remind", createReminderEndPoint);
  app.delete("/list/remind/:id", deleteReminderEndPoint);
}

function createTodoItemAndTagEndPoints() {
  // TODO: GET All Items
  app.post("/list/item", createTodoItemEndPoint);
  app.delete("/list/item/:id", deleteTodoItemEndPoint);
  app.post("/list/item/tag", createTagEndPoint);
  app.post("/list/item/:todoItemId/tag/:tagId", attachTagToTodoItemEndPoint);
  app.delete(
    "/list/item/:todoItemId/tag/:tagId",
    removeTagFromTodoItemEndPoint
  );
}

function createTodoItemCompletionEndPoints() {
  app.post("/list/item/:id/complete", markTodoItemAsCompletedEndPoint);
  app.delete("/list/item/:id/complete", markTodoItemAsNotCompletedEndPoint);
}

async function main() {
  try {
    // Connect to the mysql server
    logger.log(await dbManager.connect());

    createUserEndPoints();
    createTodoListEndPoints();
    createTodoItemAndTagEndPoints();
    createTodoItemCompletionEndPoints();

    app.listen(port, () => {
      logger.log(`Server is listening on port ${port}`);
    });
  } catch (err) {
    logger.log(err.message, true);
  }
}

main();
