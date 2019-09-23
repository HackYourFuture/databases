'use strict';

const express = require('express');
const logger = require('morgan');
const app = express();
const user = require('./routes/user');
const list = require('./routes/list');
const tag = require('./routes/tag');
const port = process.env.PORT || 3000;

app.use(
  logger(
    '[:date[web]] ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms',
  ),
);

app.use(express.json());
// Routes
app.use('/user', user);
app.use('/list', list);
app.use('/tag', tag);

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
