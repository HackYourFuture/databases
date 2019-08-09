'use strict';

const execQuery = require('./mysqlFunc');
const convertResults = require('./convertResults');
const { handleError } = require('./error');

const execOneParamQuery = async (query, request, response) => {
  try {
    const results = await execQuery(query, request.params.arg);
    return convertResults(results, request, response);
  } catch (error) {
    handleError(error, response);
  }
};

module.exports = execOneParamQuery;
