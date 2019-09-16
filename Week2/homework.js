const mysql = require('mysql');
const { promisify } = require('util');
const inquirer = require('inquirer');

// Using virtual ubuntu server on local running mysql instance => 192.168.153.132 IP of VM
const conn = mysql.createConnection('mysql://hyfuser:hyfpassword@192.168.153.132/new_world');

conn.connect();

const runQuery = promisify(conn.query).bind(conn);

//* What is the capital of country X ? (Accept X from user)
const getCapitalName = async () => {
  const question = [
    {
      type: 'input',
      name: 'countryName',
      message: 'Country name?',
    },
  ];
  const { countryName } = await inquirer.prompt(question);
  const result = await runQuery(
    `
    SELECT 
      city.name AS capital
    FROM
      country,
      city
    WHERE
      country.capital = city.id
        AND country.name = ?`,
    countryName,
  );
  if (!result.length) throw new Error('Wrong country name');
  console.log(`The capital city of ${countryName} is ${result[0].capital}`);
};

//* List all the languages spoken in the region Y (Accept Y from user)
const getLangsOfRegion = async () => {
  const question = [
    {
      type: 'input',
      name: 'regionName',
      message: 'Region name?',
    },
  ];
  const { regionName } = await inquirer.prompt(question);
  const result = await runQuery(
    `
    SELECT DISTINCT
      countrylanguage.language
    FROM
      country,
      countrylanguage
    WHERE
      countrylanguage.countrycode = country.code
        AND country.region = ?
    ORDER BY language`,
    regionName,
  );
  if (!result.length) throw new Error('Wrong region name');
  console.log(`The languages spoken in ${regionName} : ${result.map(c => c.language).toString()}`);
};

//*Find the number of cities in which language Z is spoken (Accept Z from user)
const getNumberOfSpokenCities = async () => {
  const question = [
    {
      type: 'input',
      name: 'language',
      message: 'Language?',
    },
  ];
  const { language } = await inquirer.prompt(question);
  const result = await runQuery(
    `
    SELECT 
      countrylanguage.language, COUNT(city.name) numberOfCities
    FROM
      country,
      city,
      countrylanguage
    WHERE
      country.code = city.countrycode
        AND country.code = countrylanguage.countrycode
        AND countrylanguage.language = ?
    GROUP BY language;
    `,
    language,
  );
  if (!result.length) throw new Error('Wrong language');
  console.log(`The count of ${language} spoken cities  : ${result[0].numberOfCities}`);
};

//* Accept the region and language from the user. Are there any countries in this region with the given language as the official language ? If yes, display those countries. If no, display FALSE. E.g. (A) input region : 'Western Europe' and input language : 'Dutch' output should be Belgium and Netherlands (B) input region : 'Western Europe' and input language : 'Hindi' output should be 'FALSE'
const getCountriesOfSpokenLangs = async () => {
  const question = [
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
  const { regionName, language } = await inquirer.prompt(question);
  const result = await runQuery(
    `
    SELECT DISTINCT
      country.name country
    FROM
      country,
      countrylanguage
    WHERE
      countrylanguage.countrycode = country.code
        AND country.region = ?
        AND countrylanguage.language = ?
    ORDER BY country`,
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
const getNumberOfLangsByContinent = async () => {
  const result = await runQuery(
    `
    SELECT 
      country.continent,
    COUNT(countrylanguage.language) AS numberOfLanguages
    FROM
      country,
      countrylanguage
    WHERE
      country.code = countrylanguage.countrycode
    GROUP BY continent
    ORDER BY numberOfLanguages DESC`,
  );

  console.log(result.map(c => `${c.continent} => ${c.numberOfLanguages}`));
};

(async () => {
  try {
    await getCapitalName();
    await getLangsOfRegion();
    await getNumberOfSpokenCities();
    await getCountriesOfSpokenLangs();
    await getNumberOfLangsByContinent();
  } catch (error) {
    console.log(error.message);
  } finally {
    conn.end();
  }
})();
