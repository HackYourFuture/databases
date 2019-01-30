'use strict';

const mysql = require('mysql');
const util = require('util');
const countries = require('./countries');
const cities = require('./cities');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  const CREATE_COUNTRIES_TABLE = `
    CREATE TABLE IF NOT EXISTS countries (
      name VARCHAR(50),
      continent text,
      population INT,
      surface_area INT,
      PRIMARY KEY (name)
    );`;
  const CREATE_CITIES_TABLE = `
    CREATE TABLE IF NOT EXISTS cities (
      name VARCHAR(50),
      country text,
      population INT,
      PRIMARY KEY (name)
    );`;

  connection.connect();

  try {
    await execQuery('create database if not exists world');
    await execQuery('use world');
    await execQuery(CREATE_COUNTRIES_TABLE);
    await execQuery(CREATE_CITIES_TABLE);
    countries.forEach(async country => {
      await execQuery('INSERT INTO countries SET ?', country);
    });
    cities.forEach(async city => {
      await execQuery('INSERT INTO cities SET ?', city);
    });
  } catch (error) {
    console.error(error);
  }

  connection.end();
}

seedDatabase();
