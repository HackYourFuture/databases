'use strict';

function addRemainder(connection, errorHandler, req, res) {
  const username = req.params.username;
  const password = req.params.password;
  const listId = req.params.listId;
  const remainder = req.params.remainder;
  const retrieveUserIdQuery =
    'SELECT user_id FROM users WHERE user_name = ? AND user_password = ?;';
  connection.query(retrieveUserIdQuery, [username, password], (err, rows) => {
    errorHandler(err, res);
    const addRemainderQuery = 'UPDATE lists SET remainder = ? WHERE user_id = ? AND list_id = ?';
    connection.query(addRemainderQuery, [remainder, rows[0].user_id, listId], err => {
      errorHandler(err, res);
    });
  });
  res.end();
}

module.exports = addRemainder;
