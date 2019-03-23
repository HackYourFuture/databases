const prompts = require('prompts');
const mysql = require('mysql');
const config = require('./connection.js');

const connection = mysql.createConnection(config);
connection.connect();

async function question() {
  const questions = [
    {
      type: 'select',
      name: 'question',
      message: 'Pick a question',
      choices: [
        { title: 'What is the capital of country X', value: 'country' },
        { title: 'List all the languages spoken in the region Y', value: 'region' },
        { title: 'Find the number of cities in which language Z is spoken', value: 'language' },
        {
          title: 'Are there any countries that have A) Same official language B) Same region',
          value: 4,
        },
        {
          title: 'List all the continents with the number of languages spoken in each continent',
          value: 5,
        },
      ],
    },
  ];

  const response = await prompts(questions);

  const question = response.question;
  let input;

  if (['country', 'region', 'language'].includes(question)) {
    input = await prompts({
      type: 'text',
      name: 'text',
      message: `Enter the ${question}:`,
    });
  }
  let sql;
  switch (question) {
    case 'country':
      sql = `SELECT city.name
      FROM city, country
      WHERE city.id=country.capital 
      AND country.name = "${input.text}";
      `;
      break;
    case 'region':
      sql = `SELECT distinct language
            FROM country c, countrylanguage l 
            WHERE c.code=l.countrycode
            AND  c.region="${input.text}";
            `;
      break;
    case 'language':
      sql = `SELECT count(c.name) language_spoken_city_count 
            FROM countrylanguage cl
            JOIN city c 
            ON c.countrycode=cl.countrycode 
            AND cl.language="${input.text}";
            `;
      break;
    case 4:
      sql = `SELECT cl1.countrycode,cl1.language,c1.region,c2.region, cl2.countrycode, cl1.language
            FROM countrylanguage cl1 
            JOIN countrylanguage cl2 ON cl1.language=cl2.language and cl1.isofficial='T' and cl2.isofficial='T' AND cl1.countrycode<>cl2.countrycode
            JOIN country c1 ON cl1.countrycode = c1.code
            JOIN country c2 ON cl2.countrycode = c2.code AND c1.region=c2.region;
            `;
      break;
    case 5:
      sql = `SELECT c.continent,count(distinct cl.language) language_spoken
      FROM countrylanguage cl
      JOIN country c
      ON cl.countrycode=c.code
      GROUP BY c.continent;`;
      break;
    default:
      console.log('Select a question and reply to prompted message in order to get an answer');
  }

  connection.query(sql, function(error, results, fields) {
    if (error) {
      throw error;
    }
    console.log(results);
    console.log(fields);
  });
  connection.end();
}

question();
