const db = require('./sql');
function sqlMiddleware(req, res, next) {
  req['db'] = db;
  next();
}

module.exports = sqlMiddleware;
