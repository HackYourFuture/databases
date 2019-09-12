'use-strict';

const con = require('./connectDatabase').connection;
const pool = require('./connectDatabase').pool;
const countries = require('./country.json').country;
const cities = require('./city.json').city;

class Database {
  async createDatabase(db) {
    try {
      await con.query(`CREATE DATABASE IF NOT EXISTS ${db}`);
      console.log('world database is created and selected successfully');
    } catch (e) {
      console.log('world database could not create', e.stack);
    } finally {
      con.end();
    }
  }
}

class CountrySQL {
  async createCountriesTable() {
    try {
      const q = `CREATE TABLE IF NOT EXISTS countries (
      Code VARCHAR(3) PRIMARY KEY,
      Name VARCHAR(60) CHARACTER SET utf8mb4,
      Continent VARCHAR(60),
      Region VARCHAR(60),
      SurfaceArea FLOAT,
      IndepYear INT,
      Population INT,
      LifeExpectancy FLOAT,
      GNP FLOAT,
      GNPOld FLOAT,
      LocalName VARCHAR(60) CHARACTER SET utf8mb4,
      GovernmentForm VARCHAR(60),
      HeadOfState VARCHAR(80) CHARACTER SET utf8mb4,
      Capital varchar(80),
      Code2 VARCHAR(2)
    );`;

      await pool.query(q);
      console.log('Countries table is created successfully');
    } catch (e) {
      console.log('Countries table could not created', e.stack);
    }
  }

  async insertCountries() {
    try {
      countries.forEach(async country => {
        const q = `INSERT INTO countries SET Code=?, Name=?, Continent=?, 
          Region=?, SurfaceArea=?, IndepYear=?, Population=?, 
          LifeExpectancy=?, GNP=?, GNPOld=?, LocalName=?, GovernmentForm=?, 
          HeadOfState=?, Capital=?, Code2=?`;

        await pool.query(q, [
          country.Code,
          country.Name,
          country.Continent,
          country.Region,
          country.SurfaceArea,
          country.IndepYear,
          country.Population,
          country.LifeExpectancy,
          country.GNP,
          country.GNPOld,
          country.LocalName,
          country.GovernmentForm,
          country.HeadOfState,
          country.Capital,
          country.Code2,
        ]);
      });

      console.log('Countries datas are inserted successfully');
    } catch (e) {
      console.log('Countries table could not created', e.stack);
    }
  }
}

class CitySQL {
  async createCitiesTable() {
    try {
      const q = `CREATE TABLE IF NOT EXISTS cities (
        ID INT AUTO_INCREMENT PRIMARY KEY,
        Name VARCHAR(60) CHARACTER SET utf8mb4,
        CountryCode VARCHAR(60),
        District VARCHAR(60) CHARACTER SET utf8mb4,
        Population INT   
      );`;

      await pool.query(q);
      console.log('Cities table is created successfully');
    } catch (e) {
      console.log('Cities table could not create ' + e.stack);
    }
  }

  async insertCities() {
    try {
      cities.forEach(async city => {
        const q = 'INSERT INTO cities SET Name=?, CountryCode=?, District=?, Population=?';
        await pool.query(q, [city.Name, city.CountryCode, city.District, city.Population]);
      });
      console.log('Cities datas are inserted successfully');
    } catch (e) {
      console.log('Cities data could not insert ' + e.stack);
    }
  }
}

const database = new Database();
const country = new CountrySQL();
const city = new CitySQL();

module.exports = { database, country, city };
