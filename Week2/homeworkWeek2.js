const mysql = require('mysql');
const util = require('util');
const prompt = require('prompt');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

const execQuery = util.promisify(connection.query.bind(connection));
const input = util.promisify(prompt.get.bind(this));

connection.connect(error => {
  if (error) throw error;
  console.log('\nMysql connected...\n');
});

const help = () => {
  console.log(`
    To answer one of the following questions, insert the question number:
    1 ..... What is the capital of country X ? (Accept X from user)
    2 ..... List all the languages spoken in the region Y (Accept Y from user)
    3 ..... Find the number of cities in which language Z is spoken (Accept Z from user)
    4 ..... Accept the region and language from the user. Are there any countries in this 
            region with the given language as the official language ? If yes, display those countries. 
            If no, display FALSE. E.g. (A) input region : 'Western Europe' and input language : 
            'Dutch' output should be Belgium and Netherlands 
            (B) input region : 'Western Europe' and input language : 'Hindi' output should be 'FALSE'
    5 ..... List all the continents with the number of languages spoken in each continent
  `);
};

async function queryDatabase() {
  help();
  prompt.start();
  try {
    const use_database = `use world`;
    await execQuery(use_database);

    const options = await input(['number']);
    const inputNumber = options.number;

    switch (inputNumber) {
      case '1':
        const countries = await input(['country']);
        const input_country = countries.country;
        const firstQuery = `SELECT city.name FROM city JOIN country ON country.capital = city.id WHERE country.name = ?;`;
        const firstResults = await execQuery(firstQuery, input_country);
        for (result of firstResults) {
          console.log(`The capital of ${input_country.toUpperCase()} is "${result.name}"`);
        }
        break;
      case '2':
        const regions = await input(['region']);
        const input_region = regions.region;
        const secondQuery = `SELECT DISTINCT countrylanguage.language AS 'LanguagesSpokenPerRegion' FROM countrylanguage 
                              JOIN country ON country.code = countrylanguage.countrycode
                              WHERE country.region = ?;
                              `;
        const secondResults = await execQuery(secondQuery, input_region);
        console.log(`The languages spoken of ${input_region.toUpperCase()} are:`);
        for (result of secondResults) {
          console.log(`${JSON.stringify(result.LanguagesSpokenPerRegion)}`);
        }
        break;
      case '3':
        const languages = await input(['language']);
        const input_language = languages.language;
        const thirdQuery = `SELECT COUNT(city.name) AS 'NumberOfCitiesPerLanguage' FROM city 
                             JOIN countrylanguage ON city.countrycode = countrylanguage.countrycode
                             WHERE countrylanguage.language = ?;
                             `;
        const thirdResults = await execQuery(thirdQuery, input_language);
        console.log(`The number of cities in which ${input_language.toUpperCase()} is spoken is:`);
        for (result of thirdResults) {
          console.log(result.NumberOfCitiesPerLanguage);
        }
        break;
      case '4':
        const regionAndLanguage = await input(['region', 'language']);
        const inputRegion = regionAndLanguage.region;
        const inputLanguage = regionAndLanguage.language;
        const fourthQuery = `SELECT country.name FROM country 
                              JOIN countrylanguage ON country.code = countrylanguage.countrycode
                              WHERE countrylanguage.isofficial = 'T' AND country.region = ? AND countrylanguage.language = ?;
                              `;
        const fourthResults = await execQuery(fourthQuery, [inputRegion, inputLanguage]);
        console.log(
          `The countries in which ${inputLanguage.toUpperCase()} is spoken in the ${inputRegion.toUpperCase()} are:`,
        );
        if (fourthResults.length === 0) {
          console.log('"FALSE"');
        } else {
          for (result of fourthResults) {
            console.log(`"${result.name}"`);
          }
        }
        break;
      case '5':
        const fifthQuery = `SELECT country.continent, COUNT(countrylanguage.language) AS 'TheNumberOfLanguagesSpoken' FROM country 
                             JOIN countrylanguage ON country.code = countrylanguage.countrycode
                             GROUP BY country.continent;
                             `;
        const fifthResults = await execQuery(fifthQuery);
        console.log(`The number of languages spoken per continent are:`);
        for (result of fifthResults) {
          console.log(`${result.continent}    =>    ${result.TheNumberOfLanguagesSpoken}`);
        }
        break;
      default:
        console.log(`Please, insert a valid option between 1 and 5`);
        help();
    }
  } catch (error) {
    console.error(error);
  }

  connection.end(error => {
    if (error) throw error;
    console.log('\nMysql disconnected...');
  });
}

queryDatabase();
