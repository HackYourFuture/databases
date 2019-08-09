'use strict';

const isInputValid = require('./isInputValid');
const execQuery = require('./mysqlFunc');
const convertResults = require('./convertResults');
const { handleError } = require('./error');

const execMultiArgQuery = async (query, request, response) => {
  try {
    const { ...args } = isInputValid(request);
    const values = [];
    for (let key in { ...args }) {
      const value = { ...args }[key];
      values.push(value);
    }
    const results = await execQuery(query, values);
    return convertResults(results, request, response);
  } catch (error) {
    handleError(error, response);
  }
};

module.exports = execMultiArgQuery;
