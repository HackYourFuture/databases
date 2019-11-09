const mysql = require('mysql');
const { promisify } = require('util');

const createHelpOptions = () => {
  console.log(`Usage: node index.js [options]

Options:

1 .....(country)                  shows answer of "What is the capital of a country?"
2 .....(region)                   shows answer of "List al the language spoken in a region"
3 .....(language)                 shows answer of "Find the number of cities in which language
                                  is spoken."
4 .....(region) .....(language)   shows answer of "Are there any countries in any region 
                                  with a specific language as the official language?"
5                                 shows answer of "List all the continents with the number of
                                  languages spoken in each continent."
`);
};
createHelpOptions();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
});

const execQuery = promisify(connection.query.bind(connection));

const showQuery = async (questionNo, answer1, answer2) => {
  const questionNumber = parseInt(questionNo, 10);
  if (Number.isNaN(questionNumber)) {
    console.error('Please enter a number.');
    return;
  } else if (questionNumber < 1 || questionNumber > 5) {
    console.error('Please enter a number between 1 and 5');
    return;
  }
  const queries = [
    {
      query: `select city.name as CAPITAL from city join country on 
      city.id=country.capital where country.name='${answer1}';`,
      number: 1,
    },
    {
      query: `select language,region from country join countrylanguage on 
      country.code=countrylanguage.countryCode where region = '${answer1}';`,
      number: 2,
    },
    {
      query: `select COUNT(city.name) from city join countrylanguage on 
      city.countryCode=countrylanguage.countryCode where language = '${answer1}';`,
      number: 3,
    },
    {
      query: `select country.name from country join city on country.capital=city.id
      join countrylanguage on city.countryCode=countrylanguage.countryCode where
      region='${answer1}' and language='${answer2}' and isOfficial='T';`,
      number: 4,
    },
    {
      query: `select continent, COUNT(language) from country join countrylanguage
       on country.code=countrylanguage.countryCode GROUP BY continent;`,
      number: 5,
    },
  ];
  connection.connect(err => {
    if (err) {
      console.log(err);
    } else {
      console.log('Connection succeed!');
    }
  });
  try {
    const { query } = queries.find(query => query.number === questionNumber);
    const result = await execQuery(query);
    console.table(result);
  } catch (error) {
    console.error(error);
  }
  connection.end(err => {
    if (err) {
      console.error(err);
    } else {
      console.log('Connection successfully ended!');
    }
  });
};

const [, , questionNo, answer1, answer2] = process.argv;

showQuery(questionNo, answer1, answer2);
