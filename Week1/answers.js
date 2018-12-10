"use strict"

const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world"
});

db.connect((err) => {
  if (err) {
    console.log("Error connecting: " + err.stack);
    return;
  }
  console.log("Connected as Id: " + db.threadId);
});

const answers = [
  "SELECT name FROM country WHERE population > 8000000;",
  "SELECT name FROM country WHERE name LIKE 'land%';",
  "SELECT name FROM city WHERE population >= 500000 AND population <= 1000000;",
  "SELECT name FROM country WHERE continent = 'Europe';",
  "SELECT name FROM country ORDER BY surface_area DESC;",
  "SELECT name FROM city WHERE country = 'Netherlands';",
  "SELECT population FROM city WHERE name = 'Rotterdam';",
  "SELECT name FROM country ORDER BY surface_area DESC LIMIT 10;",
  "SELECT name FROM city ORDER BY population DESC LIMIT 10;",
  "SELECT SUM(population) FROM country;"
];

answers.forEach((answer, i) => {
  i++;
  db.query((answer), (err, result, fields) => {
    if (err) {
      console.log(err.message);
    } else if (!result[0]) {
      console.log("Answer ", i, "\nNoresult");
    } else {
      console.log("Answer ", i);
      result.forEach((obj) => {
        for (let k in obj) {
          console.log(obj[k]);
        }
      });
    }
  });
});

db.end(err => console.log(err ? err.message : "disconnected"));
