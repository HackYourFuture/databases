const mysql = require("mysql");

const connectionConfig = {
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
};

const connection = mysql.createConnection(connectionConfig);

connection.connect((error) => {
  if (error) throw error;
  console.log("Connected to MySQL server");
  executeQueries();
});

function executeQueries() {
  connection.query(
    `SELECT Name FROM country WHERE Population > 8000000`,
    (error, results) => {
      if (error) throw error;
      console.log("Countries with population greater than 8 million:");
      console.log(results);
    }
  );

  connection.query(
    `SELECT Name FROM country WHERE Name LIKE '%land%'`,
    (error, results) => {
      if (error) throw error;
      console.log('Countries with "land" in their names:');
      console.log(results);
    }
  );

  connection.query(
    `SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000`,
    (error, results) => {
      if (error) throw error;
      console.log("Cities with population between 500,000 and 1 million:");
      console.log(results);
    }
  );

  connection.query(
    `SELECT Name FROM country WHERE Continent = 'Europe'`,
    (error, results) => {
      if (error) throw error;
      console.log("Countries in the continent Europe:");
      console.log(results);
    }
  );

  connection.query(
    `SELECT Name FROM country ORDER BY SurfaceArea DESC`,
    (error, results) => {
      if (error) throw error;
      console.log("Countries in descending order of their surface areas:");
      console.log(results);
    }
  );

  connection.query(
    `SELECT Name FROM city WHERE CountryCode = 'NLD'`,
    (error, results) => {
      if (error) throw error;
      console.log("Cities in the Netherlands:");
      console.log(results);
    }
  );

  connection.query(
    `SELECT Population FROM city WHERE Name = 'Rotterdam'`,
    (error, results) => {
      if (error) throw error;
      console.log("Population of Rotterdam:");
      console.log(results);
    }
  );

  connection.query(
    `SELECT Name, SurfaceArea FROM country ORDER BY SurfaceArea DESC LIMIT 10`,
    (error, results) => {
      if (error) throw error;
      console.log("Top 10 countries by Surface Area:");
      console.log(results);
    }
  );

  connection.query(
    `SELECT Name, Population FROM city ORDER BY Population DESC LIMIT 10`,
    (error, results) => {
      if (error) throw error;
      console.log("Top 10 most populated cities:");
      console.log(results);
    }
  );

  connection.query(
    `SELECT SUM(Population) AS WorldPopulation FROM country`,
    (error, results) => {
      if (error) throw error;
      console.log("Population number of the world:");
      console.log(results);
    }
  );

  closeConnection();
}

function closeConnection() {
  connection.end();
}
