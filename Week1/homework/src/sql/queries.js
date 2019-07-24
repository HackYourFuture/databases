const getData = require('../data/getData');

const CREATE_DB = dbName => `CREATE DATABASE IF NOT EXISTS ${dbName}`;

const USE_DB = dbName => `USE ${dbName}`;

const CREATE_TABLE_CITIES = `CREATE TABLE IF NOT EXISTS cities (
  id INT NOT NULL, 
  name VARCHAR(35) NOT NULL DEFAULT '', 
  country_code VARCHAR(3) NOT NULL,  
  district VARCHAR(20) NOT NULL DEFAULT '', 
  population INT NOT NULL DEFAULT 0,
  PRIMARY KEY(id),
  FOREIGN KEY(country_code) REFERENCES countries(code)
  )`;

const CREATE_TABLE_COUNTRIES = `CREATE TABLE IF NOT EXISTS countries (
    code VARCHAR(3) NOT NULL,
    name VARCHAR(52) NOT NULL DEFAULT '',
    continent ENUM('Asia','Europe','North America','Africa','Oceania','Antarctica','South America') NOT NULL DEFAULT 'Asia',
    region VARCHAR(26) NOT NULL DEFAULT '',
    surface_area FLOAT NOT NULL DEFAULT 0.00,
    indep_year SMALLINT DEFAULT NULL,
    population INT NOT NULL DEFAULT 0,
    life_expectancy FLOAT DEFAULT NULL,
    gnp FLOAT DEFAULT NULL,
    gnp_old FLOAT DEFAULT NULL,
    local_name VARCHAR(45) NOT NULL DEFAULT '',
    government_form VARCHAR(45) NOT NULL DEFAULT '',
    head_of_state VARCHAR(60) DEFAULT NULL,
    capital INT DEFAULT NULL,
    code2 VARCHAR(2),
    PRIMARY KEY(code)
    )`;

const INSERT_TABLE = (tableName, columns) => `INSERT INTO ${tableName} (${columns}) VALUES ?`;

module.exports = {
  CREATE_DB,
  USE_DB,
  CREATE_TABLE_CITIES,
  CREATE_TABLE_COUNTRIES,
  INSERT_TABLE
};
