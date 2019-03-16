const fetch = require('node-fetch');
const mysql = require('mysql');
const { config, configWithDb } = require('./connection.js');
const URL_COUNTRIES = 'https://restcountries.eu/rest/v2/all';
const URL_CITIES =
  'https://public.opendatasoft.com/api/records/1.0/search/?dataset=worldcitiespop&rows=3000&sort=population';

const connection = mysql.createConnection(configWithDb);

async function fetchData(url) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

function convertCountryDataToArray(dataJson) {
  const countries = [];

  dataJson.forEach(country => {
    countries.push([
      country.alpha2Code,
      country.name,
      country.region,
      country.capital,
      country.population,
      country.area,
    ]);
  });

  return countries;
}

function convertCityDataToArray(dataJson) {
  const cities = [];
  dataJson.records.forEach(data => {
    const city = data.fields;
    cities.push([city.city, city.country, city.population]);
  });

  return cities;
}

async function insertData(data, tableName, columns = []) {
  if (columns.length > 0) {
    tableName += `(${columns.join(',')})`;
  }

  const insertSql = `INSERT INTO ${tableName} VALUES ?`;
  return new Promise((resolve, reject) => {
    connection.query(insertSql, [data], (error, result) => {
      if (error) {
        reject(error);
      }
      console.log(`${result.affectedRows} rows added to ${tableName} table`);
      resolve();
    });
  });
}

async function main() {
  try {
    connection.connect();

    const countryData = await fetchData(URL_COUNTRIES);
    const countries = convertCountryDataToArray(countryData);
    await insertData(countries, 'countries');

    const cityData = await fetchData(URL_CITIES);
    const cities = convertCityDataToArray(cityData);
    await insertData(cities, 'cities', ['city_name', 'country_code', 'population']);
    connection.end();
  } catch (error) {
    console.log(error);
  }
}

module.exports = main;
