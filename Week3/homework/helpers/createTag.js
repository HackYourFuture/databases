'use strict';

const connection = require('../dbconfig');
const nanoid = require('nanoid');

function createTag(request, response) {
  const query = `
    INSERT INTO tag(
      tag_id,
      name,
      task_id)
    VALUES(?, ?, ?)`;
  const newTag = [nanoid(), request.params.name, request.params.task_id];
  connection
    .execQuery(query, newTag)
    .then(() => {
      response.status(200);
      response.json(`The tag ${request.params.name} has been created!`);
    })
    .catch(() => {
      response.status(500);
      response.json('Something went wrong as creating the tag!');
    });
}

module.exports = createTag;
