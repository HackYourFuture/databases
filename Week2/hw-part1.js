const prompts = require('prompts');
const mysql = require('mysql');
const util = require('util');
const colors = require('colors');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
  multipleStatements: false,
});

const execQuery = util.promisify(connection.query.bind(connection));

const questions = [
  {
    type: 'text',
    name: 'CountryCode',
    message: 'Q1. Enter a country code to see its capital',
    initial: 'Example: NLD',
  },
  {
    type: 'text',
    name: 'region',
    message: 'Q2. Enter a region to find the languages',
    initial: 'Example: South America',
  },
  {
    type: 'text',
    name: 'language',
    message: 'Q3. Enter a language to find the number of cities it is spoken',
    initial: 'Example: English',
  },
  {
    type: 'text',
    name: 'region2',
    message: 'Q4. Enter a region ',
    initial: 'Example: Middle East',
  },
  {
    type: 'text',
    name: 'language2',
    message: 'Q4. Enter a language',
    initial: 'Example: Arabic',
  },
  {
    type: 'text',
    name: 'continent',
    message: 'To get continents with number of languages spoken',
    initial: 'Just press enter',
  },
];

async function queryDatabase() {
  let inputCountryCode = '';
  let inputRegion = '';
  let inputLanguage = '';
  let inputRegOf = '';
  let inputLangOf = '';

  try {
    const onSubmit = (prompt, response) => console.log(`You typed ${colors.rainbow(response)}`);
    const response = await prompts(questions, { onSubmit });

    inputCountryCode = response.CountryCode.toUpperCase();
    inputRegion = response.region
      .toLowerCase()
      .split(' ')
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');
    inputLanguage = response.language.replace(/^\w/, c => c.toUpperCase());
    inputRegOf = response.region2
      .toLowerCase()
      .split(' ')
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');
    inputLangOf = response.language2.replace(/^\w/, c => c.toUpperCase());

    const selectCapital =      'SELECT name FROM city WHERE ID =(SELECT capital FROM country WHERE Code = ?);';
    const selectLang =      'SELECT Language FROM countrylanguage JOIN country ON CountryCode = Code WHERE region = ?';
    const selectNum = 'SELECT count(countryCode) FROM countrylanguage WHERE Language = ?';
    const selectOfficial = `SELECT countryCode, name AS Country, isOfficial FROM country JOIN countryLanguage ON countryCode = Code WHERE region = '${inputRegOf}' AND language = '${inputLangOf}'`;
    const selectContinent = `SELECT country.continent, COUNT(DISTINCT countrylanguage.language) as 'Number of Languages'
    FROM country INNER JOIN countrylanguage 
    ON countrylanguage.countrycode = country.code 
    GROUP BY country.continent;`;

    connection.connect();

    const results1 = await execQuery(selectCapital, inputCountryCode);
    const results2 = await execQuery(selectLang, inputRegion);
    const results3 = await execQuery(selectNum, inputLanguage);
    const results4 = await execQuery(selectOfficial);
    const results5 = await execQuery(selectContinent);

    // Query 1
    console.log(`Q1. The capital is: ${results1[0].name.magenta}`.green);

    // Query 2
    console.log(`Q2. Languages spoken in ${inputRegion.magenta}`.green);
    const getLang = Object.entries(results2);

    for (i = 0; i < getLang.length; i++) {
      console.log(getLang[i][1].Language);
    }

    // Query 3
    console.log(
      `Q3. Number of cities ${inputLanguage} is spoken: ${colors.magenta(
        results3[0]['count(countryCode)'],
      )}`.green,
    );

    // Query 4
    console.table(
      `Q4. ${inputLangOf} is official language in the region ${inputRegOf.magenta}: `.green,
    );
    for (i = 0; i < results4.length; i++) {
      if (results4[i].isOfficial == 'T') {
        console.log(`Official in: ${results4[i].Country}`);
      } else {
        console.log('FALSE');
      }
    }

    // Query 5
    console.log('Q5. Continents and number of languages spoken:'.green);
    console.table(results5);
  } catch (error) {
    console.error(error);
  }

  connection.end();
}

queryDatabase();
