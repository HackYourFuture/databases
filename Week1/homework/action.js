'use-strict';

const { createDb, useDb, createCountriesTable, createCitiesTable } = require('./queryAndLog');
const { logDb, logUse, logCCT, logCCityT } = require('./queryAndLog');
const { passCitiesData, logPassCityD, passCountriesData, logPassCCD } = require('./queryAndLog');
const connection = require('./connection');
const cities = require('./cities');
const countries = require('./countries');
const mysql = require('mysql');
const mainConnection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
});

const err = error => {
  if (error) throw error.message;
};

const log = logs => console.log(logs);

class Actions {
  static async createDatabaseAndTables() {
    mainConnection.connect();
    await mainConnection.query(createDb, err(), log(logDb));
    await mainConnection.query(useDb, err(), log(logUse));
    await mainConnection.query(createCountriesTable, err(), log(logCCT));
    await mainConnection.query(createCitiesTable, err(), log(logCCityT));

    mainConnection.end();
  }

  static async deleteData(que, logs) {
    connection.connect();
    await connection.query(que, () => {
      err();
      log(logs);
    });
    connection.end();
  }

  static async insertCitiesData() {
    connection.connect();
    cities.forEach(async (city, index) => {
      await connection.query(passCitiesData, [index + 1, city.name, city.population, city.country]);
    });
    log(logPassCityD);
    connection.end();
  }

  static async insertCountriesData() {
    connection.connect();
    countries.forEach(async (country, index) => {
      await connection.query(passCountriesData, [
        index + 1,
        country.name,
        country.region,
        country.population,
        country.area,
      ]);
    });
    log(logPassCCD);
    connection.end();
  }

  static async renderResults(que, logs) {
    connection.connect();
    await connection.query(que, (error, results) => {
      err(error);
      log(logs);
      results.forEach(data => log(JSON.parse(JSON.stringify(data))));
    });
    connection.end();
  }
}
const {
  createDatabaseAndTables,
  deleteData,
  insertCitiesData,
  insertCountriesData,
  renderResults,
} = Actions;

module.exports = {
  createDatabaseAndTables,
  deleteData,
  insertCitiesData,
  insertCountriesData,
  renderResults,
};
