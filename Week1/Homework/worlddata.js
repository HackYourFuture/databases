import mySQL from "mysql";

const connection = mySQL.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to DB");
});

//What are the names of countries with population greater than 8 million?

connection.query(
  `SELECT Name FROM country WHERE Population > 8000000`,
  (err, results) => {
    if (err) throw err;
    console.log(results.map((country) => country.Name));
  }
);

//What are the names of countries that have “land” in their names?

connection.query(
  `SELECT Name FROM country WHERE Name LIKE '%land%'`,
  (err, results) => {
    if (err) throw err;
    console.log(results.map((country) => country.Name));
  }
);

//What are the names of the cities with population in between 500,000 and 1 million?

connection.query(
  `SELECT Name FROM city WHERE population BETWEEN 500000 AND 1000000`,
  (err, results) => {
    if (err) throw err;
    console.log(results.map((country) => country.Name));
  }
);

//What's the name of all the countries on the continent ‘Europe’?

connection.query(
  `SELECT Name FROM country WHERE continent = 'Europe' `,
  (err, results) => {
    if (err) throw err;
    console.log(results.map((country) => country.Name));
  }
);

//List all the countries in the descending order of their surface areas.

connection.query(
  `SELECT Name FROM country ORDER BY SurfaceArea DESC`,
  (err, results) => {
    if (err) throw err;
    console.log(results.map((country) => country.Name));
  }
);

//What are the names of all the cities in the Netherlands?

connection.query(
  `SELECT Name FROM city WHERE CountryCode = 'NLD'`,
  (err, results) => {
    if (err) throw err;
    console.log(results.map((country) => country.Name));
  }
);

//What is the population of Rotterdam?

connection.query(
  `SELECT Population FROM city WHERE name = 'Rotterdam'`,
  (err, results) => {
    if (err) throw err;
    console.log(results.map((city) => city.Population));
  }
);

//What's the top 10 countries by Surface Area?

connection.query(
  `SELECT Name FROM country ORDER BY SurfaceArea DESC LIMIT 10`,
  (err, results) => {
    if (err) throw err;
    console.log(results.map((country) => country.Name));
  }
);

//What's the top 10 most populated cities?

connection.query(
  `SELECT Name FROM city ORDER BY Population DESC LIMIT 10 `,
  (err, results) => {
    if (err) throw err;
    console.log(results.map((country) => country.Name));
  }
);

//What is the population number of the world?

connection.query(`SELECT SUM(Population) FROM country`, (err, results) => {
  if (err) throw err;
  console.log(results.map((population) => population["SUM(Population)"]));
});

connection.end();
