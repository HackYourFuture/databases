'use-strict';

const connection = require('./databaseConfig');

const getTodoLists = (req, res) => {
  connection.query(
    `SELECT * FROM todolists WHERE User_Id = '${req.params.userId}'`,
    (error, results, fields) => {
      if (error) {
        res.send(error);
      } else {
        res.status(200);
        res.json(results);
      }
    },
  );
};

module.exports = getTodoLists;
