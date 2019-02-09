const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser2',
  password: 'class18password',
  database: 'new_world2',
});

const execQuery = util.promisify(connection.query.bind(connection));

const command = process.argv[2];
const command1 = process.argv[3];

async function capitalFinder() {
  connection.connect();
  try {
    const test = await execQuery(
      `select capital,country_name from countries where country_name = ?`,
      command1,
    );
    console.log(test[0].capital);
  } catch (error) {
    console.error(error);
  }
  connection.end();
}

async function spokenLang() {
  connection.connect();
  try {
    const test = await execQuery(
      ` select cities.language,continent from cities left join countries on cities.country_id=countries.id where countries.continent=?`,
      command1,
    );
    test.filter(lang => {
      console.log(lang.language);
    });
  } catch (error) {
    console.log(error);
  }
  connection.end();
}

async function citiesAndSpokenLanguage() {
  connection.connect();
  try {
    const test = await execQuery(`select count(city_name) from cities where language=?`, command1);
    const wow = test[0];
    console.log(Object.values(wow));
  } catch (error) {
    console.log(error);
  }
  connection.end();
}

async function countriesAndLanguages() {
  connection.connect();
  try {
    const test = await execQuery(`
    select country,language,countries.continent from cities left join countries on cities.country_id=countries.id group by country;
    `);
    test.forEach(elem => {
      if (elem.language === command1) {
        console.log(elem.country);
      }
    });
  } catch (error) {
    console.log(error);
  }
  connection.end();
}

async function answerQuestion5() {
  connection.connect();
  try {
    const test = await execQuery(
      `select continent,count(cities.language) from countries left join cities on countries.id=cities.country_id group by continent having continent=?`,
      command1,
    );
    console.log(Object.values(test[0]));
  } catch (error) {
    console.log(error);
  }
  connection.end();
}

switch (command) {
  case 'capital_of':
    capitalFinder();
    break;
  case 'regionLanguage':
    spokenLang();
    break;
  case 'citiesLanguage':
    citiesAndSpokenLanguage();
    break;
  case 'question4':
    countriesAndLanguages();
    break;
  case 'question5':
    answerQuestion5();
    break;
}
