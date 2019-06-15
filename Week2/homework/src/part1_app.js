const prompt = require('prompt');
const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
});

const execQuery = util.promisify(connection.query.bind(connection));
const input = util.promisify(prompt.get.bind(this));

async function acquireResults(query, argument) {
  try {
    connection.connect();
    const QueryResults = await execQuery(query, argument);
    console.log(JSON.parse(JSON.stringify(QueryResults)));
    connection.end();
  } catch (error) {
    console.log(error);
  }
}
async function showResults(argument, query) {
  const option = await input([argument]);
  const results = option[argument];
  acquireResults(query, results);
}
async function showResultOption4(argument1, argument2, query) {
  try {
    const region = await input([argument1]);
    const inputRegion = region[argument1];
    const language = await input([argument2]);
    const inputLanguage = language[argument2];
    console.log(region);
    console.log(language);
    const results = [inputRegion, inputLanguage];
    acquireResults(query, results);
  } catch (error) {
    console.log(error);
  }
}
async function queryDatabase() {
  let input_number = '';
  prompt.start();
  try {
    console.log(`
    Options:
    1........What is the capital of country X ? (Accept X from user)
    2........List all the languages spoken in the region Y (Accept Y from user)
    3........Find the number of cities in which language Z is spoken (Accept Z from user)
    4........Accept the region and language from the user. Are there any countries in this region with the given language as the official language ? If yes, display those countries. If no, display FALSE. E.g. (A) input region : 'Western Europe' and input language : 'Dutch' output should be Belgium and Netherlands (B) input region : 'Western Europe' and input language : 'Hindi' output should be 'FALSE'
    5........List all the continents with the number of languages spoken in each continent
    Make your choice =>>
  `);
    const options = await input(['option']);
    input_number = options.option;
    switch (input_number) {
      case '1':
        showResults(
          'country',
          `SELECT city.name
        FROM city, country
        WHERE city.id=country.capital
        AND country.name = ?`,
        );
        break;
      case '2':
        showResults(
          'region',
          `SELECT distinct language
                   FROM country c, countrylanguage l
                   WHERE c.code=l.countrycode
                   AND  c.region=?;
                   `,
        );
        break;

      case '3':
        showResults(
          'language',
          `SELECT count(c.name) language_spoken_city_count
           FROM countrylanguage cl
           JOIN city c
           ON c.countrycode=cl.countrycode
           AND cl.language=?`,
        );
        break;
      case '4':
        showResultOption4('region', 'language', `CALL spQuery4(?,?);`);
        break;
      case '5':
        acquireResults(`SELECT continent, COUNT(language) AS Languages
        FROM (SELECT e1.Continent AS Continent, e2.Language AS Language
          FROM country AS e1
            LEFT JOIN (SELECT *
            FROM countrylanguage
            WHERE isOfficial = 'T') AS e2 ON (e1.Code = e2.CountryCode)) AS l
        GROUP BY continent;`);

      default:
    }
  } catch (error) {
    console.log(error);
  }
}
queryDatabase();
