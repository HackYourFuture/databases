var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
});

connection.connect();

function sendQuery(query) {
  connection.query(query, function(error, results, fields) {
    if (error) {
      throw error;
    }
    if (!results[0]) {
      console.log('Sorry no match in our database!');
    }
    if (results.length === 0) {
      console.log('False');
    } else {
      console.log('The reply is', results);
    }
  });
}

const inputType = process.argv[2]; // type like region, language, country
const userInput = process.argv[3]; // value like western europe, Dutch, Netherlands
const userInput2 = process.argv[4];

//What is the capital of country X ? (Accept X from user)
const capital_of_country = `SELECT capital FROM country WHERE country.Name = ?`;
const capital_of_country_param = userInput;

// List all the languages spoken in the region Y (Accept Y from user)
const language_of_region = `SELECT Language FROM countrylanguage INNER JOIN country ON country.Code = countrylanguage.CountryCode WHERE country.Region = ?`;
const language_of_region_param = userInput;

function help() {
  console.log(`
  - to find the capital of country X enter 'country' followed by the name of the country you want.
  - to List all the languages spoken in the region Y enter 'region' followed by the region you want.
  - to find the number of cities in which language Z is spoken enter 'language' followed by the language you want.
`);
}

//Find the number of cities in which language Z is spoken (Accept Z from user)
const language_of_city = `SELECT COUNT(Name) AS CityLanguage FROM city INNER JOIN countrylanguage ON countrylanguage.CountryCode = city.Country_Code WHERE countrylanguage.Language = ?`;
const language_of_city_param = userInput;
//Accept the region and language from the user. Are there any countries in this region with the given language as the official language ? If yes, display those countries. If no, display FALSE. E.g. (A) input region : 'Western Europe' and input language : 'Dutch' output should be Belgium and Netherlands (B) input region : 'Western Europe' and input language : 'Hindi' output should be 'FALSE'

const official_language = `SELECT Name FROM country INNER JOIN countrylanguage ON countrylanguage.CountryCode = country.Code WHERE countrylanguage.Language = ? AND country.Region = ? AND countrylanguage.isOfficial ='T'`;
official_language_params = [userInput, userInput2];

// List all the continents with the number of languages spoken in each continent
const language_of_continents =
  'SELECT COUNT(DISTINCT Language) as languages, country.continent FROM country INNER JOIN countrylanguage ON countrylanguage.CountryCode = country.Code GROUP BY country.continent';

switch (inputType) {
  case 'country':
    sendQuery(capital_of_country, capital_of_country_param);
    break;
  case 'region':
    sendQuery(language_of_region, language_of_region_param);
    break;
  case 'language':
    sendQuery(language_of_city, language_of_city_param);
    break;
  case 'language_and_region':
    console.log('userInput =', userInput, 'userInput2 =', userInput2);
    sendQuery(official_language, official_language_params);
    break;
  case 'continents':
    sendQuery(language_of_continents);
    break;
  case 'help':
    help();
    break;
  default:
    help();
    break;
}

connection.end();
