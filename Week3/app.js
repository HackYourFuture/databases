const express = require("express");
const bodyParser = require("body-parser");
const logger = require("./logger");
const dbManager = require("./db");

const app = express();
app.use(bodyParser.json());

async function main() {}

main();
