const util = require('util');
const mysql = require('mysql');
const prompt = require('prompt-async');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
});

const execQuery = util.promisify(connection.query.bind(connection));

const query1 = 'SELECT name FROM city WHERE id IN(SELECT capital FROM country WHERE name = ?)';
const query2 =
  'SELECT distinct language FROM countrylanguage WHERE countrycode IN (SELECT code FROM country WHERE region = ?)';
const query3 =
  'SELECT COUNT(name) AS "total cities" FROM city WHERE countrycode IN(SELECT countrycode FROM countrylanguage WHERE language = ?)';
const query4 =
  'SELECT name FROM country WHERE region = ? AND code IN(SELECT countrycode FROM countrylanguage WHERE language = ? AND isofficial = "T")';
const query5 =
  'select Continent, COUNT(distinct Language) as Languages from country left join countryLanguage on country.Code = countrylanguage.countryCode group by continent;';

function getQueryInput(column) {
  return new Promise(function(resolve, reject) {
    prompt.start();
    prompt.get(
      [
        {
          name: column,
          validator: /^[a-zA-Z\s\-]+$/,
          warning: 'value is not valid, it can only contains letters, spaces, or dashes',
        },
      ],
      function(err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  });
}

function getQueryNumber() {
  return new Promise(function(resolve, reject) {
    prompt.start();
    prompt.get(
      [
        {
          name: 'number',
          validator: /^[1-5]$/,
          warning: 'there is only 5 questions. So type a number 1 to 5',
        },
      ],
      function(err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result.number);
        }
      },
    );
  });
}

async function makeQueryByPrompt(query) {
  const input = [];
  if (query == query5) {
    const result = await execQuery(query);
    return result;
  }
  const desc =
    query == query1 ? 'country' : query == query2 || query == query4 ? 'region' : 'language';
  input[0] = await getQueryInput(desc);
  if (query == query4) {
    input[1] = await getQueryInput('language');
    const result = await execQuery(query, [input[0][desc], input[1]['language']]);
    if (result[0] === undefined) {
      return 'FALSE';
    }
    return result;
  }
  const result = await execQuery(query, input[0][desc]);
  return result;
}
async function startPrompting() {
  try {
    connection.connect();
    console.log(`
  select one the following questions by choosing the question number:
  
  1. What is the capital of country X ? (insert a country)
  2. List all the languages spoken in the region Y (insert a region)
  3. Find the number of cities in which language Z is spoken (insert a language)
  4. Accept the region and language from the user.
   Are there any countries in this region with the given language
   as the official language ?
   If yes, display those countries.
   If no, display FALSE.
   (insert a region and a language)
  5. List all the continents with the number of languages spoken in each continent
  `);

    const number = await getQueryNumber();
    switch (number) {
      case '1':
        console.log(await makeQueryByPrompt(query1));
        break;
      case '2':
        console.log(await makeQueryByPrompt(query2));
        break;
      case '3':
        console.log(await makeQueryByPrompt(query3));
        break;
      case '4':
        console.log(await makeQueryByPrompt(query4));
        break;
      case '5':
        console.log(await execQuery(query5));
        break;
      default:
        console.log('sth wrong happened');
    }
    connection.end();
  } catch (error) {
    console.log(error);
    connection.end();
  }
}
startPrompting();
