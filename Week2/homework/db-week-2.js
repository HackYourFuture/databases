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

program.command('get-capital-of <country>').action(country => {
  const getCapital = `select city.name as Capital from country, city where country.capital = city.id and country.name ='${country}';`;
  execQuery(getCapital).then(capital => {
    console.log(`${JSON.stringify(capital)}`);
  });
});

program.command('get-spoken-language <region>').action(region => {
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

program.command('get-city-number <language>').action(language => {
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

program.command('languages-by-continents').action(langContTable => {
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
