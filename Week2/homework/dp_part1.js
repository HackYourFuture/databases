const mysql = require('mysql');
const util = require('util');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDB() {
  function countryCapital(x) {
    const result = `SELECT country.name AS city, city.name AS capital FROM city, country WHERE id = capital AND country.name = ${x} `;
    return result;
  }

  function languagesIn(region) {
    return `SELECT country.Name, Language FROM countrylanguage, country WHERE Code = countryCode AND Region = ${region};`;
  }

  function citiesWithLang(z) {
    const result = ` SELECT COUNT(*) FROM city JOIN countrylanguage ON city.countrycode = countrylanguage.countrycode WHERE language = ${z} `;

    return result;
  }
  function officialLanguage(lang, reg) {
    return `SELECT country.Code, country.Name, country.Region, isOfficial from country, countrylanguage where country.Code = countrylanguage.CountryCode AND countrylanguage.language = ${lang} AND Region = ${reg} ORDER BY Region;`;
  }

  function continentsLangSpoken() {
    const result = `SELECT COUNT(language) AS languages_spoken, continent FROM country JOIN countrylanguage ON code = countrycode GROUP BY continent ORDER BY COUNT(language) DESC; `;
    return result;
  }

  connection.connect();

  try {
    let query1 = await execQuery(countryCapital("'China'"));
    console.log(query1);
    let query2 = await execQuery(languagesIn("'Western Europe'"));
    console.log(query2);
    let query3 = await execQuery(citiesWithLang("'Dutch'"));
    console.log(query3);
    const query4 = await execQuery(officialLanguage("'Spanish'", "'South America'"));
    console.log(query4);
    const query5 = await execQuery(continentsLangSpoken());
    console.log(query5);
  } catch (error) {
    console.error(error);
  }
}

seedDB();
connection.end();
