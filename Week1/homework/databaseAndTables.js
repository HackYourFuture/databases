'use strict';

// DATABASE
const DATABASE_WORLD = `CREATE DATABASE IF NOT EXISTS world`;

// COUNTRIES TABLE
const COUNTRIES_TABLE =
  'CREATE TABLE IF NOT EXISTS countries (country_name VARCHAR(40) NOT NULL, country_code INT NOT NULL, country_population FLOAT NOT NULL, continent VARCHAR(20) NOT NULL, surface_areas FLOAT NOT NULL)';

// CITIES TABLE
const CITIES_TABLE =
  'CREATE TABLE IF NOT EXISTS cities (city_name VARCHAR(20) NOT NULL, country_Abbreviation_code VARCHAR(3) NOT NULL, city_population FLOAT NOT NULL)';

module.exports = {
  DATABASE_WORLD,
  COUNTRIES_TABLE,
  CITIES_TABLE,
};
