'use strict';

const express = require('express');
const routes = require('./routes');

const app = new express();

const PORT = 8080;

app.use(express.json());

app.use('/', routes);

app.listen(PORT, error => {
  if (error) return console.error(error);

  console.log(`Listening on http://localhost:${PORT}`);
});
