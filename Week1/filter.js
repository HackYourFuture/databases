//the file hw.js should be execute first so the table exist when we execute this one;
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
});

function insert(data, add) {
  connection.query(data, (error, result, fields) => {
    if (error) throw error;
    console.log(`we add ${add}`);
  });
}
//answer for question num 1
connection.connect();

const createNewTable =
  'CREATE TABLE IF NOT EXISTS population_query (population INT,country_name TEXT)';
insert(createNewTable, 'table1');

const filteredData =
  'INSERT INTO population_query(population,country_name) SELECT population,country_name FROM country WHERE population >= 8000000';
insert(filteredData, 'raw to table 1');

// //answer for question num 2
const createNewTable1 = 'CREATE TABLE IF NOT EXISTS land_query (land TEXT)';
insert(createNewTable1, `table2`);
const filteredData1 =
  "INSERT INTO land_query(land) SELECT country_name FROM country WHERE country_name LIKE '%land'";
insert(filteredData1, `raw to table2`);

//answer for question num 3
const createCitiesTable = `CREATE TABLE IF NOT EXISTS city_population (population INT,city_name TEXT)`;
insert(createCitiesTable, `table3`);
const filteredData2 = `INSERT INTO city_population(population,city_name) SELECT population,city_name FROM city WHERE population BETWEEN 500000 AND 1000000`;
insert(filteredData2, `raw to table3`);

//answer for question num 4
const europeContinent = `CREATE TABLE IF NOT EXISTS europe_continent (country_name text,continent TEXT)`;
insert(europeContinent, `table4`);
const filteredData3 = `INSERT INTO europe_continent(country_name,continent) SELECT country_name,continent FROM country WHERE continent LIKE 'europe'`;
insert(filteredData3, `raw to table4`);

//answer for question num 5
const descendingSurface = `CREATE TABLE IF NOT EXISTS descending_surface (country_name TEXT,surface_area INT)`;
insert(descendingSurface, `table5`);
const filteredData4 = `INSERT INTO descending_surface(country_name,surface_area) SELECT country_name,surface_area FROM country ORDER BY surface_area DESC`;
insert(filteredData4, `raw to table5`);

//answer for question num 6
const nlCities = `CREATE TABLE IF NOT EXISTS nl_cities(country TEXT,city_name TEXT)`;
insert(nlCities, `table6`);
const filteredData5 = `INSERT INTO nl_cities(country,city_name) SELECT country,city_name FROM city WHERE country LIKE 'Nederland'`;
insert(filteredData5, `raw to table6`);

//answer for question num 7
const rotterdamPopulation = `CREATE TABLE IF NOT EXISTS Rotterdam_population (city_name TEXT,population INT)`;
insert(rotterdamPopulation, `table7`);
const filteredData6 = `INSERT INTO Rotterdam_population(city_name,population) SELECT city_name,population FROM city WHERE city_name LIKE 'Rotterdam' `;
insert(filteredData6, `raw to table7`);

//answer for question num 9
const cityPopulation = `CREATE TABLE IF NOT EXISTS top_city_population (city_name TEXT,population INT)`;
insert(cityPopulation, `table9`);
const filteredData8 = `INSERT INTO top_city_population(city_name,population) SELECT city_name,population FROM city ORDER BY population DESC`;
insert(filteredData8, `raw to table8`);

//answer for question 10
const worldPopulation = `CREATE TABLE IF NOT EXISTS world_population (population DECIMAL)`;
insert(worldPopulation, `table19`);
const filteredData10 = `INSERT INTO world_population(population) SELECT SUM(population) FROM country `;
insert(filteredData10, `raw to table9`);
connection.end();
