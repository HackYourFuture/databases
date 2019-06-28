const express = require('express');
const bodyParser = require('body-parser');
const todoApplication = require('./application');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/', todoApplication);

app.listen(port, () => {
  console.log(` Listening to port number ${port}`);
});
