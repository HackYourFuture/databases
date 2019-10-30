'use strict';

{
  const { promisify } = require('util');
  const mysql = require('mysql');

  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
  });

  const executeQuery = promisify(connection.query.bind(connection));

  async function initDatabase() {
    const CREATE_DB = `create database if not exists world`;
    const USE_DB = `use world`;
    const CREATE_COUNTRY_TABLE = `create table  country ( 
    ID int not null auto_increment primary key,
    Name varchar(50), 
    Continent enum('Asia', 'Europe', 'Africa', 'Antarctica', 'Australia/Oceania', 'North America', 'South America'),
    Region varchar(50), 
    SurfaceArea float, 
    IndepYear int,
    Population int,
    LifeExpectancy float,
    GNP float,
    GNPOld float,
    LocalName varchar(50),
    GovernmentForm varchar(50),
    HeadOfState varchar(50),
    Capital varchar(50)
    )`;
    const CREATE_CITY_TABLE = `create table if not exists city (
      ID int not null auto_increment primary key,
      Name varchar(50),
      CountryCode varchar(4),
      District varchar(50),
      Population int
      )`;
    connection.connect(error => {
      if (!error) {
        console.log(`Successfully connected to the mysql server.`);
      } else {
        console.error(
          `There was an error connecting to the server: ${error.code} - ${error.message}`,
        );
        // couldn't connect to the mysql server so exit the process.
        process.exit();
      }
    });
    try {
      await executeQuery(CREATE_DB);
      await executeQuery(USE_DB);
      await executeQuery(CREATE_COUNTRY_TABLE);
      await executeQuery(CREATE_CITY_TABLE);
    } catch (error) {
      console.log(`${error.code} - ${error.message}`);
    }
    connection.end();
  }
  

  initDatabase();
}
