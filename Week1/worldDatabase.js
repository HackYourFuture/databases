const mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
});

// Query functions
const query = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
};

const queriesWorld = [
  {
    description: "Countries with population greater than 8 million",
    query: "SELECT Name FROM country WHERE Population > 8000000",
  },
  {
    description: "Countries that have 'land' in their names",
    query: "SELECT name FROM country WHERE name LIKE '%land%'",
  },
  {
    description: "Cities with population in between 500,000 and 1 million",
    query: "SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000",
  },
  {
    description: "Countries in Europe",
    query: "SELECT name FROM country WHERE continent = 'Europe'",
  },
  {
    description: "Countries by surface area (descending)",
    query: "SELECT name, surfacearea FROM country ORDER BY surfacearea DESC",
  },
  {
    description: "Cities in the Netherlands",
    query: "SELECT name FROM city WHERE countrycode = 'NLD'",
  },
  {
    description: "Population of Rotterdam",
    query: "SELECT population FROM city WHERE name = 'Rotterdam'",
  },
  {
    description: "Top 10 countries by Surface Area",
    query:
      "SELECT name, surfacearea FROM country ORDER BY surfacearea DESC LIMIT 10",
  },
  {
    description: "Top 10 most populated cities",
    query: "SELECT name FROM city ORDER BY population DESC LIMIT 10",
  },
  {
    description: "Population of the world",
    query: "SELECT SUM(population) AS 'Total population of world' FROM country",
  },
];
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL server.");

  queriesWorld.forEach(({ description, query }, index) => {
    connection.query(query, (error, results, fields) => {
      if (error) {
        throw error;
      }
      console.log(`-------- ${description} ---------`);
      console.log(results);
    });
  });

  connection.end();
});
