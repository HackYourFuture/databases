const mysql = require("mysql2/promise");

const dbConfig = {
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
};

const queries = [
  "SELECT Name FROM country WHERE Population > 8000000",
  "SELECT Name FROM country WHERE Name LIKE '%land%'",
  "SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000",
  "SELECT Name FROM country WHERE Continent = 'Europe'",
  "SELECT Name FROM country ORDER BY SurfaceArea DESC",
  "SELECT Name FROM city WHERE CountryCode = 'NLD'",
  "SELECT Population FROM city WHERE Name = 'Rotterdam'",
  "SELECT Name FROM country ORDER BY SurfaceArea DESC LIMIT 10",
  "SELECT Name FROM city ORDER BY Population DESC LIMIT 10",
  "SELECT SUM(Population) AS total_population FROM country",
];

async function runQueries() {
  try {
    const connection = await mysql.createConnection(dbConfig);

    for (const query of queries) {
      const [results] = await connection.query(query);
      console.log(JSON.stringify(results, null, 2));
      console.log("--------------------------------------");
    }

    connection.end();
  } catch (error) {
    console.error("Error executing queries:", error);
  }
}

runQueries();
