'use strict';

const connection = require('../dbconfig');

function updateUser(request, response) {
  if (request.params.user_id === null || request.params.user_id === '') {
    response.status(400);
    response.json('Invalid user id');
  } else {
    const query = `
      UPDATE user
      SET ?
      WHERE user_id=${request.params.user_id}
    `;
    const user = [
      request.params.user_id,
      request.params.name,
      request.params.mail,
      request.params.password,
      request.params.bd_date,
      request.params.city,
      request.params.country,
      request.params.gender,
    ];
    connection
      .execQuery(query, user)
      .then(() => {
        response.status(200);
        response.json(`${request.params.name} has been updated!`);
      })
      .catch(() => {
        response.status(500);
        response.json('Something went wrong as updating the user!');
      });
  }
}

module.exports = updateUser;
