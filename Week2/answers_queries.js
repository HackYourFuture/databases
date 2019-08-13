/* -- mysql> source C:/Administrator/......../databases/week2/world.sql;
 */

const mysql = require('mysql');
const util = require('util');
const prompt = require('prompt');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
});

const execQuery = util.promisify(connection.query.bind(connection));
const input = util.promisify(prompt.get.bind(this));

function questions() {
  console.log(`
  select one the following questions with the question number:
  
  1. What is the capital of country X ? (Accept X from user)
2. List all the languages spoken in the region Y (Accept Y from user)
3. Find the number of cities in which language Z is spoken (Accept Z from user)
4. Accept the region and language from the user.
   Are there any countries in this region with the given language
   as the official language ?
   If yes, display those countries.
   If no, display FALSE.
5. List all the continents with the number of languages spoken in each continent
  `);
}

const query1 =
  'SELECT city.Name FROM city JOIN country ON city.ID = country.Capital WHERE country.Name = ?';
const query2 =
  'SELECT DISTINCT Language FROM  countrylanguage JOIN country ON CountryCode = Code WHERE Region = ?';
const query3 =
  'SELECT COUNT(ID) AS "CityNumberSum" FROM  countrylanguage JOIN city ON countrylanguage.CountryCode = city.CountryCode WHERE Language = ?';
const query4 =
  'SELECT country.Name FROM  countrylanguage JOIN country ON CountryCode = Code WHERE Language = ? AND Region = ? AND IsOfficial = "T"';
const query5 =
  'SELECT Continent, COUNT(DISTINCT Language) AS "SpokenLanguages" FROM  countrylanguage JOIN country ON CountryCode = Code GROUP BY Continent';

async function answersToTheQueries() {
  questions();
  prompt.start();
  try {
    connection.connect();

    const questionNumber = await input('number');
    const number = questionNumber.number;

    switch (number) {
      case '1':
        const countryInput = await input('country');
        const country = countryInput.country;
        const capital = await execQuery(query1, country);
        console.log(capital);
        break;

      case '2':
        const regionInput = await input('region');
        const region = regionInput.region;
        const languages = await execQuery(query2, region);
        console.log(languages);
        break;

      case '3':
        const languageInput = await input('language');
        const language = languageInput.language;
        const numberOfCities = await execQuery(query3, language);
        console.log(numberOfCities);
        break;

      case '4':
        const regionInput2 = await input('region');
        const region2 = regionInput2.region;
        const languageInput2 = await input('language');
        const language2 = languageInput2.language;
        const countries = await execQuery(query4, [region2, language2]);
        if (countries.length !== 0) {
          console.log(countries);
        } else {
          console.log(false);
        }
        break;

      case '5':
        const continents = await execQuery(query5);
        console.log(continents);
        break;

      default:
        console.log('Something goes wrong!!!!');
        break;
    }

    connection.end();
  } catch (err) {
    console.error(err.message);
    connection.end();
  }
}

answersToTheQueries();
