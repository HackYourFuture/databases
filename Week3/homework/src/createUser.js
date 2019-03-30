'use strict';

function createUser(connection, errorHandler, req, res) {
  const username = req.params.username;
  const password = req.params.password;
  const queryString = 'INSERT INTO users (user_name, user_password) VALUES (?, ?);';
  connection.query(queryString, [username, password], err => {
    errorHandler(err, res);
  });
  res.end();
}

module.exports = createUser;
