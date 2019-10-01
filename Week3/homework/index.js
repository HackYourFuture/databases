const Express = require('express');
const session = require('express-session');
let cookieParser = require('cookie-parser');
const app = Express();
const router = require('./router');

const PORT = process.env.PORT || 3000;

app
  .use(Express.json())
  .use(cookieParser())
  .use(session({ secret: 'super secret', saveUninitialized: false, resave: false }))
  .use('/', router)

  .listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
