'use-strict';

const connection = require('../databaseConfig');

const updateUser = (req, res) => {
  if (req.body.user === '' || req.body.user === null) {
    res.status(400);
    res.json('Please define a user name!');
  } else {
    connection.query(`
    UPDATE users 
    SET Name = '${req.body.user}',
    Email = '${req.body.email}'
    WHERE User_Id = '${req.params.userId}';
    `);
    connection.query(`SELECT * FROM users`, (error, results, fields) => {
      if (error) {
        res.send(error);
      } else {
        res.status(200);
        res.json(results);
      }
    });
  }
};

module.exports = updateUser;
