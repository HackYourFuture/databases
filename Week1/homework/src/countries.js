'use-strict';
const mysql = require('mysql');
const fetch = require('node-fetch');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});

const passCountriesData = async () => {
  connection.connect();
  try {
    const response = await fetch('https://restcountries.eu/rest/v2/all');
    const testedResponse = await (function testError() {
      if (response.ok) {
        return response;
      }
      throw new Error('Network response was not ok!');
    })();
    const data = await testedResponse.json();
    data.forEach(async (country, index) => {
      await connection.query(
        'INSERT INTO countries SET no=?, name=?, capital=?, region=?, subregion=?, population=?, area=?',
        [
          index + 1,
          country.name,
          country.capital,
          country.region,
          country.subregion,
          country.population,
          country.area,
        ]
      );
    });
    console.log(`Country informations are added to the "countries" table successfully!`);
  } catch (error) {
    console.error(error);
  }
  connection.end();
};

passCountriesData();
