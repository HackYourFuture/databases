'use strict';
// const createDatabase = require('./create-database');
// const createTables = require('./create-tables');
const createQueries = require('./queries');

function render() {
  // await createDatabase();
  // await createTables();
  createQueries();
}

render();
