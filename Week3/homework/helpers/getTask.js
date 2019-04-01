'use strict';

const connection = require('../dbconfig');

function getAll(response) {
  const query = `SELECT * FROM task`;
  connection
    .execQuery(query)
    .then(result => {
      response.status(200);
      response.json(result);
    })
    .catch(() => {
      response.status(400);
      response.json('Something went wrong as getting tasks!');
    });
}

function getById(request, response) {
  if (request.params.task_id === null || request.params.task_id === '') {
    response.status(400);
    response.json('Invalid task id');
  } else {
    const query = `SELECT * FROM task where task_id=?`;
    connection
      .execQuery(query, request.params.task_id)
      .then(result => {
        response.status(200);
        response.json(result);
      })
      .catch(() => {
        response.status(500);
        response.json('Something went wrong as getting the task!');
      });
  }
}

module.exports = {
  getAll,
  getById,
};
