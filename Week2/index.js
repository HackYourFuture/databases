const mysql = require('mysql');
const { promisify } = require('util');
const prompt = require('prompt');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'new_world',
});

const executeQuery = promisify(connection.query.bind(connection));
const input = promisify(prompt.get.bind(this));

async function manipulateDatabase() {
  const questions = `
   *** Please type the Question number *** 
  1. What is the capital of country X ?
  2. List all the languages spoken in the region Y
  3. Find the number of cities in which language Z is spoken
  4. Are there any countries in this region with the given languages the official language ? (Display / False)
  5. List all the continents with the number of languages spoken in each continent`;

  const queries = [
    `SELECT country.name ,city.name FROM city JOIN country ON city.id = country.capital WHERE country.name = ?;`,
    `SELECT countrylanguage.language ,country.region FROM country JOIN countrylanguage ON countrylanguage.CountryCode = country.code WHERE country.region = ?;`,
    `SELECT count(city.name), language FROM city JOIN countrylanguage ON city.countryCode=countrylanguage.countryCode WHERE language = ?;`,
    `select country.name from country join city on country.capital=city.id join countrylanguage on city.countryCode=countrylanguage.countryCode where country.region=? and language=? and isOfficial='T';`,
    `SELECT country.continent, count(distinct countrylanguage.language) FROM countrylanguage JOIN country ON countrylanguage.countryCode=country.code GROUP BY country.continent; `,
  ];

  connection.connect(err => {
    if (err) {
      console.log('Error while connecting to server');
    } else {
      console.log('Successfully connected to database server');
    }
  });

  prompt.start();
  const queryMachine = async () => {
    console.log(questions);
    const typedQuestion = await input(['question number']);
    const QuestionIndex = typedQuestion['question number'];
    const convertToNum = parseInt(QuestionIndex);

    switch (convertToNum) {
      case 1:
        const typedCountry = await input(['country name']);
        const result1 = await executeQuery(queries[0], typedCountry['country name']);
        console.table(result1);
        break;
      case 2:
        var typedRegion = await input(['region']);
        const result2 = await executeQuery(queries[1], typedRegion['region']);
        console.table(result2);
        break;
      case 3:
        const typedLanguage = await input(['language']);
        const result3 = await executeQuery(queries[2], typedLanguage['language']);
        console.table(result3);
        break;
      case 4:
        const typedRegion2 = await input(['region']);
        const typedLanguage2 = await input(['language']);
        const result4 = await executeQuery(queries[3], [
          typedRegion2['region'],
          typedLanguage2['language'],
        ]);
        if (result4 === null || result4 === undefined || result4.length <= 0) {
          console.log('false');
        } else {
          console.table(result4);
        }
        break;
      case 5:
        const result5 = await executeQuery(queries[4]);
        console.table(result5);
        break;
      default:
        console.log('Please enter a valid question number');
        break;
    }
    console.log('If you want to select another question type 1, for exit type any number');
    const typedNum = await input(['question number']);
    const QuestionIndex2 = parseInt(typedNum['question number']);
    QuestionIndex2 === 1 && (await queryMachine());
  };

  try {
    await queryMachine();
  } catch (error) {
    console.log(error);
  }
  connection.end(console.log('connection has ended'));
}

manipulateDatabase();
