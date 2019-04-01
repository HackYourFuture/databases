'use strict';

const connection = require('../dbconfig');

function updateTask(request, response) {
  if (request.params.task_id === null || request.params.task_id === '') {
    response.status(400);
    response.json('Invalid task id');
  } else {
    const query = `
      UPDATE task
      SET ?
      WHERE task_id=${request.params.task_id}
    `;
    const task = [
      request.params.task_id,
      request.params.task,
      request.params.at_created,
      request.params.tag_id,
      request.params.todo_id,
    ];
    connection
      .execQuery(query, task)
      .then(() => {
        response.status(200);
        response.json(`${request.params.task} has been updated!`);
      })
      .catch(() => {
        response.status(500);
        response.json('Something went wrong as updating the task!');
      });
  }
}

module.exports = updateTask;
