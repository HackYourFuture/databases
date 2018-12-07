"use strict"

const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword"
});

const db = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world"
});

connection.connect();

const queries = [
  "CREATE DATABASE world",
  "CREATE TABLE country (name VARCHAR(20) PRIMARY KEY, population INT, surface_area INT, continent VARCHAR(20));",
  "CREATE TABLE city (name VARCHAR(20), population INT, country VARCHAR(20), FOREIGN KEY(country) REFERENCES country(name));"
];

connection.query(queries[0], (err, results, fields) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Database has been created successfully ", results.affectedRows);
  }
});

connection.end();

db.connect();

for (let i = 1; i < queries.length; i++) {
  db.query(queries[i], (err, results, fields) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("Table has been created successfully ", results.affectedRows);
    }
  });
}

db.end();

