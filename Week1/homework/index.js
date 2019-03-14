'use strict';
const createDatabase = require('./create-database');
const createTables = require('./create-tables');
const createQueries = require('./queries');

async function render() {
  await createDatabase();
  await createTables();
  await createQueries();
}

render();
