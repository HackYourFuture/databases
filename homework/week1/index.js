const createDbAndTables = require('./createDbTables');
const fetchAndInsertData = require('./fetchAndInsertData');
const selectQueries = require('./selectQueries');

async function main() {
  createDbAndTables();
  await fetchAndInsertData();
  selectQueries();
}

main();
