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
    const use_database = `use new_world`;
    await execQuery(use_database);

    const options = await input(['number']);
    const input_number = options.number;

    switch (input_number) {
      case '1':
        const firstOptions = await input(['country']);
        const input_country = firstOptions.country;
        const first_query = `SELECT city.name FROM city JOIN country ON country.capital = city.id WHERE country.name = ?;`;
        const firstResults = await execQuery(first_query, input_country);
        for (result of firstResults) {
          console.log(`The capital of ${input_country.toUpperCase()} is "${result.name}"`);
        }
        break;
      case '2':
        const secondOption = await input(['region']);
        const input_region = secondOption.region;
        const second_query = `SELECT DISTINCT countrylanguage.language AS 'LanguagesSpokenPerRegion' FROM countrylanguage 
                              JOIN country ON country.code = countrylanguage.countrycode
                              WHERE country.region = ?;
                              `;
        const secondResults = await execQuery(second_query, input_region);
        console.log(`The languages spoken of ${input_region.toUpperCase()} are:`);
        for (result of secondResults) {
          console.log(`${JSON.stringify(result.LanguagesSpokenPerRegion)}`);
        }
        break;
      case '3':
        const thirdOption = await input(['language']);
        const input_language = thirdOption.language;
        const third_query = `SELECT COUNT(city.name) AS 'NumberOfCitiesPerLanguage' FROM city 
                             JOIN countrylanguage ON city.countrycode = countrylanguage.countrycode
                             WHERE countrylanguage.language = ?;
                             `;
        const thirdResults = await execQuery(third_query, input_language);
        console.log(`The number of cities in which ${input_language.toUpperCase()} is spoken is:`);
        for (result of thirdResults) {
          console.log(result.NumberOfCitiesPerLanguage);
        }
        break;
      case '4':
        const fourthOption = await input(['region', 'language']);
        const input_arg_region = fourthOption.region;
        const input_arg_language = fourthOption.language;
        const fourth_query = `SELECT country.name FROM country 
                              JOIN countrylanguage ON country.code = countrylanguage.countrycode
                              WHERE countrylanguage.isofficial = 'T' AND country.region = ? AND countrylanguage.language = ?;
                              `;
        const fourthResults = await execQuery(fourth_query, [input_arg_region, input_arg_language]);
        console.log(
          `The countries in which ${input_arg_language.toUpperCase()} is spoken in the ${input_arg_region.toUpperCase()} are:`,
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
        const fifth_query = `SELECT country.continent, COUNT(countrylanguage.language) AS 'TheNumberOfLanguagesSpoken' FROM country 
                             JOIN countrylanguage ON country.code = countrylanguage.countrycode
                             GROUP BY country.continent;
                             `;
        const fifthResults = await execQuery(fifth_query);
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
