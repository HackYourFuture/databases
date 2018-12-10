"use strict"

const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword"
});

connection.connect((err) => {
  if (err) {
    console.log("Error connecting: " + err.stack);
    return;
  }
  console.log("Connected as Id: " + connection.threadId);
});

const queries = [
  "CREATE DATABASE world;",
  "USE world;",
  "CREATE TABLE country (name VARCHAR(20) PRIMARY KEY, population INT, surface_area INT, continent VARCHAR(20));",
  "CREATE TABLE city (name VARCHAR(20), population INT, country VARCHAR(20), FOREIGN KEY(country) REFERENCES country(name));"
];

queries.forEach((query) => {
  connection.query(query, (err, results, fields) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log(results.affectedRows);
    }
  });
});

connection.end(err => console.log(err ? err.message : "disconnected"));
