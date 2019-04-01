'use strict';

const connection = require('../dbconfig');
const nanoid = require('nanoid');

function createUser(request, response) {
  if (request.params.name === '' || request.params.name === null) {
    response.status(400);
    response.json('Invalid user!');
  } else {
    const query = `INSERT INTO user(
      user_id,
      name,
      mail,
      password,
      bd_date,
      city,
      country,
      gender
    )
    VALUES( ?, ?, ?, ?, ?, ?, ?, ?)`;

    const id = nanoid();

    const newUser = [
      id,
      request.params.name,
      request.params.mail,
      request.params.password,
      request.params.bd_date,
      request.params.city,
      request.params.country,
      request.params.gender,
    ];

    connection
      .execQuery(query, newUser)
      .then(() => {
        response.status(200);
        response.json(`The user ${request.params.name} has been created!`);
      })
      .catch(err => {
        response.status(500);
        response.json('Something went wrong as creating the user!');
        response.json(err);
      });
  }
  response.end();
}

module.exports = createUser;
