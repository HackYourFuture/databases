const mysql = require('mysql');
const prompt = require('prompt');
const util = require('util');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
});

const execQuery = util.promisify(connection.query.bind(connection));
const input = util.promisify(prompt.get.bind(this));

async function seedDatabase() {
  let input_value = '';
  prompt.start();
  try {
    console.log(`Choose from the following options:
    1. What is the capital of country X ? (Accept X from user).
    2. List all the languages spoken in the region Y (Accept Y from user).
    3. Find the number of cities in which language Z is spoken(Accept Z from user).
    4. Accept the region and language from the user:
       Are there any countries in this region with the given language as the official language?
       If yes, display those countries. If no, display FALSE. 
       E.g. (A) input region: 'Western Europe' and input language: 'Dutch' output should be Belgium and Netherlands.
       (B) input region: 'Western Europe' and input language: 'Hindi' output should be 'FALSE'
    5. List all the continents with the number of languages spoken in each continent.
    `);

    const choices = await input(['choice']);
    input_value = choices.choice;

    switch (input_value) {
      case '1':
        const firstChoice = await input(['country']);
        let country = firstChoice.country;
        const query1 = `SELECT city.Name FROM country JOIN city on city.ID = country.Capital WHERE country.Name = ?;`;
        let result1 = await execQuery(query1, country);
        console.log(result1);
        break;

      case '2':
        const secondChoice = await input([region]);
        let region = secondChoice.region;
        const query2 = `SELECT DISTINCT language FROM country, countryLanguage WHERE (countryCode = code) AND (region = ?);`;
        let result2 = await execQuery(query2, region);
        console.log(result2);
        break;

      case '3':
        const thirdChoice = await input(['language']);
        let language = thirdChoice.language;
        const query3 = `SELECT COUNT(*) AS Cities FROM city LEFT JOIN countryLanguage ON (countryLanguage.countryCode = city.countryCode) WHERE (language = ?);`;
        let result3 = await execQuery(query3, language);
        console.log(result3);
        break;

      case '4':
        const fourthChoiceRegion = await input(['Region']);
        let selectedRegion = fourthChoiceRegion.Region;
        const fourChoiceLanguage = await input(['Language']);
        let selectedLanguage = fourChoiceLanguage.Language;
        const query4 = `SELECT country.name FROM country, countryLanguage WHERE (country.Code = countryLanguage.CountryCode) AND (countryLanguage.language = ?) AND (country.region = ?);`;
        let params = [selectedRegion, selectedLanguage];
        let result4 = await execQuery(query4, params);
        console.log(result4);
        break;

      case '5':
        const fifthChoice = `SELECT country.continent, count(countryLanguage.language) as Languages
        FROM country JOIN countryLanguage on country.code = countryLanguage.countryCode AS L GROUP BY continent;`;
        let result5 = await execQuery(fifthChoice);
        console.log(result5);
        break;

      default:
        console.log(`
        Please make a valid choice!
        `);
        break;
    }
  } catch (error) {
    console.log(error);
  }
  connection.end();
}
seedDatabase();
