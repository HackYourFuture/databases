'use strict';

const connection = require('../dbconfig');
const nanoid = require('nanoid');

function createTask(request, response) {
  if ((request.params.todo_id = null || request.params.todo_id)) {
    response.status(400);
    response.json('No specified todo!');
  } else {
    const query = `
      INSERT INTO task(
        task_id,
        task,
        at_created,
        tag_id,
        todo_id
      ) VALUES(?, ?, ?, ?, ?,)`;
    const newTask = [
      nanoid(),
      request.params.task,
      Date.now(),
      request.params.tag_id,
      request.params.todo_id,
    ];
    connection
      .execQuery(query, newTask)
      .then(() => {
        response.status(200);
        response.json(`The task ${request.params.task} has been created!`);
      })
      .catch(() => {
        response.status(500);
        response.json('Something went wrong as creating the task!');
      });
  }
}

module.exports = createTask;
