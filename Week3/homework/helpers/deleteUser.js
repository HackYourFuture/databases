'use strict';

const connection = require('../dbconfig');

function deleteUser(request, response) {
  if (request.params.user_id === null || request.params.user_id === '') {
    response.status(400);
    response.json('Invalid user id!');
  } else {
    const query = `
      DELETE FROM user
      WHERE user_id=?`;
    connection
      .execQuery(query, request.params.user_id)
      .then(() => {
        response.status(200);
        response.json(`The user ${request.params.name} has been deleted!`);
      })
      .catch(() => {
        response.status(500);
        response.json('Something went wrong as deleting the user!');
      });
  }
}

module.exports = deleteUser;
