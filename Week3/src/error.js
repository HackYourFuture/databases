'use strict';

class ErrorWithStatus extends Error {
  constructor(errorMessage, statusCode) {
    super(errorMessage);
    this.name = 'ErrorWithStatus';
    this.statusCode = statusCode;
  }
}

function handleError(error, response) {
  if (error.code === 'ECONNREFUSED') {
    return response.status(500).json('Connection to mySQL server is failed. Is server active?');
  }
  return response.status(error.statusCode || 500).json(error.message);
}

module.exports = { ErrorWithStatus, handleError };
