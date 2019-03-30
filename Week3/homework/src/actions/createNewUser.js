'use-strict';

const connection = require('../databaseConfig');
const nanoid = require('nanoid');

const createNewUser = async (req, res) => {
  if (req.body.user === '' || req.body.user === null) {
    res.status(400);
    res.json('Please define a username!');
  } else {
    await connection.query(
      `INSERT INTO users VALUES('${nanoid()}', '${req.body.user}', '${req.body.email}')`
    );
    await connection.query(`SELECT * FROM users`, (error, results, fields) => {
      if (error) {
        res.send(error);
      } else {
        res.status(200);
        res.json(results);
      }
    });
  }
};

module.exports = createNewUser;
