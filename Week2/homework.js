const prompt = require('prompt');
const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world'
});

const execQuery = util.promisify(connection.query.bind(connection))
const input = util.promisify(prompt.get.bind(this))

async function queryDatabase() {

  prompt.start();
  try {

    //1. Query
    //Shows the capital of the given country
    const inputCountry = await input(['country_name']);
    const selectQuery1 =
      'SELECT country.name AS country_name, city.name AS capital_name FROM city JOIN country ON city.id = country.capital WHERE country.name = ? ';

    const result1 = await execQuery(selectQuery1, inputCountry.country_name);
    console.log(result1);

    //2. Query
    //Lists all the languages spoken in the given region
    const inputRegion = await input(['region_name']);
    const selectQuery2 =
      'SELECT DISTINCT language FROM countrylanguage JOIN country ON countrylanguage.countrycode = country.code WHERE country.region = ?';
    const result2 = await execQuery(selectQuery2, inputRegion.region_name);
    console.log(result2);

    //3. Query
    //Finds the number of cities where the given language is spoken

    const inputLanguage = await input(['language_name']);
    console.log(inputLanguage.language_name);
    const selectQuery3 =
      'SELECT count(city.id) AS numbers_of_cities FROM city JOIN country ON city.countrycode = country.code JOIN countrylanguage ON country.code = countrylanguage.countrycode WHERE countrylanguage.language=?';

    const result3 = await execQuery(selectQuery3, inputLanguage.language_name);
    console.log(result3);

    //4. Query
    //Find if the given language is spoken officially in the given region 
    const inputRegionAndLanguage = await input(['region_name', 'language_name']);

    const selectQuery4 =
      'SELECT name FROM country JOIN countrylanguage ON country.code = countrylanguage.countrycode where isofficial="T" AND country.region =? AND countrylanguage.language=?';
    const result4 = await execQuery(selectQuery4, [inputRegionAndLanguage.region_name, inputRegionAndLanguage.language_name]);

    if (result4.length === 0) {
      console.log("FALSE");
    } else {
      console.log(result4);
    }

    // 5. Query
    // Lists all the continents with the number of languages spoken in each continent
    const selectQuery5 =
      'SELECT continent, count(DISTINCT language) AS number_of_languages FROM country JOIN countrylanguage ON country.code=countrylanguage.countrycode GROUP BY continent order by number_of_languages desc';
    const result5 = await execQuery(selectQuery5);
    console.log(result5);
  } catch (error) {
    console.error(error);
  }

  connection.end();
}

queryDatabase();