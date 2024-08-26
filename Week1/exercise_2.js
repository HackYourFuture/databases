const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'world'
});

/*Connect to SQL server*/
connection.connect(err => {
    if (err) {
        return console.error('Connection error: ' + err.stack);
    }
    console.log('Connected!');
});


// Queries
const queries = [
    "SELECT Name FROM country WHERE Population > 8000000;",
    "SELECT Name FROM country WHERE Name LIKE '%land%';",
    "SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000;",
    "SELECT Name FROM country WHERE Continent = 'Europe';",
    "SELECT Name FROM country ORDER BY SurfaceArea DESC;",
    "SELECT Name FROM city WHERE CountryCode = 'NLD';",
    "SELECT Population FROM city WHERE Name = 'Rotterdam';",
    "SELECT Name FROM country ORDER BY SurfaceArea DESC LIMIT 10;",
    "SELECT Name FROM city ORDER BY Population DESC LIMIT 10;",
    "SELECT SUM(Population) AS WorldPopulation FROM country;"
];


// Execute each query
queries.forEach((query, index) => {
    connection.query(query, (error, results) => {
        if (error) throw error;
        console.log(`Query ${index + 1}:`);
        console.log(results);
    });
});

// End the connection
connection.end();