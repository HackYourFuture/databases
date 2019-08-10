require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', require('./src/routes/'));

// Error handler middleware
app.use((err, req, res, next) => {
  // Set locals, only providing error in development mode
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Error
  res.status(err.status || 500);
  res.json({ error: { message: err.message, code: err.code } });
});

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
