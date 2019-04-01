'use strict';

function deleteUser(connection, errorHandler, req, res) {
  const username = req.params.username;
  const password = req.params.password;
  const deleteUserQuery = 'DELETE FROM users WHERE user_id = ? AND user_password = ?;';
  connection.query(deleteUserQuery, [username, password], err => {
    errorHandler(err, res);
  });
  res.end();
}

module.exports = deleteUser;
