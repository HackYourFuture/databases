const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password : 'hyfpassword',
    database: 'world'
});

connection.connect();

const queries =[
    // countries with population greater than 8 million
    'SELECT name FROM country WHERE population>=8000000',

    // countries that have “land” in their names
    'SELECT name FROM country WHERE name LIKE "%lands"',

    // cities with population in between 500,000 and 1 million
    'SELECT name FROM city WHERE population>=500000 and population<= 1000000',

    // all the countries on the continent ‘Europe’
    'SELECT name FROM country WHERE continent ="Europe" ',

    // st all the countries in the descending order based on their surface areas
    'SELECT name, SurfaceArea  FROM country ORDER BY SurfaceArea DESC',
];

queries.forEach(query => {
    connection.query(query, (error, results, fields) => {
        if(error){
            throw error;
        }
        for(index in results) {
            console.log(results[index]);
        }
    })
})

connection.end();
