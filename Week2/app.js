const mysql = require('mysql');
const prompt = require('prompt');
const util = require('util');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'new_world',
  multipleStatements: false,
});

const execQuery = util.promisify(connection.query.bind(connection));
const input = util.promisify(prompt.get.bind(this));

async function queryDb() {
  let userMakeChoices = '';
  prompt.start();

  try {
    console.log(`Please choose one of the questions below(type the numbers from 1 to 5):

    1. What is the capital of country X ? (Accept X from user)
    2. List all the languages spoken in the region Y (Accept Y from user)
    3. Find the number of cities in which language Z is spoken (Accept Z from user)
    4.Accept the region and language from the user.
    5. List all the continents with the number of languages spoken in each continent
    `);

    const choices = await input(['choice']);
    userMakeChoices = choices.choice;

    const chooseFirstQuery = `SELECT name from city where id in (select capital from country where name = ?)`;
    const chooseSecondQuery = `SELECT countrylanguage.language ,country.region FROM country JOIN countrylanguage ON countrylanguage.CountryCode = country.code WHERE country.region = ?;`;
    const chooseThirdQuery = `SELECT COUNT(city.Name) AS total FROM countrylanguage JOIN city ON city.CountryCode = countrylanguage.CountryCode WHERE countrylanguage.language = ?`;
    const chooseForthQuery = `SELECT country.Name FROM country, countrylanguage WHERE (country.Code = countrylanguage.CountryCode) AND (country.Region = ?) AND (countrylanguage.Language = ?) AND IsOfficial = 'T'`;
    const chooseFifthQuery = `SELECT continent, COUNT(DISTINCT language) AS numberOflanguages FROM country LEFT JOIN countrylanguage ON country.code = countrylanguage.countryCode GROUP BY continent`;

    switch (userMakeChoices) {
      case '1':
        const choiceFirst = await input(['country']);
        const country = choiceFirst.country;
        const responseFirst = await execQuery(chooseFirstQuery, country);
        console.log(responseFirst);
        break;

      case '2':
        const choiceSecond = await input(['region']);
        const region = choiceSecond.region;
        const responseSecond = await execQuery(chooseSecondQuery, region);
        console.log(responseSecond);
        break;

      case '3':
        const choiceThird = await input(['language']);
        const language = choiceThird.language;
        const responseThird = await execQuery(chooseThirdQuery, language);
        console.log(responseThird);
        break;

      case '4':
        const choiceForth = await input(['region']);
        const chooseRegion = choiceForth.region;
        const chooseLanguage = await input(['Language']);
        const chosenLanguage = chooseLanguage.Language;
        const responseForth = await execQuery(chooseForthQuery, [chooseRegion, chosenLanguage]);

        if (responseForth === null || responseForth.length <= 0) {
          console.log(false);
        } else {
          console.log(responseForth);
        }
        break;

      case '5':
        const responseFifth = await execQuery(chooseFifthQuery);
        console.log(responseFifth);
        break;

      default:
        console.log(`
        you made an invalid choice, please type a number between 1 to 5
        `);
        break;
    }
  } catch (err) {
    console.log(err);
  }
  connection.end();
}

queryDb();
