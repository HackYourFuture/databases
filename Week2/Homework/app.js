const mysql = require('mysql');
const prompt = require('prompt');
const util = require('util');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});

connection.connect();

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
        const query1 = `SELECT  city.name from country left join city on country.capital = city.id  where country.name = ?`;
        let result1 = await execQuery(query1, country);
        console.log(result1[0].name);
        break;
      case '2':
        const secondChoice = await input(['region']);
        let region = secondChoice.region;
        const query2 = `SELECT distinct countryLanguage.language from countryLanguage left join country on country.code = countryLanguage.countryCode where region = ?`;
        let result2 = await execQuery(query2, region);
        for (let i = 0; i < result2.length; i++) {
          console.log(result2[i].language);
        }
        break;
      case '3':
        const thirdChoice = await input(['language']);
        let language = thirdChoice.language;
        const query3 = `SELECT countryLanguage.language,  count(city.name) as numberOfCities from city left join countryLanguage on city.CountryCode = countryLanguage.countryCode where countryLanguage.language = ?`;
        let result3 = await execQuery(query3, language);
        console.log(result3);
        break;

      case '4':
        const fourthChoiceRegion = await input(['Region']);
        let selectedRegion = fourthChoiceRegion.Region;
        const fourChoiceLanguage = await input(['Language']);
        let selectedLanguage = fourChoiceLanguage.Language;
        const query4 = `SELECT  country.name, countryLanguage.language 
                from country left join countryLanguage on countryLanguage.countryCode = country.code where countryLanguage.isOfficial = 'T' and country.region = ? and countryLanguage.language = ?`;
        let params = [selectedRegion, selectedLanguage];
        let result4 = await execQuery(query4, params);
        if ((result4 = [])) {
          console.log('false query');
        } else {
          console.log(result4);
        }
        break;

      case '5':
        const fifthChoice = `SELECT continent, count(distinct language) as numberOflanguages from country left join countrylanguage on country.code = countrylanguage.countryCode group by continent`;
        let result5 = await execQuery(fifthChoice);
        console.log(result5);
        break;

      default:
        console.log(`Please make a valid choice!`);
        break;
    }
  } catch (error) {
    console.log(error);
  }
  connection.end();
}
seedDatabase();
