const { execQuery } = require('../database/connection');

// 4. Accept the region and language from the user.
// Are there any countries in this region with the given language as the official language ?
const QUERY = `
  SELECT co.name , l.is_official
    FROM countries AS co
  JOIN cities AS ci
    ON co.code = ci.country_code 
  JOIN languages as l
    ON ci.country_code = l.country_code
  WHERE co.region = ? 
    AND l.language = ?
  GROUP BY co.name 
    HAVING l.is_official = 'T'
`;

const isOfficial = async (request, response) => {
  try {
    if (!request.query.hasOwnProperty('region') || !request.query.hasOwnProperty('language'))
      throw new Error('Invalid query string!');

    const region = request.query.region;
    const language = request.query.language;
    const _result = await execQuery(QUERY, [region, language]);
    const result = _result.map(item => Object.values(item));

    if (result.length === 0) return response.json(false);

    response.json({ [language]: Object.values(result.map(item => item[0])) });
    response.end();
  } catch (error) {
    response.status(500).json({ error: error.message });
    response.end();
  }
};

module.exports = isOfficial;
