const express = require("express");
const bodyParser = require("body-parser");
const logger = require("./logger");
const dbManager = require("./db");
const { port } = require("./config");
const {
  loginEndPoint,
  signupEndPoint,
  createTodoListEndPoint,
  deleteTodoListEndPoint
} = require("./api");

const app = express();
app.use(bodyParser.json());

function createUserEndPoints() {
  app.post("/login", loginEndPoint);
  app.post("/signup", signupEndPoint);
}

function createTodoListEndPoints() {
  app.post("./list", createTodoListEndPoint);
  app.delete("./list", deleteTodoListEndPoint);
}

async function main() {
  try {
    // Connect to the mysql server
    logger.log(await dbManager.connect());

    createUserEndPoints();
    createTodoListEndPoints();

    app.listen(port, () => {
      logger.log(`Server is listening on port ${port}`);
    });
  } catch (err) {
    logger.log(err.message, true);
  }
}

main();
