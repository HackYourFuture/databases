'use strict';

const connection = require('../dbconfig');

function deleteTag(request, response) {
  if (request.params.tag_id === null || request.params.tag_id === '') {
    response.status(400);
    response.json('Invalid tag id!');
  } else {
    const query = `
      DELETE FROM tag
      WHERE tag_id=?`;
    connection
      .execQuery(query, request.params.tag_id)
      .then(() => {
        response.status(200);
        response.json(`The tag ${request.params.name} has been deleted!`);
      })
      .catch(() => {
        response.status(500);
        response.json('Something went wrong as deleting the tag!');
      });
  }
}

module.exports = deleteTag;
