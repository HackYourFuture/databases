const util = require('util');
const mysql = require('mysql');
const prompt = require('prompt');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});

function handleErrorAndData(error, data) {
  if (error) {
    console.log(error);
  } else {
    console.log(data);
  }
}

connection.connect(error => handleErrorAndData(error, 'MySQL is connected'));

const execQuery = util.promisify(connection.query.bind(connection));

const input = util.promisify(prompt.get.bind(this));

async function queryDatabase() {
  prompt.start();
  try {
    console.log(`please choose from the following questions and fill in the prompt with the question number.\n
      1. Give me a country name, I will teach you it's capital\n
      2. How about listing all the languages spoken in the region? (Fill in a region name)\n
      3. How about the number of the cities that speak a given language (Write down a language)\n
      4. You give me a region name and a language. If this language is official in that region, I will give you the name of the countries. If no, false will be displayed. Try another one.'\n
      5. Let me list all the continents with the number of languages spoken in each of them.
      `);
    const question = await input('number');
    const questionNumber = question['number'];
    if (questionNumber == 1) {
      const userInput = await input('country_name');
      const inputCountry = userInput['country_name'];
      const selectQuery =
        'SELECT city.name FROM city JOIN country ON country.capital = city.id WHERE country.Name = ?';
      const result = await execQuery(selectQuery, inputCountry);
      console.log(result);
    } else if (questionNumber == 2) {
      const userInput = await input('region_name');
      const inputRegion = userInput['region_name'];
      const selectQuery =
        'SELECT language FROM countrylanguage JOIN country ON country.code = countrylanguage.countryCode WHERE country.region =?';
      const results = await execQuery(selectQuery, inputRegion);
      for (r of results) {
        console.log(r);
      }
    } else if (questionNumber == 3) {
      const userInput = await input('language');
      const inputLanguage = userInput['language'];
      const selectQuery =
        'SELECT count(name) FROM city JOIN countrylanguage ON countrylanguage.countryCode = city.countryCode WHERE language = ?';
      const result = await execQuery(selectQuery, inputLanguage);
      console.log(result);
    } else if (questionNumber == 4) {
      const userFirstInput = await input('region_name');
      const userSecondInput = await input('language');
      const inputRegion = userFirstInput['region_name'];
      const inputLanguage = userSecondInput['language'];
      const selectQuery =
        'SELECT name, isofficial FROM country JOIN countrylanguage ON code = countrycode GROUP BY region, language, name HAVING isofficial = "T" AND region = ? AND language = ?';
      const results = await execQuery(selectQuery, [inputRegion, inputLanguage]);
      const string = JSON.stringify(results);
      const arr = JSON.parse(string);
      console.log(arr);
    } else if (questionNumber == 5) {
      const selectQuery =
        'SELECT continent, count(DISTINCT language) AS number_of_languages FROM country JOIN countrylanguage ON countrylanguage.CountryCode = country.code GROUP BY continent ORDER BY continent ASC';
      const results = await execQuery(selectQuery);
      for (r of results) {
        console.log(r);
      }
    }
  } catch (error) {
    console.error(error);
  }
  connection.end();
}

queryDatabase();
