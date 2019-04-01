'use strict';

const connection = require('../dbconfig');

function getAll(response) {
  const query = `SELECT * FROM todo`;
  connection
    .execQuery(query)
    .then(result => {
      response.status(200);
      response.json(result);
    })
    .catch(() => {
      response.status(400);
      response.json('Something went wrong as getting todos!');
    });
}

function getById(request, response) {
  if (request.params.todo_id === null || request.params.todo_id === '') {
    response.status(400);
    response.json('Invalid todo id');
  } else {
    const query = `SELECT * FROM todo where todo_id=?`;
    connection
      .execQuery(query, request.params.todo_id)
      .then(result => {
        response.status(200);
        response.json(result);
      })
      .catch(() => {
        response.status(500);
        response.json('Something went wrong as getting the todo!');
      });
  }
}

module.exports = {
  getAll,
  getById,
};
