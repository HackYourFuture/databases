const mysql = require("mysql");

// Create connection to MySQL database
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "new_world",
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database: " + err.stack);
    return;
  }
  console.log("Connected to database as id " + connection.threadId);
});
// 1- Countries with population greater than 8 million:
connection.query(
  "SELECT name FROM country WHERE population > 8000000",
  (err, results) => {
    if (err) throw err;
    console.log("Countries with population greater than 8 million:");
    console.log(results);
  }
);

//2- What are the names of countries that have “land” in their names?
connection.query(
  "SELECT name FROM country WHERE name LIKE '%land%'",
  (err, results) => {
    if (err) throw err;
    console.log(
      "................................................................"
    );
    console.log("The names of countries that have “land” in their names:");
    console.log(results);
  }
);

//3- What are the names of the cities with population in between 500,000 and 1 million?
connection.query(
  "SELECT name FROM city WHERE population BETWEEN  500000 and 1000000",
  (err, results) => {
    if (err) throw err;
    console.log(
      "................................................................"
    );
    console.log(
      "the names of the cities with population in between 500,000 and 1 million:"
    );
    console.log(results);
  }
);
// 4- What is the name of all the countries on the continent ‘Europe’?
connection.query(
  "SELECT name FROM country WHERE continent = 'Europe'",
  (err, results) => {
    if (err) throw err;
    console.log(
      "................................................................"
    );
    console.log("The name of all the countries on the continent ‘Europe’:");
    console.log(results);
  }
);

// 5- List all the countries in the descending order of their surface areas.

connection.query(
  "SELECT name FROM country ORDER BY surfacearea DESC",
  (err, results) => {
    if (err) throw err;
    console.log(
      "................................................................"
    );
    console.log(
      "The countries in the descending order of their surface areas:"
    );
    console.log(results);
  }
);
// 6- What are the names of all the cities in the Netherlands?
connection.query(
  "SELECT name FROM city WHERE countrycode = 'NLD'",
  (err, results) => {
    if (err) throw err;
    console.log(
      "................................................................"
    );
    console.log("The names of all the cities in the Netherlands:");
    console.log(results);
  }
);

// 7- What is the population of Rotterdam?
connection.query(
  "SELECT population FROM city WHERE name = 'Rotterdam'",
  (err, results) => {
    if (err) throw err;
    console.log(
      "................................................................"
    );
    console.log("The population of Rotterdam:");
    console.log(results);
  }
);

// 8- What's the top 10 countries by Surface Area?
connection.query(
  "SELECT name FROM country ORDER BY surfacearea DESC LIMIT 10",
  (err, results) => {
    if (err) throw err;
    console.log(
      "................................................................"
    );
    console.log("The top 10 countries by Surface Area:");
    console.log(results);
  }
);

// 9- What's the top 10 most populated cities?
connection.query(
  "SELECT name FROM city ORDER BY population DESC LIMIT 10",
  (err, results) => {
    if (err) throw err;
    console.log(
      "................................................................"
    );
    console.log("The top 10 most populated cities:");
    console.log(results);
  }
);
// 10- What is the population of the world?
connection.query("SELECT SUM(population) FROM country", (err, results) => {
  if (err) throw err;
  console.log(
    "................................................................"
  );
  console.log("The population of the world:");
  console.log(results);
});

connection.end();
