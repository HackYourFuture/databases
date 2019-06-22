'use-strict';

const express = require('express');
const routes = require('./routes');
const app = express();
const port = 3010;

app.use(express.json());
app.use('/todo/app', routes);

app.listen(port, () =>
  console.log(`Todo app started! - Listening to port ${port} at localhost ...`),
);
