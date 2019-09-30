const handelError = (err, msg) => {
  if (err) return console.log(err);
  console.log(msg);
};

const errorNotFoundHandler = (req, res, next) => {
  const error = new Error('Not found!');
  res.status(404);
  next(error);
};

const InternalServerErrorHandler = (error, req, res, next) => {
  res.status(error.status || 500).send(error.message);
};

function asyncMiddleware(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (ex) {
      next(ex);
    }
  };
}

module.exports = { InternalServerErrorHandler, errorNotFoundHandler, handelError, asyncMiddleware };
