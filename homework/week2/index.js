const prompts = require('prompts');
const mysql = require('mysql');
const config = require('./connection.js');

const connection = mysql.createConnection(config);
connection.connect();

function dropAndCreateProcedure() {
  const dropSql = `DROP PROCEDURE IF EXISTS getCountriesSameRegionAndLanguage`;
  const createSql = `
  CREATE PROCEDURE getCountriesSameRegionAndLanguage(IN input_region varchar(52), IN input_language varchar(30))
  BEGIN
	declare result INT;
	SET result = ( SELECT COUNT(*)	FROM country c1 JOIN countrylanguage cl ON c1.code=cl.countrycode AND c1.region=input_region AND cl.language=input_language AND cl.IsOfficial="T");
	
    IF( result > 1 ) THEN
		SELECT c1.name 
        FROM country c1 
        JOIN countrylanguage cl 
        ON c1.code=cl.countrycode 
        AND c1.region=input_region
        AND cl.language=input_language
        AND cl.IsOfficial="T";
    ELSE
		SET lc_messages =  'FALSE: There are no such countries';SIGNAL SQLSTATE '45000';
	END IF;
END
  `;

  connection.query(dropSql, function(error) {
    if (error) {
      throw error;
    }
  });

  connection.query(createSql, function(error) {
    if (error) {
      throw error;
    }
  });
}

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
    ({ input } = await prompts({
      type: 'text',
      name: 'input',
      message: `Enter the ${question}:`,
    }));
  }

  if (question === 4) {
    const { region } = await prompts({
      type: 'text',
      name: 'region',
      message: `Enter the region:`,
    });

    const { language } = await prompts({
      type: 'text',
      name: 'language',
      message: `Enter the language:`,
    });

    input = [region, language];
  }

  let sql;
  switch (question) {
    case 'country':
      sql = `SELECT city.name
      FROM city, country
      WHERE city.id=country.capital 
      AND country.name = ?;
      `;
      break;
    case 'region':
      sql = `SELECT distinct language
            FROM country c, countrylanguage l 
            WHERE c.code=l.countrycode
            AND  c.region=?;
            `;
      break;
    case 'language':
      sql = `SELECT count(c.name) language_spoken_city_count 
            FROM countrylanguage cl
            JOIN city c 
            ON c.countrycode=cl.countrycode 
            AND cl.language=?;
            `;
      break;
    case 4:
      sql = `CALL getCountriesSameRegionAndLanguage(?,?);`;
      break;
    case 5:
      sql = `SELECT c.continent,count(distinct cl.language) language_spoken
      FROM countrylanguage cl
      JOIN country c
      ON cl.countrycode=c.code
      WHERE 1=?
      GROUP BY c.continent;`;
      input = 1;
      break;
    default:
      console.log('Select a question and reply to prompted message in order to get an answer');
  }

  connection.query(sql, input, function(error, results) {
    if (error) {
      throw error;
    }

    if (question === 4) {
      results = results[0];
    }

    results.forEach(element => {
      let row = [];
      for (let key of Object.keys(element)) {
        row.push(element[key]);
      }
      console.log(row.join('\t\t'));
    });
  });
  connection.end();
}

function main() {
  try {
    dropAndCreateProcedure();
    question();
  } catch (error) {
    console(error.message);
  }
}

main();
