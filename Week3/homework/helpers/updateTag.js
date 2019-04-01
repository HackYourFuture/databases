'use strict';

const connection = require('../dbconfig');

function updateTag(request, response) {
  if (request.params.tag_id === null || request.params.tag_id === '') {
    response.status(400);
    response.json('Invalid tag id');
  } else {
    const query = `
      UPDATE tag
      SET ?
      WHERE tag_id=${request.params.tag_id}
    `;
    const tag = [request.params.tag_id, request.params.name, request.params.task_id];
    connection
      .execQuery(query, tag)
      .then(() => {
        response.status(200);
        response.json(`${request.params.name} has been updated!`);
      })
      .catch(() => {
        response.status(500);
        response.json('Something went wrong as updating the tag!');
      });
  }
}

module.exports = updateTag;
