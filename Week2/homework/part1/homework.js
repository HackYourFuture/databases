const util = require('util');
const prompt = require('prompt');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'ghufran',
  password: 'deiri',
  database: 'new_world',
});

const execQuery = util.promisify(connection.query.bind(connection));
const input = util.promisify(prompt.get.bind(this));

const questions = `
Please inter the number of the question first.\n
1- What is the capital of country X ?\n
2- List all the languages spoken in the region Y.\n
3- Find the number of cities in which language Z is spoken.\n
4- Are there any countries in this region with the given language as the official language ?\n
5- List all the continents with the number of languages spoken in each continent.
`;

const select_query = [
  `SELECT city.Name 
  FROM country JOIN city 
  on city.ID = country.capital 
  WHERE country.Name = ?;`,

  `SELECT Language 
  FROM countrylanguage JOIN country 
  ON Code = countrylanguage.Country_Code 
  WHERE Region = ?;`,

  `SELECT COUNT(city.Name) 
  FROM city JOIN countrylanguage 
  ON city.Country_Code = countrylanguage.Country_Code 
  WHERE Language = ?;`,

  `SELECT country.Name 
  FROM country JOIN countrylanguage 
  ON Code = countrylanguage.Country_Code 
  GROUP BY Region, Language, country.Name, countrylanguage.IsOfficial 
  HAVING countrylanguage.IsOfficial = 'T' AND Region = ? AND Language = ?;`,

  `SELECT Continent, COUNT(DISTINCT Language) AS Number_Of_Languages 
  FROM countrylanguage JOIN country 
  ON Code = Country_Code 
  GROUP BY Continent`,
];

async function seedDatabase() {
  prompt.start();
  try {
    console.log(questions);
    const question = await input('number');
    const questionNumber = question['number'];

    let userInput;
    let result;
    let Region;
    let Language;

    switch (questionNumber) {
      case '1':
        userInput = await input('Country Name');
        const Country = userInput['Country Name'];
        result = await execQuery(select_query[0], Country);
        console.log(result);
        break;

      case '2':
        userInput = await input('Region');
        Region = userInput['Region'];
        result = await execQuery(select_query[1], Region);
        console.log(result);
        break;

      case '3':
        userInput = await input('Language');
        Language = userInput['Language'];
        result = await execQuery(select_query[2], Language);
        console.log(result);
        break;

      case '4':
        userInput = await input('Region');
        Region = userInput['Region'];
        userInput = await input('Language');
        Language = userInput['Language'];
        result = await execQuery(select_query[3], [Region, Language]);
        if (result.length !== 0) {
          console.log(result);
        } else {
          console.log(false);
        }
        break;

      case '5':
        result = await execQuery(select_query[4]);
        console.log(result);
        break;

      default:
        console.log('Please enter valid values');
        break;
    }

    connection.end();
  } catch (err) {
    console.error(err.message);
    connection.end();
  }
}

seedDatabase();
