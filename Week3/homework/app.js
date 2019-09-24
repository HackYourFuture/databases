const express = require('express');
const session = require('express-session');
var cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3000;
const app = express();

const index = require('./routes/index');
const user = require('./routes/user');
const list = require('./routes/list');
const item = require('./routes/item');

app
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(cookieParser())
  .use(session({ secret: 'salih@class22', saveUninitialized: false, resave: false }))

  .use('/', index)
  .use('/user', user)
  .use('/list', list)
  .use('/item', item)

  .listen(PORT, () => console.log(`Server is activated on port ${PORT}.`));
