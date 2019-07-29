const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'ghufran',
  password: 'deiri',
  database: 'userdb',
});

function handleErrorAndData(data, error) {
  if (error) {
    console.error('error connecting: ' + error.stack);
    return;
  }

  console.log(data);
}

connection.connect(handleErrorAndData('Successfully connected!'));

connection.query('CREATE DATABASE IF NOT EXISTS world', handleErrorAndData('Query OK'));

connection.query('use world', handleErrorAndData('Database changed'));

connection.query(
  ` CREATE TABLE IF NOT EXISTS country (
    Code CHAR(3) NOT NULL DEFAULT '',
    Name CHAR(52) NOT NULL DEFAULT '',
    Continent enum('Asia','Europe','North America','Africa','Oceania','Antarctica','South America') NOT NULL DEFAULT 'Asia',
    Region CHAR(26) NOT NULL DEFAULT '',
    Surface_Area FLOAT(10,2) NOT NULL DEFAULT '0.00',
    Indep_Year SMALLINT(6) DEFAULT NULL,
    Population INT(11) NOT NULL DEFAULT '0',
    Life_Expectancy FLOAT(3,1) DEFAULT NULL,
    GNP FLOAT(10,2) DEFAULT NULL,
    GNPOld FLOAT(10,2) DEFAULT NULL,
    Local_Name CHAR(45) NOT NULL DEFAULT '',
    Government_Form CHAR(45) NOT NULL DEFAULT '',
    Head_Of_State CHAR(60) DEFAULT NULL,
    Capital INT(11) DEFAULT NULL,
    Code2 CHAR(2) NOT NULL DEFAULT '',
    PRIMARY KEY (Code)
  )`,
  handleErrorAndData('Query OK'),
);

connection.query(
  ` CREATE TABLE IF NOT EXISTS city (
    ID INT(11) NOT NULL AUTO_INCREMENT,
    Name CHAR(35) NOT NULL DEFAULT '',
    Country_Code CHAR(3) NOT NULL DEFAULT '',
    District CHAR(20) NOT NULL DEFAULT '',
    Population INT(11) NOT NULL DEFAULT '0',
    PRIMARY KEY (ID),
    FOREIGN KEY (Country_Code) REFERENCES country (Code)
  )`,
  handleErrorAndData('Query OK'),
);

const queries = [
  'SELECT country.Name FROM country WHERE country.Population > 8000000',
  "SELECT country.Name FROM country WHERE Name LIKE '%land%'",
  'SELECT city.Name FROM city WHERE Population < 500000 AND Population > 1000000',
  "SELECT country.Name FROM country WHERE Continent = 'Europe'",
  'SELECT country.Name FROM country ORDER BY Surface_Area DESC',
  'SELECT city.Name FROM city WHERE Country_Code = "NLD"',
  'SELECT city.Population FROM city WHERE Name = "Rotterdam"',
  'SELECT country.Name FROM country ORDER BY Surface_Area DESC LIMIT 10',
  'SELECT city.Name FROM city ORDER BY Population DESC LIMIT 10',
  'SELECT SUM(Population) FROM country',
];
for (const i in queries) {
  console.log('Going to run ', queries[i]);
  connection.query(queries[i], function(error, results, fields) {
    if (error) {
      throw error;
    }
    console.log('the reply is ', results);
  });
}

connection.end();
