const { execQuery } = require('../database/connection');

// 3. Find the number of cities in which language Z is spoken
const QUERY = `
  SELECT COUNT(c.name) AS numberOfCities
    FROM cities AS c
  JOIN languages AS l
    ON c.country_code = l.country_code
  WHERE l.language = ?
`;

const totalCities = async (request, response) => {
  try {
    const language = request.query.language;
    const result = await execQuery(QUERY, language);

    response.json(result);
    response.end();
  } catch (error) {
    response.status(500).json({ error: error.message });
    response.end();
  }
};

module.exports = totalCities;
