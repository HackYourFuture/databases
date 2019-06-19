'use-strict';

const connection = require('./databaseConfig');

const getAllUsers = (req, res, next) => {
  connection.query('SELECT * FROM users', (error, results, fields) => {
    if (error) {
      res.sendStatus(500);
    } else {
      res.status(200);
      res.send(JSON.parse(JSON.stringify(results)));
    }
  });
};

module.exports = getAllUsers;
