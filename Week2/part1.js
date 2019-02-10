const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world'
});

const execQuery = util.promisify(connection.query.bind(connection));

async function cityCapital(country) {
  const main = connection.escape(country);
  try {
    const result = await execQuery('select city.name from city, country where city.id = country.capital and country.name =' + main);
    console.log(result);
  } catch (error) {
    throw error;
  }
}
cityCapital('Turkey');

async function languages(region) {
  const main = connection.escape(region);
  try {
    const result = await execQuery('select language from countrylanguage where countrylanguage.CountryCode = country.Code and countyr.region = ' + main);
    console.log(result)

  } catch (error) {
    throw error;
  }
}
languages('india');

async function noOfCities(language) {
  const main = connection.escape(language);
  try {
    const result = await execQuery('select count(name) from city where city,countryCode = countryLanguage.countryCode and language = ' + main);
    console.log(result)

  } catch (error) {
    throw error;
  }
}
noOfCities('Taiwan');


async function officialLanguage(language) {
  const main = connection.escape(language);
  try {
    const result = await execQuery('select name from country join countrylanguage on country.code = countrylanguage.countryCode where is Official = "T" and Language = ' + main);
    if (result.length > 0) {
      console.log(result);
    } else {
      console.log(false);
    }
  } catch (error) {
    throw error;
  }
}
officialLanguage('english');



async function listContinents() {
  try {
    const result = await execQuery('select continent, count(language) from country join countrylanguage on country.code = countrylanguage.countrycode group by continent');
    console.log(result)

  } catch (error) {
    throw error;
  }
}
listContinents();