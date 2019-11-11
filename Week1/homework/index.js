'use strict';

const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const { promisify } = require('util');

const app = express();
app.use(bodyParser.json());

const data = require('./cities.json');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'new_world',
});

connection.connect();

const createCountries = `CREATE TABLE countries (
  Name varchar(254) ,
  Continent varchar(50),
  Region varchar(50) ,
  SurfaceArea float(2) ,
  IndepYear varchar(50),
  Population float(2)  ,
  LifeExpectancy varchar(50) ,
  GNP varchar(50) ,
  GNPOld varchar(50) ,
  LocalName varchar(50),
  GovernmentForm varchar(50),
  HeadOfState varchar(50) ,
  Capital varchar(50)
);`;

const createCities = `CREATE TABLE cities(
  ID int NOT NULL AUTO_INCREMENT,
  Name varchar(50),
  CountryCode varchar(50),
  District varchar (50),
  Population int,
  PRIMARY KEY (ID)
);`;

app.get('/createDatabase', (req, res) => {
  connection.query('CREATE DATABASE world;', (error, results, fields) => {
    if (error) {
      console.log(error);
      res.send(`Database hasn't created ${error}`);
      connection.end();
    }
    console.log(`Database created`);
    res.send(`Database created`);
  });
});

app.put('/createCountries', (req, res) => {
  connection.query(createCountries, (error, results, fields) => {
    if (error) {
      console.log(error);
      res.send(`Table hasn't created ${error}`);
      connection.end();
    }
    console.log(`Table created`);
    res.send(`Table created`);
  });
});

app.put('/createCities', (req, res) => {
  connection.query(createCities, (error, results, fields) => {
    if (error) {
      console.log(error);
      res.send(`Table hasn't created ${error}`);
      connection.end();
    }
    console.log(`Table created`);
    res.send(`Table created`);
  });
});

app.post('/appendCountries', async (req, res) => {
  try {
    const { countries } = data;
    for (const country of countries) {
      const try1 = `INSERT INTO countries VALUES('${country.name}', '${country.continent}', '${country.region}', '${country.surface_area}', ' ${country.indep_year}', ' ${country.population}', ' ${country.life_expectancy}', ' ${country.gnp}', ' ${country.gnp_old}', ' ${country.local_name}', ' ${country.government_form}', ' ${country.head_of_state}', ' ${country.capital}');`;
      await connection.query(try1, (error, results, fields) => {
        if (error) {
          console.log(`Table hasn't values ${error}`);
        }
      });
    }
    console.log('Table has values ');
    res.write(`Success `);
  } catch (err) {
    res.write(`Error: ${err}`);
  }
  res.write(`Table has values`);
  res.end();
});

app.post('/appendCities', async (req, res) => {
  try {
    const { cities } = data;
    for (const city of cities) {
      const try1 = `INSERT INTO cities values(NULL, '${city.name}', '${city.country_code}', '${city.district}', ' ${city.population}'); `;
      await connection.query(try1, (error, results, fields) => {
        if (error) {
          console.log(`Table hasn't values ${error}`);
          res.write(`Table hasn't values ${error}`);
          res.end();
        }
      });
    }
    console.log('Table has values ');
    res.write(`Success `);
  } catch (err) {
    res.write(err);
  }
  res.write(`Table has values`);
  res.end();
});

app.get('/greaterThan8m', (req, res) => {
  connection.query(
    'SELECT * FROM countries WHERE Population >= 8000000;',
    (error, results, fields) => {
      if (error) {
        console.log(error);
        connection.end();
      }
      console.log(`Cities logged`);
      res.send(results);
    },
  );
});

app.get('/haveLandName', (req, res) => {
  connection.query(
    `SELECT * FROM countries WHERE countries.Name like "%land%" ;`,
    (error, results, fields) => {
      if (error) {
        console.log(error);
        connection.end();
      } else {
        console.log(`Cities name with "land"`);
        res.send(results);
      }
    },
  );
});

app.get('/cityPopulation', (req, res) => {
  connection.query(
    `SELECT * FROM cities WHERE cities.Population between 500000 and 1000000;`,
    (error, results, fields) => {
      if (error) {
        console.log(error);
        connection.end();
      } else {
        console.log(`Cities that have population in between 500,000 and 1 million`);
        res.send(results);
      }
    },
  );
});

app.get('/countryContinent', (req, res) => {
  connection.query(
    `SELECT * FROM countries WHERE countries.Continent = "Europe";`,
    (error, results, fields) => {
      if (error) {
        console.log(error);
        connection.end();
      } else {
        console.log(`Cities that have population in between 500,000 and 1 million`);
        res.send(results);
      }
    },
  );
});

app.get('/surface_area', (req, res) => {
  connection.query(
    `SELECT * FROM countries ORDER BY SurfaceArea DESC;`,
    (error, results, fields) => {
      if (error) {
        console.log(error);
        connection.end();
      } else {
        console.log(`Cities that have population in between 500,000 and 1 million`);
        res.send(results);
      }
    },
  );
});

app.listen(3000, err => {
  if (err) {
    console.log('Localhost is not work');
  } else {
    console.log('Server started on localhost 3000');
  }
});
