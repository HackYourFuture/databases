'use strict';

function addRemainder(connection, errorHandler, req, res) {
  const username = req.params.username;
  const password = req.params.password;
  const listDescription = req.params.listDescription;
  const remainder = req.params.remainder;
  const queryString1 = 'SELECT user_id FROM users WHERE user_name = ? AND user_password = ?;';
  connection.query(queryString1, [username, password], (err, rows) => {
    errorHandler(err, res);
    const queryString2 = 'UPDATE lists SET remainder = ? WHERE user_id = ? AND description = ?';
    connection.query(queryString2, [remainder, rows[0].user_id, listDescription], err => {
      errorHandler(err, res);
    });
  });
  res.end();
}

module.exports = addRemainder;
