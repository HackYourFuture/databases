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
    const getCapital = `select city.name as Capital from country, city where country.capital = city.id and country.name ='${country}';`;
    try {
      execQuery(getCapital).then(capital => {
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
    const getRegion = `select distinct language from countrylanguage, country where countrylanguage.CountryCode = country.code and country.region ='${region}';`;
    try {
      execQuery(getRegion).then(region => {
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
    const getCityNumber = `select distinct count(name) as 'Number of Cities' from city, countrylanguage where countrylanguage.countrycode = city.countrycode and countrylanguage.language='${language}';`;
    try {
      execQuery(getCityNumber).then(number => {
        console.log(`${JSON.stringify(number)}`);
      });
    } catch (err) {
      if (err) {
        throw err;
      }
    }
  });

program
  .command('see-official-lang <region>, <language>')
  .description('This command gives you the countries that uses the specified language.')
  .action((region, language) => {
    const getCountry = `SELECT name FROM country AS c
    JOIN countrylanguage AS clang 
    ON clang.CountryCode=c.Code
    WHERE c.region= ${region}
    AND clang.language = ${language}
    AND clang.IsOfficial= 'T';`;

    try {
      execQuery(getCountry).then(country => {
        if (!country) {
          console.log('FALSE');
        } else {
          console.log(country);
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
    const getLangNumByCont = `select Continent, count(distinct Language) as Languages from country, countrylanguage where country.Code=countrylanguage.CountryCode group by Continent;`;
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
