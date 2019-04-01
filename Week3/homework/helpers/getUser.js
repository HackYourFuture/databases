'use strict';

const connection = require('../dbconfig');

function getAll(response) {
  const query = `SELECT * FROM user`;
  connection
    .execQuery(query)
    .then(result => {
      response.status(200);
      response.json(result);
    })
    .catch(() => {
      response.status(500);
      response.json('Something went wrong as getting users!');
    });
}

function getById(request, response) {
  if (request.params.user_id === null || request.params.user_id === '') {
    response.status(400);
    response.json('Invalid user id');
  } else {
    const query = `SELECT * FROM user where user_id=?`;
    connection
      .execQuery(query, request.params.user_id)
      .then(result => {
        response.status(200);
        response.json(result);
      })
      .catch(() => {
        response.status(500);
        response.json('Something went wrong as getting the user!');
      });
  }
}

module.exports = {
  getAll,
  getById,
};
