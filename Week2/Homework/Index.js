const prompts = require('prompts');
const util = require('util');
var mysql = require('mysql');

async function ask(messageText) {
  let response = await prompts({
    type: 'text',
    name: 'answer',
    message: messageText,
  });

  return response.answer;
}

async function askCapital() {
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'new_world',
  });
  var city = await ask("What is the country you like to know it's capital");
  const execQuery = util.promisify(connection.query.bind(connection));
  var select_query =
    'select country.Name from country INNER JOIN city on country.Capital = city.ID where city.Name = "' +
    city +
    '"';

  connection.connect();
  try {
    result = await execQuery(select_query);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
  connection.end();
}

async function askRegionLanaguage() {
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'new_world',
  });
  var region = await ask(
    'What is the region, select from the following regions \n | Caribbean                 |\n | Southern and Central Asia | \n | Central Africa            | \n | Southern Europe           | \n | Middle East               | \n | South America             | \n | Polynesia                 | \n | Antarctica                | \n | Australia and New Zealand | \n | Western Europe            | \n | Eastern Africa            | \n | Western Africa            | \n | Eastern Europe            | \n | Central America           | \n | North America             | \n | Southeast Asia            | \n | Southern Africa           | \n | Eastern Asia              | \n | Nordic Countries          | \n | Northern Africa           | \n | Baltic Countries          | \n | Melanesia                 | \n | Micronesia                | \n | British Islands           | \n | Micronesia/Caribbean	    | \n'
  );
  const execQuery = util.promisify(connection.query.bind(connection));
  var select_query =
    'select Distinct countrylanguage.Language from countrylanguage inner join country on countrylanguage.CountryCode = country.Code and country.Region ="' +
    region +
    '" order by Language';

  connection.connect();
  try {
    result = await execQuery(select_query);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
  connection.end();
}

async function askNumberofCity() {
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'new_world',
  });
  var language = await ask('How many cities speaks the following language: ');

  const execQuery = util.promisify(connection.query.bind(connection));
  var select_query =
    'select count(city.Name) from city inner join country on city.CountryCode = country.Code  inner join countrylanguage on countrylanguage.CountryCode = country.Code and countrylanguage.Language = "' +
    language +
    '"';
  connection.connect();
  try {
    result = await execQuery(select_query);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
  connection.end();
}

async function getContinent() {
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'new_world',
  });

  const execQuery = util.promisify(connection.query.bind(connection));
  var select_query =
    'select country.Continent as continent, countrylanguage.Language as language from country inner join countrylanguage on country.code = countrylanguage.CountryCode order by continent';
  connection.connect();
  try {
    result = await execQuery(select_query);
    console.log(
      '--------------------------Continent and Language-----------------------------------'
    );
    console.log(result);
  } catch (error) {
    console.error(error);
  }
  connection.end();
}

async function main() {
  await askCapital();
  await askRegionLanaguage();
  await askNumberofCity();
  getContinent();
}

main();
