'use strict';

const connection = require('../dbconfig');
const nanoid = require('nanoid');

function createTodo(request, response) {
  if (request.params.user_id === null || request.params.user_id === '') {
    response.status(400);
    response.json('No specified user!');
  } else {
    const query = `
      INSERT INTO todo(
        todo_id,
        at_created,
        due_date,
        done,
        user_id
      )
      VALUES(?,?,?,?,?)`;
    const newTodo = [nanoid(), Date.now(), request.params.due_date, false, request.params.user_id];
    connection
      .execQuery(query, newTodo)
      .then(() => {
        response.status(200);
        response.json(`New todo has been created!`);
      })
      .catch(() => {
        response.status(500);
        response.json('Something went wrong as creating the todo!');
      });
  }
}

module.exports = createTodo;
