'use strict';

function deleteToDoItem(connection, errorHandler, req, res) {
  const username = req.params.username;
  const password = req.params.password;
  const listDescription = req.params.listDescription;
  const toDoDescription = req.params.toDoDescription;
  const queryString1 = 'SELECT user_id FROM users WHERE user_name = ? AND user_password = ?';
  connection.query(queryString1, [username, password], (err, rows1) => {
    errorHandler(err, res);
    const queryString2 = 'SELECT list_id FROM lists WHERE user_id = ? AND description = ?;';
    connection.query(queryString2, [rows1[0].user_id, listDescription], (err, rows2) => {
      errorHandler(err, res);
      const queryString3 = 'DELETE FROM items WHERE list_id = ? AND description = ?';
      connection.query(queryString3, [rows2[0].list_id, toDoDescription], err => {
        errorHandler(err, res);
      });
    });
  });
  res.end();
}

module.exports = deleteToDoItem;
