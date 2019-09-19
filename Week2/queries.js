const sqlCapital = `SELECT c.Name AS capital
                       FROM city c
                       JOIN country ct 
                       ON c.ID = ct.Capital
                       WHERE ct.Name = ?`;

const sqlLanguage = `SELECT distinct cl.Language 
                       FROM countrylanguage cl 
                       JOIN country c  
                       ON cl.CountryCode = c.Code
                       WHERE c.Region = ?`;

const sqlCities = `SELECT c.Name 
                      FROM city c
                      JOIN countrylanguage cl
                      ON c.CountryCode = cl.CountryCode
                      WHERE cl.Language = ?`;

const sqlCountries = `SELECT c.name
                      FROM country c
                      JOIN countrylanguage cl 
                      ON c.code = cl.countryCode
                      WHERE cl.IsOfficial = 'T'
                      AND c.region = ?
                      AND cl.Language = ?`;

const sqlContinentsAndLanguages = `SELECT c.Continent, count(cl.Language) AS Languages
                                   FROM countrylanguage cl 
                                   JOIN country c  
                                   ON cl.CountryCode = c.Code
                                   group by Continent;`;

module.exports = {
  sqlCapital,
  sqlLanguage,
  sqlCities,
  sqlCountries,
  sqlContinentsAndLanguages,
};
