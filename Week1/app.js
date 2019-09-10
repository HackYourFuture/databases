const util = require('util');
const mysql = require('mysql');
const country = require('./countryData');
const city = require('./cityData');
const dbUtils = require('./dbUtils');
const createWorldDatabases = `CREATE DATABASE IF NOT EXISTS world;`;
const useWorld = `USE world;`;
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
});

const execQuery = util.promisify(connection.query.bind(connection));

(async () => {
  connection.connect(dbUtils.handelError('mysql connected...'));

  try {
    await execQuery(createWorldDatabases);
    console.log('world databases created');
    await execQuery(useWorld);
    console.log('world used!');
    await execQuery(country.CREATE_COUNTRY_TABLE);
    console.log('country created!');
    await execQuery(country.INSERT_COUNTRY_QUERIES);
    console.log('country inserted!');
    await execQuery(city.CREATE_CITY_TABLE);
    console.log('city created!');
    await execQuery(city.INSERT_CITY_QUERIES);
    console.log('city inserted!');
    dbUtils.SELECT_QUERIES.map(async query => {
      const data = await execQuery(query);
      console.log(data);
    });
  } catch (error) {
    console.error(error);
  }
  connection.end(dbUtils.handelError('Connection ended!'));
})();
