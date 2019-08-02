const { execQuery } = require('../database/connection');

// 5. List all the continents with the number of languages spoken in each continent
const QUERY = `
  SELECT c.continent, COUNT(l.language) AS totalLanguages 
    FROM countries AS c
  JOIN languages AS l
    ON c.code = l.country_code 
  GROUP BY continent;
`;

const totalLanguages = async (request, response) => {
  try {
    const result = await execQuery(QUERY);

    response.json(result);
    response.end();
  } catch (error) {
    response.status(500).json({ error: error.message });
    response.end();
  }
};

module.exports = totalLanguages;
