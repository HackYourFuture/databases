const { execQuery } = require('./connection');

const { USE, CREATE_TABLE_COUNTRY, CREATE_TABLE_CITY, CREATE_TABLE_LANGUAGE } = require('./database-queries');

module.exports.createTables = async dbName => {
  await execQuery(USE(dbName));
  console.log(dbName + ' selected');

  await execQuery(CREATE_TABLE_COUNTRY);
  console.log('Created country table');

  await execQuery(CREATE_TABLE_CITY);
  console.log('Created city table');

  await execQuery(CREATE_TABLE_LANGUAGE);
  console.log('Created language table');
};
