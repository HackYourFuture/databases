'use-strict';

const database = require('./databaseClasses').database;
const country = require('./databaseClasses').country;
const city = require('./databaseClasses').city;
const queries = require('./query').queries;
const questions = require('./query').questions;
const result = require('./query').result;
const pool = require('./connectDatabase').pool;

class Start {
  async action() {
    try {
      await database.createDatabase('world');
      await country.createCountriesTable();
      await country.insertCountries();
      await city.createCitiesTable();
      await city.insertCities();
      const promises = queries.map((query, index) => result.answer(query, questions[index]));
      await Promise.all(promises);
      pool.end();
    } catch (e) {
      console.log(e.stack);
    }
  }
}

const start = new Start();
start.action();
