const { execQuery } = require('../database/connection');
const url = require('url');

// 1. What is the capital of country X ?
const QUERY = `
    SELECT cities.name as 'cityName'
      FROM countries
    JOIN cities 
      ON cities.id = countries.capital 
    WHERE countries.name = ?`;

const getCapitalOfCountry = async (request, response) => {
  try {
    if (!request.query.hasOwnProperty('country')) throw new Error('Invalid query string!');

    const countryName = request.query.country;
    const [result] = await execQuery(QUERY, countryName);

    if (result.length === 0) {
      const error = new Error(`Country ${countryName} does not exist!`);
      response.status(404).json({ error: error.message });
      return response.end();
    }

    response.json(Object.values(result));
    response.end();
  } catch (error) {
    response.status(500).json({ error: error.message });
    response.end();
  }
};

module.exports = getCapitalOfCountry;
