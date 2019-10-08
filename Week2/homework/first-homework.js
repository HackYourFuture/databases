const mysql = require('mysql');
const util = require('util');
const program = require('commander');

const connection_config = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
});

const execQuery = util.promisify(connection_config.query.bind(connection_config));

connection_config.connect(err => {
  if (err) {
    throw err;
  }
});

program.version('0.0.1');

program.description(
  'Hello! Welcome to this small cli program.\nHere we provide you some information based on what you specify.\nLook below and start exploring!',
);

program
  .command('capital-of <country>')
  .description('This command gives you the capital of the country')
  .action(country => {
    const getCapital = `SELECT city.name as Capital 
    FROM country, city 
    WHERE country.capital = city.id 
    AND country.name =?;`;
    try {
      execQuery(getCapital, [country]).then(capital => {
        console.log(`${JSON.stringify(capital)}`);
      });
    } catch (err) {
      if (err) {
        throw err;
      }
    }
  });

program
  .command('spoken-language <region>')
  .description("This command gives you the spoken language on the region you're looking at")
  .action(region => {
    const getRegion = `SELECT distinct language 
    FROM countrylanguage, country 
    WHERE countrylanguage.CountryCode = country.code 
    AND country.region =?;`;
    try {
      execQuery(getRegion, [region]).then(region => {
        console.log(`${JSON.stringify(region)}`);
      });
    } catch (err) {
      if (err) {
        throw err;
      }
    }
  });

program
  .command('get-city-number <language>')
  .description(
    'This command gives you the number of cities that the language you specify is spoken.',
  )
  .action(language => {
    const getCityNumber = `SELECT distinct count(name) AS 'Number of Cities' 
    FROM city, countrylanguage 
    WHERE countrylanguage.countrycode = city.countrycode 
    AND countrylanguage.language= ?;`;
    try {
      execQuery(getCityNumber, [language]).then(number => {
        console.log(`${JSON.stringify(number)}`);
      });
    } catch (err) {
      if (err) {
        throw err;
      }
    }
  });

program
  .command('see-official-lang <region> <language>')
  .description('This command gives you the countries that uses the specified language.')
  .action((region, language) => {
    const getCountry = `SELECT name FROM country AS c
    JOIN countrylanguage AS clang 
    ON clang.CountryCode=c.Code
    WHERE c.region= ?
    AND clang.language = ?
    AND clang.IsOfficial= 'T';`;

    try {
      execQuery(getCountry, [region, language]).then(country => {
        if (country.length === 0) {
          console.log('FALSE');
        } else {
          console.log(JSON.stringify(country));
        }
      });
    } catch (err) {
      if (err) throw err;
    }
  });

program
  .command('languages-by-continents')
  .description('Gives you the number of spoken languages on each continent ')
  .action(() => {
    const getLangNumByCont = `SELECT Continent, count(distinct Language) AS Languages 
    FROM country, countrylanguage 
    WHERE country.Code=countrylanguage.CountryCode 
    GROUP BY Continent;`;
    try {
      execQuery(getLangNumByCont).then(list => {
        const listt = JSON.stringify(list);
        console.log(JSON.parse(listt));
      });
    } catch (err) {
      if (err) {
        console.log(err);
      }
    }
  });

program.parse(process.argv);

connection_config.end();
