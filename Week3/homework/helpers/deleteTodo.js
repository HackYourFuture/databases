'use strict';

const connection = require('../dbconfig');

function deleteTodo(request, response) {
  if (request.params.todo_id === null || request.params.todo_id === '') {
    response.status(400);
    response.json('Invalid todo id!');
  } else {
    const query = `
      DELETE FROM todo
      WHERE todo_id=?`;
    connection
      .execQuery(query, request.params.todo_id)
      .then(() => {
        response.status(200);
        response.json(`The todo has been deleted!`);
      })
      .catch(() => {
        response.status(500);
        response.json('Something went wrong as deleting the todo!');
      });
  }
}

module.exports = deleteTodo;
