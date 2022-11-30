import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "new_world",
});

connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

// Select contries having population greater than 8 million
export const queries = (req, res) => {
  const population = 8000000;
  const sql = `SELECT Name FROM country WHERE population > ${population}`;
  const query = connection.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send(results);
  });
};

// Select contries that have word 'land' in its name
export const includingland = (req, res) => {
  const word = "land";
  const sql = `SELECT Name FROM country WHERE Name LIKE "%${word}%"`;
  const query = connection.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send(results);
  });
};

// Select cities having population between 500000 and 1 millio
export const cityPopulation = (req, res) => {
  const min_population = 500000;
  const max_population = 1000000;
  const sql = `SELECT Name FROM city WHERE population BETWEEN ${min_population} AND ${max_population}`;
  const query = connection.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send(results);
  });
};

// Select contries on  the continent ‘Europe’
export const countiesOnEu = (req, res) => {
  const continent = "Europe";
  const sql = `SELECT Name FROM country WHERE Continent ="${continent}"`;
  const query = connection.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send(results);
  });
};

// List all the countries in the descending order of their surface areas.’
export const surfaceAreas = (req, res) => {
  const sql = `SELECT Name FROM country ORDER BY SurfaceArea DESC`;
  const query = connection.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send(results);
  });
};

// names of all the cities in the Netherlands?
export const citiesInNetherlands = (req, res) => {
  const land_code = "NLD";
  const sql = `SELECT Name FROM city WHERE CountryCode ="${land_code}"`;
  const query = connection.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send(results);
  });
};

//the population of Rotterdam?
export const populationOfRotterdam = (req, res) => {
  const city_name = "Rotterdam";
  const sql = `SELECT Population FROM city WHERE name ="${city_name}"`;
  const query = connection.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send(results);
  });
};

// top 10 countries by Surface Area?
export const topSurfaceCountries = (req, res) => {
  const sql = `SELECT Name FROM country ORDER BY SurfaceArea DESC LIMIT 10`;
  const query = connection.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send(results);
  });
};

// top 10 most populated cities
export const topCityPopulation = (req, res) => {
  const sql = `SELECT Name FROM city ORDER BY Population DESC`;
  const query = connection.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send(results);
  });
};

//the population number of the world
export const sumWorldPopulation = (req, res) => {
  const sql = `SELECT SUM(Population) FROM country`;
  const query = connection.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send(results);
  });
};
