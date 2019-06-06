var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
});

function handleErrorAndData(error, data) {
  if (error) {
    console.log(error);
  } else {
    console.log(data);
  }
}

connection.connect(error => handleErrorAndData(error, 'MySQL is connected'));

connection.query('CREATE DATABASE IF NOT EXISTS world', error =>
  handleErrorAndData(error, 'World Database is at your service'),
);

connection.query('USE world', error => handleErrorAndData(error, 'World Database is being used'));

const country = `CREATE TABLE IF NOT EXISTS country(
  Code CHAR(3) NOT NULL DEFAULT '',
  Name CHAR(52) NOT NULL DEFAULT '',
  Continent enum('Asia','Europe','North America','Africa','Oceania','Antarctica','South America') NOT NULL DEFAULT 'Asia',
  Region CHAR(26) NOT NULL DEFAULT '',
  SurfaceArea FLOAT(10,2) NOT NULL DEFAULT '0.00',
  IndepYear SMALLINT(6) DEFAULT NULL,
  Population INT(11) NOT NULL DEFAULT '0',
  LifeExpectancy FLOAT(3,1) DEFAULT NULL,
  GNP FLOAT(10,2) DEFAULT NULL,
  GNPOld FLOAT(10,2) DEFAULT NULL,
  LocalName CHAR(45) NOT NULL DEFAULT '',
  GovernmentForm CHAR(45) NOT NULL DEFAULT '',
  HeadOfState CHAR(60) DEFAULT NULL,
  Capital INT(11) DEFAULT NULL,
  Code2 CHAR(2) NOT NULL DEFAULT '',
  PRIMARY KEY (Code)
);`;

connection.query(country, error =>
  handleErrorAndData(error, 'The country table is at your service'),
);

const city = `CREATE TABLE IF NOT EXISTS city(
  ID INT(11) NOT NULL AUTO_INCREMENT,
  Name CHAR(35) NOT NULL DEFAULT '',
  CountryCode CHAR(3) NOT NULL DEFAULT '',
  District CHAR(20) NOT NULL DEFAULT '',
  Population INT(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (ID),
  FOREIGN KEY (CountryCode) REFERENCES country (Code)
)`;

connection.query(city, error => handleErrorAndData(error, 'The city table is at your service'));

function makeQuery(
  column,
  table,
  whereCondition,
  orderCondition,
  table2,
  joinLocation,
  limitation,
) {
  if (column && table && table2 && joinLocation && whereCondition) {
    return connection.query(
      `SELECT ${column} FROM ${table} JOIN ${table2} ON ${joinLocation} WHERE ${whereCondition}`,
      (error, data) => handleErrorAndData(error, data),
    );
  } else if (column && table && whereCondition) {
    return connection.query(
      `SELECT ${column} FROM ${table} WHERE ${whereCondition}`,
      (error, data) => handleErrorAndData(error, data),
    );
  } else if (column && table && orderCondition && limitation) {
    return connection.query(
      `SELECT ${column} FROM ${table} ORDER BY ${orderCondition} LIMIT ${limitation}`,
      (error, data) => handleErrorAndData(error, data),
    );
  } else if (column && table && orderCondition) {
    return connection.query(
      `SELECT ${column} FROM ${table} ORDER BY ${orderCondition}`,
      (error, data) => handleErrorAndData(error, data),
    );
  }
}

//connection.query('SELECT Name FROM country WHERE Population > 8000000',(error, data)=>handleErrorAndData(error, data));
makeQuery('name', 'country', 'population > 8000000');
//connection.query('SELECT Name From country Where Name LIKE "%land%"', (error, data)=>handleErrorAndData(error, data));
makeQuery('Name', 'country', `Name LIKE "%land%"`);
//connection.query(`SELECT Name FROM city WHERE Population > 500000 AND Population < 1000000`, (error, data)=>handleErrorAndData(error, data));
makeQuery('Name', 'city', `Population > 500000 AND Population < 1000000`);
//connection.query('SELECT Name FROM country WHERE Continent = "Europe"', (error, data)=>handleErrorAndData(error, data));
makeQuery('Name', 'country', `Continent ="Europe"`);
//connection.query("SELECT Name From country ORDER BY SurfaceArea DESC", (error,data)=>handleErrorAndData(error, data));
makeQuery('Name', 'country', '', 'SurfaceArea DESC');
// connection.query(
  "SELECT city.Name FROM city JOIN country on country.Code = city.CountryCode WHERE country.Name = 'Netherlands'",
  (error, data) => handleErrorAndData(error, data),
);
makeQuery(
  `city.Name`,
  'city',
  `country.Name = "Netherlands"`,
  '',
  `country`,
  `country.Code = city.CountryCode`,
);
//connection.query("SELECT population FROM city WHERE name = 'Rotterdam'",(error,data)=>handleErrorAndData(error, data));
makeQuery('population', 'city', `name = "Rotterdam"`);
//connection.query("SELECT name FROM country ORDER BY SurfaceArea DESC LIMIT 10", (error,data)=>handleErrorAndData(error, data));
makeQuery(`name`, `country`, '', `Population`, '', '', 10);
//connection.query("SELECT name FROM city ORDER BY Population DESC LIMIT 10", (error,data)=>handleErrorAndData(error, data));
makeQuery(`name`, `city`, '', `Population`, '', '', 10);
connection.query("SELECT population FROM country", (error,data)=> {
  if (error){
    console.log(error)
  } else {
    console.log(data.reduce((acc, elem)=>{return acc + elem.population},0));
  }
});

connection.end();
