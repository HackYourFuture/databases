import mysql from "mysql";

const worldQuery = [
    `SELECT name FROM country WHERE population > 800000`,
    `SELECT name FROM country WHERE name LIKE '%land%'`,
    `SELECT name FROM city WHERE population BETWEEN 500000 AND 1000000`,
    `SELECT name FROM country WHERE continent = 'Europe'`,
    `SELECT name FROM country ORDER BY SurfaceArea DESC`,
    `SELECT name FROM city WHERE CountryCode='NLD';`,
    `SELECT name, population FROM city WHERE Name = 'Rotterdam'`,
    `SELECT name,SurfaceArea FROM country  ORDER BY SurfaceArea DESC LIMIT 10`,
    `SELECT name,population FROM city  ORDER BY population DESC LIMIT 10`,
    `SELECT  SUM(population)FROM country`
];

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'new_world'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('connected...');
});

const processQuery = (query) => {
    connection.query(query, (err, result) => {
        if (err) throw err;
        console.table(result);
    });
};

worldQuery.forEach(query => processQuery(query));