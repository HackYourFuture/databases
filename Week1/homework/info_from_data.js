'use strict';
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'world',
});
connection.connect(function(err) {
    if (err) console.log(err);
    else console.log(`Connected!to database: world`);
});
const infoFromData = [
    'SELECT name FROM country WHERE population > 8000000 ',
    'SELECT name FROM country WHERE name LIKE "%land%"',
    'SELECT name FROM city WHERE population BETWEEN 500000 AND 1000000',
    'SELECT name FROM country WHERE Continent = "Europe"',
    'SELECT name FROM country ORDER BY SurfaceArea DESC;',
    'SELECT city.name AS NederlandsCities FROM city INNER JOIN country ON city.CountryCode = country.Code WHERE country.name = "Netherlands"',
    'SELECT population FROM city WHERE Name = "Rotterdam"',
    'SELECT name FROM country ORDER BY SurfaceArea DESC LIMIT 10',
    'SELECT Name FROM city ORDER BY Population DESC LIMIT 10',
    'SELECT SUM(population) AS globalPopulation FROM country',
];

infoFromData.forEach(element => {
    connection.query(element, function(err, result) {
        if (err) console.log(err);
        console.log(element);
        console.log(result);
        console.log('_______________________');
    });
});

connection.end(function(err) {
    if (err) {
        return console.log('error:' + err.message);
    }
    console.log('Close the database connection.');
});