'use strict';

function createUser(connection, errorHandler, req, res) {
  const username = req.params.username;
  const password = req.params.password;
  const createUserQuery = 'INSERT INTO users (user_name, user_password) VALUES (?, ?);';
  connection.query(createUserQuery, [username, password], err => {
    errorHandler(err, res);
  });
  res.end();
}

module.exports = createUser;
