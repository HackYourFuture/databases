const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password : 'hyfpassword',
    database: 'world'
});

connection.connect();

const queries =[
    // cities with population in between 500,000 and 1 million
    'SELECT Name FROM city WHERE CountryCode = "NL"',
   
    // What are the names of all the cities in the Netherlands?  
    'SELECT Name, Population FROM city WHERE Name= "Rotterdam"',

    // What's the top 3 countries based on surface area?
    'SELECT Name, SurfaceArea FROM country ORDER BY SurfaceArea DESC LIMIT 3',

    // What's the top 3 cities with the highest population
    'SELECT Name, Population FROM city ORDER BY Population DESC LIMIT 3',

    // What's the population of the world ?
    'SELECT SUM(Population) FROM country'
] ;

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