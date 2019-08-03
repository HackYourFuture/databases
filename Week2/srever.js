const express = require('express');
const app = express();
const mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('database connected');
});

// get the capital of a country
// http://localhost:5055/capital/of/?country=spain
app.get('/capital/of/?', (req, res) => {
  const country = req.query.country;
  var part1_1 = `select Name from city
  where ID in ( SELECT capital FROM country WHERE name = '${country}' )`;
  connection.query(part1_1, function(error, resolve) {
    if (error) throw error;
    res.send(resolve);
  });
});

// get the languages in the region from : (use PostMan)
// example : http://localhost:5055/languages/of/?region=south america
app.get('/languages/of/?', (req, res) => {
  const region = req.query.region;
  var part1_2 = `select language from countrylanguage where CountryCode in (select code from country where region ='${region}')`;
  connection.query(part1_2, function(error, resolve) {
    if (error) throw error;
    res.send(resolve);
  });
});

// get numbers of cities that speak english
// http://localhost:5055/cities/spoken/?language=english
app.get('/cities/spoken/?', (req, res) => {
  const language = req.query.language;
  var part1_3 = `select count(ci.name) as COUNT from city as ci
  join country as co
  on co.code = ci.countrycode
  join countrylanguage as la
  on co.code = la.countrycode
  where language = '${language}'`;
  connection.query(part1_3, function(error, resolve) {
    if (error) throw error;
    res.send(resolve);
  });
});

// get countries that speak same language in a region
// http://localhost:5055/countries/south america?language=spanish
app.get('/countries/:region', (req, res) => {
  const language = req.query.language;
  const region = req.params.region;
  var part1_4 = `select name from country as CO
  join countrylanguage as la
  on co.code = la.countrycode
  where region = '${region}' and language = '${language}' and IsOfficial = 't'`;
  connection.query(part1_4, function(error, resolve) {
    if (error) throw error;
    res.send(resolve);
  });
});

// get numbers of languages in a all continents
// http://localhost:5055/continent/languages
app.get('/continent/languages', (req, res) => {
  var part1_5 = `select DISTINCT(continent),count(language) from country as co
  join countrylanguage as la
  on co.code = la.countrycode
  group by Continent`;
  connection.query(part1_5, function(error, resolve) {
    if (error) throw error;
    res.send(resolve);
  });
});

const port = 5055;
app.listen(port, () => {
  console.log('server is listening to ' + port);
});
