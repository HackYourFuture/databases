const Express = require('express');
const bodyParser = require('body-parser');
const sqlMiddleware = require('./sqlMiddleware');
const PORT = 3000;

const app = new Express();
app.use(bodyParser.json({}));
app.use(sqlMiddleware);

const userRouter = require('./userRouter');
const listRouter = require('./listRouter');
const itemRouter = require('./itemRouter');

app.use('/user', userRouter);
app.use('/list', listRouter);
app.use('/item', itemRouter);

app.listen(PORT, error => {
  if (error) return console.error(error);

  console.log(`Server started on http://localhost:${PORT}`);
});
