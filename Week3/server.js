const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const usersRoutes = require('./Routes/users');
const listRoutes = require('./Routes/list');
const listItemRoutes= require('./Routes/listItem');
const { handleError } = require('./helpers/error')
const app = express();
app.use(bodyParser.json());
const PORT = 3000;

app.use('/users', usersRoutes);
app.use('/list', listRoutes);
app.use('/listItem', listItemRoutes);
app.use((err, req, res, next) => {
  handleError(err, res);
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

module.exports = { usersRoutes, listRoutes };
