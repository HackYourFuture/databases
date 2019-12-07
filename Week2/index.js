const mysql = require('mysql');
const { promisify } = require('util');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
});

connection.connect();

const runQuery = promisify(connection.query).bind(connection);

// What is the capital of country X ?
const capitalName = async () => {
  const ask = [
    {
      type: 'input',
      name: 'countryName',
      message: 'Country name?',
    },
  ];
  const { countryName } = await inquirer.prompt(ask);
  const result = await runQuery(
    `
    SELECT city.name AS capital FROM country, city WHERE country.capital = city.id AND country.name = ?`,
    countryName,
  );
  if (!result.length) throw new Error('Wrong country name !!!');
  console.log(`${countryName} is ${result[0].capital}`);
};


// List all the languages spoken in the region Y
const langsOfRegion = async () => {
  const ask = [
    {
      type: 'input',
      name: 'regionName',
      message: 'Region name?',
    },
  ];
  const { regionName } = await inquirer.prompt(ask);
  const result = await runQuery(
    `
    SELECT DISTINCT countrylanguage.language FROM country, countrylanguage WHERE countrylanguage.countrycode = country.code AND country.region = ? ORDER BY language`,
    regionName,
  );
  if (!result.length) throw new Error('Wrong region name');
  console.log(`The languages spoken in ${regionName} : ${result.map(c => c.language).toString()}`);
};

//Find the number of cities in which language Z is spoken
const numberOfSpokenCities = async () => {
  const ask = [
    {
      type: 'input',
      name: 'language',
      message: 'Language?',
    },
  ];
  const { language } = await inquirer.prompt(ask);
  const result = await runQuery(
    `
    SELECT COUNT(city.name) numberOfCities FROM city, countrylanguage WHERE city.countrycode = countrylanguage.countrycode AND countrylanguage.language = ?`,
    language,
  );
  if (!result.length) throw new Error('Wrong language');
  console.log(`The count of ${language} spoken cities  : ${result[0].numberOfCities}`);
};

//* Accept the region and language from the user. Are there any countries in this region with the given language as the official language ? If yes, display those countries. If no, display FALSE. E.g. (A) input region : 'Western Europe' and input language : 'Dutch' output should be Belgium and Netherlands (B) input region : 'Western Europe' and input language : 'Hindi' output should be 'FALSE'
const countriesOfSpokenLangs = async () => {
  const ask = [
    {
      type: 'input',
      name: 'regionName',
      message: 'Region name?',
    },
    {
      type: 'input',
      name: 'language',
      message: 'Language?',
    },
  ];
  const { regionName, language } = await inquirer.prompt(ask);
  const result = await runQuery(
    `
    SELECT DISTINCT country.name country FROM country, countrylanguage WHERE countrylanguage.countrycode = country.code AND country.region = ? 
    AND countrylanguage.language = ? ORDER BY country`,
    [regionName, language],
  );
  console.log(
    result.length
      ? `The ${language} spoken countries in ${regionName} : ${result
          .map(c => c.country)
          .toString()}`
      : 'FALSE',
  );
};

//* List all the continents with the number of languages spoken in each continent
const numberOfLangsByContinent = async () => {
  const result = await runQuery(
    `
    SELECT country.continent, COUNT(distinct countrylanguage.language) AS numberOfLanguages FROM country, countrylanguage WHERE
    country.code = countrylanguage.countrycode GROUP BY continent ORDER BY numberOfLanguages DESC`,
  );

  console.log(result.map(c => `${c.continent} => ${c.numberOfLanguages}`));
};

(async () => {
  try {
    await capitalName();
    await langsOfRegion();
    await numberOfSpokenCities();
    await countriesOfSpokenLangs();
    await numberOfLangsByContinent();
  } catch (error) {
    console.log(error.message);
  } finally {
    connection.end();
  }
})();