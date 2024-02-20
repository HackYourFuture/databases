import db from '../util/world_dbConnection.js';

function getCountryWithPopulationGreaterThan8Million() {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT name FROM country WHERE population > 8000000',
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}

function getCountryWithLandInName() {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT name FROM country WHERE name LIKE "%land%"',
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}

function getCitiesWithPopulationBetween500kAnd1M() {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT name FROM city WHERE population BETWEEN 500000 AND 1000000',
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}

function getCountriesInEurope() {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT name FROM country WHERE continent = "Europe"',
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}

function getCountriesBySurfaceArea() {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT name FROM country ORDER BY surfacearea DESC',
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}

function getCitiesInNetherlands() {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT name FROM city WHERE countrycode = "NLD"',
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}

function getPopulationOfRotterdam() {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT population FROM city WHERE name = "Rotterdam"',
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}

function getTop10CountriesBySurfaceArea() {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT name FROM country ORDER BY surfacearea DESC LIMIT 10',
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}

function getTop10MostPopulatedCities() {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT name FROM city ORDER BY population DESC LIMIT 10',
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}

function getPopulationOfTheWorld() {
  return new Promise((resolve, reject) => {
    db.query('SELECT SUM(population) FROM country', (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

export {
  getCountryWithPopulationGreaterThan8Million,
  getCountryWithLandInName,
  getCitiesWithPopulationBetween500kAnd1M,
  getCountriesInEurope,
  getCountriesBySurfaceArea,
  getCitiesInNetherlands,
  getPopulationOfRotterdam,
  getTop10CountriesBySurfaceArea,
  getTop10MostPopulatedCities,
  getPopulationOfTheWorld,
};
