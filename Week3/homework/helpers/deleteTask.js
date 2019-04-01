'use strict';

const connection = require('../dbconfig');

function deleteTask(request, response) {
  if (request.params.task_id === null || request.params.task_id === '') {
    response.status(400);
    response.json('Invalid task id!');
  } else {
    const query = `
      DELETE FROM task
      WHERE task_id=?`;
    connection
      .execQuery(query, request.params.task_id)
      .then(() => {
        response.status(200);
        response.json(`The task ${request.params.name} has been deleted!`);
      })
      .catch(() => {
        response.status(500);
        response.json('Something went wrong as deleting the task!');
      });
  }
}

module.exports = deleteTask;
