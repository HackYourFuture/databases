'use strict';

const { deleteCountriesTable, logDCT, query, log } = require('./queryAndLog');
const { deleteCitiesTable, logDCityT, help } = require('./queryAndLog');
const {
  createDatabaseAndTables,
  deleteData,
  insertCitiesData,
  insertCountriesData,
  renderResults,
} = require('./action');
const command = process.argv[2];

const app = async () => {
  try {
    command === 'create'
      ? await createDatabaseAndTables()
      : command === 'passCountriesData'
      ? await insertCountriesData()
      : command === 'passCitiesData'
      ? await insertCitiesData()
      : command === 'deleteCountriesTable'
      ? await deleteData(deleteCountriesTable, logDCT)
      : command === 'deleteCitiesTable'
      ? await deleteData(deleteCitiesTable, logDCityT)
      : command > 0 && command < 11
      ? await renderResults(query[Number(command) - 1], log[Number(command) - 1])
      : console.log(help);
  } catch (error) {
    throw error;
  }
};

app();
