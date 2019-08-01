'use strict';

const { execQuery, execOneAndDisplayResult } = require('./mysql');
const { fetch } = require('./readFile');
const handleError = require('./handleError');

async function createAlert() {
  const { queries } = await fetch();
  return execOneAndDisplayResult(queries[5], 'Creating Alert');
}

async function dropAlert() {
  const { queries } = await fetch();
  return execOneAndDisplayResult(queries[6], 'Dropping Alert');
}

async function showAlert() {
  try {
    const results = await execQuery('SHOW TRIGGERS');
    if (!results[0]) return console.log('No alert is set.');
    const { queries } = await fetch();
    await execOneAndDisplayResult(queries[7], 'Inserting 10th language to a country');
  } catch (error) {
    handleError(error);
  }
}

module.exports = { createAlert, dropAlert, showAlert };
