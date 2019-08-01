const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'ghufran',
  password: 'deiri',
  database: 'world',
});

connection.connect();

const cb = function(error, results, fields) {
  if (error) {
    throw error;
  }
};

connection.query('CREATE DATABASE IF NOT EXISTS new_world', cb());

connection.query('use new_world', cb());

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
  cb(),
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
  cb(),
);

connection.query(
  ` CREATE TABLE IF NOT EXISTS countrylanguage (
    Country_Code CHAR(3) NOT NULL DEFAULT '',
    Language CHAR(30) NOT NULL DEFAULT '',
    IsOfficial enum('T','F') NOT NULL DEFAULT 'F',
    Percentage FLOAT(4,1) NOT NULL DEFAULT '0.0',
    PRIMARY KEY (Country_Code,Language),
    KEY Country_Code (Country_Code),
    CONSTRAINT countryLanguage_ibfk_1 FOREIGN KEY (Country_Code) REFERENCES country (Code)
  )`,
  cb(),
);

connection.end();
