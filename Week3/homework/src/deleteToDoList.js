'use strict';

function deleteToDoList(connection, errorHandler, req, res) {
  const username = req.params.username;
  const password = req.params.password;
  const listDescription = req.params.listDescription;
  const retrieveUserIdQuery =
    'SELECT user_id FROM users WHERE user_name = ? AND user_password = ?;';
  connection.query(retrieveUserIdQuery, [username, password], (err, rows) => {
    errorHandler(err, res);
    const deleteToDoListQuery = 'DELETE FROM lists WHERE user_id = ? AND description = ?;';
    connection.query(deleteToDoListQuery, [rows[0].user_id, listDescription], err => {
      errorHandler(err, res);
    });
  });
  res.end();
}

module.exports = deleteToDoList;
