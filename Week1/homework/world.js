const express = require("express");
const mysql = require("mysql");

// Create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Giresun3428@",
  database: "world",
});

// Connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySql Connected...");
});

const app = express();

// First Query
app.get("/one", (req, res) => {
  let sql = `SELECT name FROM country WHERE population > 8000000`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(`1. What are the names of countries with population greater than 8 million?`);
    console.log(result);
    res.send("The first question is answered...");
  });
});

// Second Query
app.get("/two", (req, res) => {
  let sql = `SELECT name FROM country WHERE name LIKE '%land%'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(`2.What are the names of countries that have “land” in their names?`);
    console.log(result);
    res.send("The second question is answered...");
  });
});

// Third Query
app.get("/three", (req, res) => {
  let sql = `SELECT name FROM city WHERE population BETWEEN 500000 AND 1000000`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(`3. What are the names of the cities with population in between 500,000 and 1 million?`);
    console.log(result);
    res.send("The third question is answered...");
  });
});

// Fourth Query
app.get("/four", (req, res) => {
  let sql = `SELECT name FROM country WHERE Continent = 'Europe'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(`4. What's the name of all the countries on the continent ‘Europe’?`);
    console.log(result);
    res.send("The fourth question is answered...");
  });
});

// Fifth Query
app.get("/five", (req, res) => {
  let sql = `SELECT name FROM country ORDER BY SurfaceArea DESC`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(`5. List all the countries in the descending order of their surface areas.`);
    console.log(result);
    res.send("The fifth question is answered...");
  });
});

// Sixth Query
app.get("/six", (req, res) => {
  let sql = `SELECT city.name AS CityName 
             FROM city 
             INNER JOIN country ON city.CountryCode = country.Code 
             WHERE country.name = 'Netherlands'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(`6. What are the names of all the cities in the Netherlands?`);
    console.log(result);
    res.send("The sixth question is answered...");
  });
});

// Seventh Query
app.get("/seven", (req, res) => {
    let sql = `SELECT population FROM city WHERE Name = 'Rotterdam'`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(`7. What is the population of Rotterdam?`);
      console.log(result);
      res.send("The seventh question is answered...");
    });
  });

  // Eighth Query
app.get("/eight", (req, res) => {
    let sql = `SELECT name FROM country ORDER BY SurfaceArea DESC LIMIT 10`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(`8. What's the top 10 countries by Surface Area?`);
      console.log(result);
      res.send("The eighth question is answered...");
    });
  });

  // Ninth Query
app.get("/nine", (req, res) => {
    let sql = `SELECT Name FROM city ORDER BY Population DESC LIMIT 10`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(`9. What's the top 10 most populated cities?`);
      console.log(result);
      res.send("The ninth question is answered...");
    });
  });

  // Tenth Query
app.get("/ten", (req, res) => {
    let sql = `SELECT SUM(population) AS populationOfWorld FROM country`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(`10. What is the population number of the world?`);
      console.log(result);
      res.send("The tenth question is answered...");
    });
  });

app.listen("3000", () => {
  console.log("Server started on port 3000");
});
