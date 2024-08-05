const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'world',
});

const execute_Query = util.promisify(connection.query.bind(connection));

async function executeQueries(){
    try{
    const countriesPopulation = await execute_Query('SELECT name FROM country WHERE population > 8000000' );
    const countriesLand = await execute_Query("SELECT name FROM country WHERE name LIKE '%land%'");
    const citiesPopulation = await execute_Query('SELECT name FROM city WHERE population BETWEEN 500000 AND 1000000');
    const europeCountries = await execute_Query("SELECT name FROM country WHERE continent = 'Europe'");
    const countriesBySurfaceArea = await execute_Query('SELECT name FROM country ORDER BY surfaceArea DESC');
    const citiesNetherlands = await execute_Query("SELECT name FROM city WHERE countryCode = 'NLD'");
    const populationRotterdam = await execute_Query("SELECT population FROM city WHERE name = 'Rotterdam'");
    const top10CountriesBySurfaceArea = await execute_Query('SELECT name FROM country ORDER BY surfaceArea DESC LIMIT 10');
    const top10MostPopulatedCities = await execute_Query('SELECT name FROM city ORDER BY population DESC LIMIT 10');
    const worldPopulation = await execute_Query('SELECT SUM(population) AS world_population FROM country');

    console.log('Countries with population greater than 8 million:', countriesPopulation);
    console.log('Countries with "land" in their names:', countriesLand);
    console.log('Cities with population between 500,000 and 1 million:', citiesPopulation);
    console.log('All countries in Europe:', europeCountries);
    console.log('All countries ordered by surface area:', countriesBySurfaceArea);
    console.log('All cities in the Netherlands:', citiesNetherlands);
    console.log('Population of Rotterdam:', populationRotterdam);
    console.log('Top 10 countries by surface area:', top10CountriesBySurfaceArea);
    console.log('Top 10 most populated cities:', top10MostPopulatedCities);
    console.log('Total world population:', worldPopulation);
    }
    catch(error){
        console.error(error);
    } finally {
        connection.end();
    }
}

executeQueries();