var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'world'
});

connection.connect();

const queryObj = {
    moreThan8Million : "select name From country where Population > 8000000 ",
    containsLand : 'select name From country where name like  "%land%"',
    between500kAnd1M :'select name From country where population between 500000 and 1000000',
    european : "select name From country where continent like 'Europe'",
    fromBigToSmall: "select * FROM country ORDER BY SurfaceArea DESC",
    dutchCities: "SELECT Name From city where countryCode like 'NLD'",
    rotterdamPopulation: "SELECT Population from city where name like 'Rotterdam'",
    biggest10Countries: "select * FROM country ORDER BY SurfaceArea DESC limit 10",
    biggest10Cities: "select * FROM city ORDER BY Population DESC limit 10",
    worldPopulation: "select sum(population) from country"
}

for (let i in queryObj )
connection.query(queryObj[i] , function (error, results, fields) {
    if (error) {
        throw error;
    }
    console.log(`The reply ${i}`, results);
});


connection.end();
