const express = require("express");
const bodyParser = require("body-parser");
const logger = require("./logger");
const dbManager = require("./db");
const { port } = require("./config");
const {
  loginEndPoint,
  signupEndPoint,
  getTodoListsEndPoint,
  createTodoListEndPoint,
  deleteTodoListEndPoint,
  getRemindersEndPoint,
  createReminderEndPoint,
  deleteReminderEndPoint,
  getTodoItemsEndPoint,
  createTodoItemEndPoint,
  deleteTodoItemEndPoint,
  markTodoItemAsCompletedEndPoint,
  markTodoItemAsNotCompletedEndPoint,
  attachTagToTodoItemEndPoint,
  removeTagFromTodoItemEndPoint,
  getTagsEndPoint,
  createTagEndPoint
} = require("./api");

const app = express();
app.use(bodyParser.json());

function createUserEndPoints() {
  app.post("/login", loginEndPoint);
  app.post("/signup", signupEndPoint);
}

function createTodoListEndPoints() {
  app.get("/list", getTodoListsEndPoint);
  app.post("/list", createTodoListEndPoint);
  app.delete("/list/:id", deleteTodoListEndPoint);
  app.get("/list/remind", getRemindersEndPoint);
  app.post("/list/remind", createReminderEndPoint);
  app.delete("/list/remind/:id", deleteReminderEndPoint);
}

function createTodoItemAndTagEndPoints() {
  app.get("/list/:id", getTodoItemsEndPoint);
  app.post("/list/item", createTodoItemEndPoint);
  app.delete("/list/item/:id", deleteTodoItemEndPoint);
  app.get("/tag", getTagsEndPoint);
  app.post("/tag", createTagEndPoint);
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
