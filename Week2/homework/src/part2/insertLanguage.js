const { execQuery } = require('../database/connection');

module.exports.insertLanguage = async (country_code, language) => {
  const insertQuery = `INSERT INTO languages SET ?`;
  const selectQuery = `
    SELECT COUNT(language) AS number, language 
    FROM languages 
    WHERE country_code = "${country_code}"
  `;

  const languageObject = {
    country_code,
    language,
    is_official: 'F',
    percentage: 0
  };

  await execQuery(insertQuery, languageObject);

  const [result] = await execQuery(selectQuery);
  return `Now ${country_code} has ${result.number} languages`;
};
