'use strict';

const connection = require('../dbconfig');

function updateTodo(request, response) {
  if (request.params.todo_id === null || request.params.todo_id === '') {
    response.status(400);
    response.json('Invalid todo id');
  } else {
    const query = `
      UPDATE todo
      SET ?
      WHERE todo_id=${request.params.todo_id}
    `;
    const todo = [
      request.params.todo_id,
      request.params.at_created,
      request.params.due_date,
      request.params.done,
      request.params.user_id,
    ];
    connection
      .execQuery(query, todo)
      .then(() => {
        response.status(200);
        response.json(`The todo has been updated!`);
      })
      .catch(() => {
        response.status(500);
        response.json('Something went wrong as updating the todo!');
      });
  }
}

module.exports = updateTodo;
