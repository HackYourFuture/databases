const mysql = require('mysql');
const prompt = require('prompt');
const { promisify } = require('util');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'new_world',
});

const execQuery = promisify(connection.query.bind(connection));
const input = promisify(prompt.get.bind(this)); // referencing using 'this' with .bind() https://www.youtube.com/watch?v=g2WcckBB_q0

async function databaseQueries() {
  let userInputCases = '';

  prompt.start();
  try {
    const user_choices = await input(['user_choice']);
    userInputCases = user_choices.user_choice;

    switch (userInputCases) {
      case '1':
        const caseOne = await input(['country']);
        const country = caseOne.country;
        const query1 = `SELECT name FROM city WHERE id IN (SELECT capital FROM country WHERE name = ?)`;

        const result1 = await execQuery(query1, country);
        console.table(result1);
        break;

      case '2':
        const caseTwo = await input(['region']);
        const region = caseTwo.region;
        const query2 = `SELECT DISTINCT language FROM country, countryLanguage WHERE (countryCode = code) AND (region = ?)`;

        const result2 = await execQuery(query2, region);
        console.table(result2);
        break;

      case '3':
        const caseThree = await input(['language']);
        const language = caseThree.language;
        const query3 = `SELECT COUNT(*) AS Cities FROM city LEFT JOIN countryLanguage ON (countryLanguage.countryCode = city.countryCode) WHERE (language = ?)`;

        const result3 = await execQuery(query3, language);
        console.table(result3);
        break;

      case '4':
        const caseFour = await input(['region']);
        const selectedRegion = caseFour.region;
        const selectLanguage = await input(['Language']);
        const selectedLanguage = selectLanguage.Language;
        const query4 = `SELECT country.Name FROM country, countrylanguage WHERE (country.Code = countrylanguage.CountryCode) AND (country.Region = ?) AND (countrylanguage.Language = ?)`;

        const result4 = await execQuery(query4, [selectedRegion, selectedLanguage]);
        if (result4.length === 0) {
          console.log(false);
        } else {
          console.table(result4);
        }
        break;

      case '5':
        const query5 = `SELECT continent, COUNT(DISTINCT language) AS numberOflanguages FROM country LEFT JOIN countrylanguage ON country.code = countrylanguage.countryCode GROUP BY continent`;
        const result5 = await execQuery(query5);
        console.table(result5);
        break;

      default:
        console.log(`
        Invalid user_choice
        `);
        break;
    }
  } catch (err) {
    console.log(err);
  }
  connection.end();
}

console.log(`
    To run this app:
    Type one of the following "case" numbers: 1 2 3 4 5
    and fill in the required fields if needed. 
    
    Cases are: 
      1. What is the capital of country X ? (Accept X from user)
      2. List all the languages spoken in the region Y (Accept Y from user).
      3. Find the number of cities in which language Z is spoken(Accept Z from user).
      4. Accept the region and language from the user:
          Are there any countries in this region with the given language as the official language?
          If yes, display those countries. If no, display FALSE.
          E.g. (A) input region: 'Western Europe' and input language: 'Dutch' output should be Belgium and Netherlands.
          (B) input region: 'Western Europe' and input language: 'Hindi' output should be 'FALSE'
      5. List all the continents with the number of languages spoken in each continent.
    `);

databaseQueries();
