const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  multipleStatements: true,
  database: "world",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database: " + err.stack);
    return;
  }
  console.log("Connected to MySQL database");

  // 1. Countries with population greater than 8 million
  connection.query(
    "SELECT Name FROM country WHERE Population > 8000000",
    (error, results) => {
      if (error) throw error;
      console.log("1. Countries with population greater than 8 million:");
      console.log(results);
    }
  );

  // 2. Countries that have "land" in their names
  connection.query(
    "SELECT Name FROM country WHERE Name LIKE '%land%'",
    (error, results) => {
      if (error) throw error;
      console.log("2. Countries with 'land' in their names:");
      console.log(results);
    }
  );

  // 3. Cities with population in between 500,000 and 1 million
  connection.query(
    "SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000",
    (error, results) => {
      if (error) throw error;
      console.log("3. Cities with population between 500,000 and 1 million:");
      console.log(results);
    }
  );

  // 4. Countries on the continent 'Europe'
  connection.query(
    "SELECT Name FROM country WHERE Continent = 'Europe'",
    (error, results) => {
      if (error) throw error;
      console.log("4. Countries on the continent 'Europe':");
      console.log(results);
    }
  );

  // 5. Countries in descending order of their surface areas
  connection.query(
    "SELECT Name FROM country ORDER BY SurfaceArea DESC",
    (error, results) => {
      if (error) throw error;
      console.log("5. Countries in descending order of their surface areas:");
      console.log(results);
    }
  );

  // 6. Cities in the Netherlands
  connection.query(
    "SELECT Name FROM city WHERE CountryCode = 'NLD'",
    (error, results) => {
      if (error) throw error;
      console.log("6. Cities in the Netherlands:");
      console.log(results);
    }
  );

  // 7. Population of Rotterdam
  connection.query(
    "SELECT Population FROM city WHERE Name = 'Rotterdam'",
    (error, results) => {
      if (error) throw error;
      console.log("7. Population of Rotterdam:");
      console.log(results);
    }
  );

  // 8. Top 10 countries by Surface Area
  connection.query(
    "SELECT Name FROM country ORDER BY SurfaceArea DESC LIMIT 10",
    (error, results) => {
      if (error) throw error;
      console.log("8. Top 10 countries by Surface Area:");
      console.log(results);
    }
  );

  // 9. Top 10 most populated cities
  connection.query(
    "SELECT Name FROM city ORDER BY Population DESC LIMIT 10",
    (error, results) => {
      if (error) throw error;
      console.log("9. Top 10 most populated cities:");
      console.log(results);
    }
  );

  // 10. Population number of the world
  connection.query(
    "SELECT SUM(Population) AS WorldPopulation FROM country",
    (error, results) => {
      if (error) throw error;
      console.log("10. Population number of the world:");
      console.log(results);
    }
  );

  // Close the connection
  connection.end((err) => {
    if (err) {
      console.error("Error closing database connection: " + err.stack);
      return;
    }
    console.log("MySQL connection closed");
  });
});
