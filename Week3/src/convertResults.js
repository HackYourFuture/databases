'use strict';

const convertResults = (results, request, response) => {
  const message = {
    'Server message': `Query OK. Created ID: ${results.insertId}, Affected Rows: ${
      results.affectedRows
    }`,
  };
  if (!results[0] && results.affectedRows === undefined) {
    return response.status(404).json([`No Data`]);
  }
  if (request.method === 'GET') return response.json(results);
  if (request.method === 'POST') return response.status(201).json(message);
  return response.json(message);
};

module.exports = convertResults;
