const { connection, myQuery } = require('./db');

const { USE_DB, CREATE_TABLE_CITIES, CREATE_TABLE_COUNTRIES } = require('./queries');

const dbName = 'world';

module.exports.createTables = async () => {
  try {
    // connection.connect();

    await myQuery(USE_DB(dbName));
    console.log(`Database '${dbName}' selected.`);

    await myQuery(CREATE_TABLE_COUNTRIES);
    console.log("'country' tables created succesfully.");

    await myQuery(CREATE_TABLE_CITIES);
    console.log("'city' tables created succesfully.");

    connection.end();
  } catch (error) {
    console.trace(error);
    connection.end();
  }
};
