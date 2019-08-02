const USE = dbName => `USE ${dbName};`;

const CREATE_TABLE_COUNTRY = `CREATE TABLE IF NOT EXISTS countries (
  code CHAR(3) NOT NULL DEFAULT '',
  name CHAR(52) NOT NULL DEFAULT '',
  continent ENUM('Asia','Europe','North America','Africa','Oceania','Antarctica','South America') NOT NULL DEFAULT 'Asia',
  region CHAR(26) NOT NULL DEFAULT '',
  surface_area FLOAT(10,2) NOT NULL DEFAULT '0.00',
  indep_year SMALLINT(6) DEFAULT NULL,
  population INT(11) NOT NULL DEFAULT '0',
  life_expectancy FLOAT(3,1) DEFAULT NULL,
  gnp FLOAT(10,2) DEFAULT NULL,
  gnp_old FLOAT(10,2) DEFAULT NULL,
  local_name CHAR(45) NOT NULL DEFAULT '',
  government_form CHAR(45) NOT NULL DEFAULT '',
  head_of_state CHAR(60) DEFAULT NULL,
  capital INT(11) DEFAULT NULL,
  code2 CHAR(2) NOT NULL DEFAULT '',
  PRIMARY KEY (code)
)`;

const CREATE_TABLE_CITY = `CREATE TABLE IF NOT EXISTS cities (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name CHAR(35) NOT NULL DEFAULT '',
  country_code CHAR(3) NOT NULL DEFAULT '',
  district CHAR(20) NOT NULL DEFAULT '',
  population INT(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (id),
  FOREIGN KEY (country_code) REFERENCES countries (code)
)`;

const CREATE_TABLE_LANGUAGE = `CREATE TABLE IF NOT EXISTS languages (
  country_code CHAR(3) NOT NULL DEFAULT '',
  language CHAR(30) NOT NULL DEFAULT '',
  is_official enum('T','F') NOT NULL DEFAULT 'F',
  percentage FLOAT(4,1) NOT NULL DEFAULT '0.0',
  PRIMARY KEY (country_code, language),
  FOREIGN KEY (country_code) REFERENCES countries (code)
)`;

module.exports = {
  USE,
  CREATE_TABLE_CITY,
  CREATE_TABLE_COUNTRY,
  CREATE_TABLE_LANGUAGE
};
