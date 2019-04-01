'use strict';

const connection = require('../dbconfig');

function getAll(response) {
  const query = `SELECT * FROM tag`;
  connection
    .execQuery(query)
    .then(result => {
      response.status(200);
      response.json(result);
    })
    .catch(() => {
      response.status(400);
      response.json('Something went wrong as getting tag!');
    });
}

function getById(request, response) {
  if (request.params.tag_id === null || request.params.tag_id === '') {
    response.status(400);
    response.json('Invalid tag id');
  } else {
    const query = `SELECT * FROM tag where tag_id=?`;
    connection
      .execQuery(query, request.params.tag_id)
      .then(result => {
        response.status(200);
        response.json(result);
      })
      .catch(() => {
        response.status(500);
        response.json('Something went wrong as getting the tag!');
      });
  }
}

module.exports = {
  getAll,
  getById,
};
