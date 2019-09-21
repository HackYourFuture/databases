const express = require('express');
const session = require('express-session');
var cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3000;
const app = express();

const index = require('./routes/index');
const user = require('./routes/user');
const list = require('./routes/list');
const item = require('./routes/item');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'max', saveUninitialized: false, resave: false }));

app.use('/', index);
app.use('/todo', user);
app.use('/list', list);
app.use('/item', item);

app.listen(PORT, () => console.log(`Server is activated on port ${PORT}.`));
