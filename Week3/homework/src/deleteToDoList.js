'use strict';

function deleteToDoList(connection, errorHandler, req, res) {
  const username = req.params.username;
  const password = req.params.password;
  const listDescription = req.params.listDescription;
  const queryString1 = 'SELECT user_id FROM users WHERE user_name = ? AND user_password = ?;';
  connection.query(queryString1, [username, password], (err, rows) => {
    errorHandler(err, res);
    const queryString2 = 'DELETE FROM lists WHERE user_id = ? AND description = ?;';
    connection.query(queryString2, [rows[0].user_id, listDescription], err => {
      errorHandler(err, res);
    });
  });
  res.end();
}

module.exports = deleteToDoList;
