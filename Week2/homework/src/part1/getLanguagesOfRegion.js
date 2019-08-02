const { execQuery } = require('../database/connection');

// 2. List all the languages spoken in the region Y
const QUERY = `
  SELECT DISTINCT l.language
    FROM languages as l
  JOIN countries as c
    ON l.country_code = c.code
  WHERE c.region = ?
`;

const getLanguagesOfRegion = async (request, response) => {
  try {
    if (!request.query.hasOwnProperty('region')) throw new Error('Invalid query string!');

    const _result = await execQuery(QUERY, request.query.region);
    const result = _result.map(item => Object.values(item));

    response.json(Object.values(result.map(item => item.toString())));
    response.end();
  } catch (error) {
    response.status(500).json({ error: error.message });
    response.end();
  }
};

module.exports = getLanguagesOfRegion;
