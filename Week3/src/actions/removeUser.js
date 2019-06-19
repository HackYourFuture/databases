'use-strict';

const connection = require('./databaseConfig');
const removeUser = async (req, res) => {
  await connection.query(`DELETE FROM users WHERE User_Id = '${req.params.userId}' LIMIT 1`);
  await connection.query(`SELECT * FROM users`, (error, results, fields) => {
    if (error) {
      res.send(error);
    } else {
      res.status(200);
      res.json(results);
    }
  });
};

module.exports = removeUser;
