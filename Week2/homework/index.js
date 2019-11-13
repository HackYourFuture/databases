'use strict';
{
  const readline = require('readline-sync');
  const program = require('commander');
  const { promisify } = require('util');
  const mysql = require('mysql');

  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'new_world',
  });

  const executeQuery = promisify(connection.query.bind(connection));

  function exitProgram() {
    connection.end();
    process.exit();
  }

  async function makeQuery(query, input1, input2) {
    try {
      const result = await executeQuery(query, [input1, input2]);

      if (result.length !== 0) {
        console.table(result);
      } else {
        console.error(`The value you entered is invalid, please enter valid value!`);
      }
      exitProgram();
    } catch (error) {
      console.error(`There was an error: ${error.code} - ${error.message}`);
    }
  }

  async function findCapitalCity() {
    const country = readline.question('Enter a country: ');
    const query = `select ci.name as capital from city ci inner join country co on ci.id = co.capital where co.name = ? `;
    await makeQuery(query, country);
  }

  async function listLanguages() {
    const region = readline.question('Enter a region: ');
    const query = `select distinct cl.language from countrylanguage cl inner join country c on cl.countryCode = c.code where c.region = ?`;
    console.log(`The languages spoken in ${region}: `);
    await makeQuery(query, region);
  }

  async function findNumberOfCities() {
    try {
      const language = readline.question('Enter a language:');
      const result = await executeQuery(
        `select count(distinct ci.name) as numberOfCities from city ci 
          join countrylanguage cl on ci.countryCode = cl.countryCode 
          where cl.language = ?`,
        language,
      );

      const [{ numberOfCities }] = result;

      if (numberOfCities === 0) {
        console.log(`Couldn't find ${language}, please enter valid language!`);
      } else {
        console.table(result);
      }
      exitProgram();
    } catch (error) {
      console.error(
        `There was error while calculating number of cities: ${error.code} - ${error.message}`,
      );
    }
  }

  async function findCountries() {
    try {
      const region = readline.question('Enter a region: ');
      const language = readline.question('Enter a language: ');
      const countries = await executeQuery(
        `select distinct c.name as countries from countrylanguage l 
          inner join country as c 
          on c.code = l.countryCode 
          and c.region = ?
          and l.language = ? 
          and l.isOfficial = 't'`,
        [region, language],
      );

      if (countries.length === 0) {
        console.log('FALSE');
      } else {
        console.table(countries);
      }

      exitProgram();
    } catch (error) {
      console.error(
        `There was error while calculating the countries: ${error.code} - ${error.message}`,
      );
    }
  }

  async function listContinents() {
    const query = `select c.continent, count( distinct l.language) as numberOfLanguagesSpoken from country c  
          inner join countrylanguage l on c.code = l.countryCode group by c.continent`;

    await makeQuery(query);
  }

  async function main() {
    connection.connect(error => {
      if (error) {
        console.error(
          `There was an error connecting to the server: ${error.code} - ${error.message}`,
        );
        process.exit();
      }
    });

    program
      .command('capital')
      .description('Find the capital of country X (Accept X from user)')
      .action(findCapitalCity);

    program
      .command('languages')
      .description('List all the languages spoken in the region Y (Accept Y from user)')
      .action(listLanguages);

    program
      .command('cities')
      .description('Find the number of cities in which language Z is spoken (Accept Z from user)')
      .action(findNumberOfCities);

    program
      .command('countries')
      .description(
        'Are there any countries in a region with the given language as the official language',
      )
      .action(findCountries);

    program
      .command('continents')
      .description('List all the continents with the number of languages spoken in each continent')
      .action(listContinents);

    program.on('command:*', () => {
      console.error(
        'Invalid command: %s\nSee --help or -h for the list of available commands.',
        program.args.join(' '),
      );
      process.exit();
    });

    if (process.argv.length === 2) {
      program.help();
    }

    program.parse(process.argv);
  }

  main();
}
