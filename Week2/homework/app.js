var prompt = require('prompt');
var mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysql1',
  database: 'new_world',
});

const execQuery = util.promisify(connection.query.bind(connection));
const input = util.promisify(prompt.get.bind(this));

function allQuestions() {
  console.log(`choose a question by its number
  1.What is the capital of country X ? (Accept X from user)
  2.List all the languages spoken in the region Y (Accept Y from user)
  3.Find the number of cities in which language Z is spoken (Accept Z from user)
  4.Accept the region and language from the user. Are there any countries in this region with the given language as the official language ? If yes, display those countries. If no, display FALSE. E.g. (A) input region : 'Western Europe' and input language : 'Dutch' output should be Belgium and Netherlands (B) input region : 'Western Europe' and input language : 'Hindi' output should be 'FALSE'
  5.List all the continents with the number of languages spoken in each continent
  `);
}

queriesToBeExecuted = [
  'SELECT city.Name FROM city JOIN country ON city.ID = country.Capital WHERE country.Name = ?',
  'SELECT DISTINCT Language FROM  countrylanguage JOIN country ON CountryCode = Code WHERE Region = ?',
  'SELECT COUNT(ID) AS "CitiesCount" FROM  countrylanguage JOIN city ON countrylanguage.CountryCode = city.CountryCode WHERE Language = ?',
  'SELECT country.Name FROM  countrylanguage JOIN country ON CountryCode = Code WHERE Language = ? AND Region = ? AND IsOfficial = "T"',
  'SELECT Continent, COUNT(DISTINCT Language) AS "numberOfLanguages" FROM  countrylanguage JOIN country ON CountryCode = Code GROUP BY Continent',
];
connection.connect();
async function serviceUserRequest() {
  prompt.start();
  const inputNumber = await input('number');
  switch (inputNumber.number) {
    case '1':
      const countryInput = await input('country');
      const capital = await execQuery(queriesToBeExecuted[0], countryInput.country);
      console.log(capital);
      break;
    case '2':
      const regionVal = await input('region');
      console.log(regionVal.region);
      const languages = await execQuery(queriesToBeExecuted[1], regionVal.region);
      console.log(languages);
      break;
    case '3':
      const LanguageInput = await input('language');
      const CitiesCount = await execQuery(queriesToBeExecuted[2], LanguageInput.language);
      console.log(CitiesCount);
      break;
    case '4':
      const regionInput = await input('region');
      const LanguageInputB = await input('language');
      const countriesList = await execQuery(queriesToBeExecuted[3], [
        LanguageInputB.language,
        regionInput.region,
      ]);
      if (countriesList.length !== 0) {
        console.log(countriesList);
      } else {
        console.log('False');
      }
      break;
    case '5':
      const continents = await execQuery(queriesToBeExecuted[4]);
      console.log(continents);
      break;

    default:
      console.log('Please insert right request number between 1 and 5.');
      break;
  }
  connection.end();
}

function main() {
  allQuestions();
  serviceUserRequest();
}
main();
