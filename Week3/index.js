const express = require('express');
const expressSession = require('express-session');
const router = require('./router');
let cookieParser = require('cookie-parser');
const app = express();

const PORT = process.env.PORT || 3000;

app
  .use(express.json())
  .use(cookieParser())
  .use(expressSession({ secret: 'secret', saveUninitialized: false, resave: false }))
  .use('/', router)

  .listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));