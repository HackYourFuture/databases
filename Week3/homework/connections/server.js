'use strict';

const express = require('express');
const body_parser = require('body-parser');

const app = express();
app.use(body_parser.json());
const port = process.env.port || 3000;
app.listen(port, err => {
  if (err) console.log(err);
  console.log(`App is listening on port: http://localhost:3000`);
});

module.exports = app;
