const util = require('util');
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDB() {
  function capitalOf(country) {
    return `SELECT country.name AS Country, city.name AS Capital FROM city, country WHERE ID = capital AND country.name = ${country};`;
  }
  function languagesIN(region) {
    return `SELECT country.Name, Language FROM countrylanguage, country WHERE Code = countryCode AND Region = ${region};`;
  }

  function sumCitiesThatSpeaks(language) {
    return `SELECT COUNT(*) AS numberOfCities FROM city, countryLanguage WHERE city.countryCode = countryLanguage.countryCode AND countryLanguage.language = ${language};`;
  }

  function officialLanguage(lang, reg) {
    return `SELECT country.Code, country.Name, country.Region, isOfficial from country, countrylanguage where country.Code = countrylanguage.CountryCode AND countrylanguage.language = ${lang} AND Region = ${reg} ORDER BY Region;`;
  } // Doesn't return the false.

  function continent() {
    return `SELECT country.continent, COUNT(Language) FROM country, countryLanguage WHERE code = countryCode group by continent ORDER BY country.continent;`;
  }

  connection.connect();

  try {
    const query1 = await execQuery(capitalOf("'Venezuela'"));
    // console.log(query1);
    const query2 = await execQuery(languagesIN("'South America'"));
    // console.log(query2);
    const query3 = await execQuery(sumCitiesThatSpeaks("'Dutch'"));
    // console.log(query3);
    const query4 = await execQuery(officialLanguage("'Spanish'", "'South America'"));
    // console.log(query4);
    const query5 = await execQuery(continent());
    // console.log(query5);
  } catch (error) {
    console.log(error);
  }

  connection.end();
}

seedDB();
