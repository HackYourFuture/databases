'use strict';

function deleteUser(connection, errorHandler, req, res) {
  const username = req.params.username;
  const password = req.params.password;
  const queryString = 'DELETE FROM users WHERE user_id = ? AND user_password = ?;';
  connection.query(queryString, [username, password], err => {
    errorHandler(err, res);
  });
  res.end();
}

module.exports = deleteUser;
