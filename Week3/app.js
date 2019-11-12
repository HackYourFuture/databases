const express = require("express");
const bodyParser = require("body-parser");
const logger = require("./logger");
const dbManager = require("./db");
const user = require("./user");
const { port } = require("./config");

const app = express();
app.use(bodyParser.json());

function createUserEndPoints() {
  app.post("./login", (req, res) => {
    const { username, id } = req.body;
    if (username && id) {
      dbManager
        .query("SELECT id, username FROM User WHERE id = ?", id)
        .then(queryResult => {
          res.send(queryResult);
        })
        .catch(err => {
          res.send(`could not find user with error : ${err.message}`);
        });
    } else {
      res.send("Please provide username and id");
    }
  });
}

async function main() {
  try {
    // Connect to the mysql server
    logger.log(await dbManager.connect());

    createUserEndPoints();

    app.listen(port, () => {
      logger.log(`Server is listenning on port ${port}`);
    });
  } catch (err) {
    logger.log(err.message, true);
  }
}

main();
