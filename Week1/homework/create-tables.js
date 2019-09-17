const mySQL = require('mysql');
const connection = mySQL.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'myWorld',
});

connection.connect();

const create_country_query =
  "create table country (Name VARCHAR(20), Continent enum('Asia', 'Europe', 'North America', 'Africa', 'Oceania', 'Antarctica', 'South America'), Region text, Surface_Area float, IndepYear date, Population INT, Life_Expectancy INT(3), GNP float, GNPOld float, Local_Name text, Government VARCHAR(25), Head_Of_State VARCHAR(60), Capital text)";

connection.query(create_country_query, function(error, results, fields) {
  if (error) {
    throw error;
  }
  console.log('your table is' + results);
});

const create_city_query =
  'create table city (id int(10) NOT NULL AUTO_INCREMENT, name varchar(20), country_code char(3), district text, population int, PRIMARY KEY(id))';
connection.query(create_city_query, function(error, results, fields) {
  if (error) {
    throw error;
  }
  console.log('your table is' + results);
});
connection.end();
