'use strict';

function deleteToDoItem(connection, errorHandler, req, res) {
  const username = req.params.username;
  const password = req.params.password;
  const listDescription = req.params.listDescription;
  const toDoId = req.params.toDoId;
  const retrieveUserIdQuery = 'SELECT user_id FROM users WHERE user_name = ? AND user_password = ?';
  connection.query(retrieveUserIdQuery, [username, password], (err, rows1) => {
    errorHandler(err, res);
    const retrieveListIdQuery = 'SELECT list_id FROM lists WHERE user_id = ? AND description = ?;';
    connection.query(retrieveListIdQuery, [rows1[0].user_id, listDescription], (err, rows2) => {
      errorHandler(err, res);
      const deleteToDoItemQuery = 'DELETE FROM items WHERE list_id = ? AND description = ?';
      connection.query(deleteToDoItemQuery, [rows2[0].list_id, toDoId], err => {
        errorHandler(err, res);
      });
    });
  });
  res.end();
}

module.exports = deleteToDoItem;
