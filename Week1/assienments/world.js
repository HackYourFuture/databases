const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world'
});


connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database as ID', connection.threadId);

  
  const queries = {
    countriesWithPopulationOver8M: `
      SELECT Name FROM country WHERE Population > 8000000;
    `,
    countriesWithLandInName: `
      SELECT Name FROM country WHERE Name LIKE '%land%';
    `,
    citiesWithPopulationBetween500KAnd1M: `
      SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000;
    `,
    countriesInEurope: `
      SELECT Name FROM country WHERE Continent = 'Europe';
    `,
    countriesBySurfaceAreaDesc: `
      SELECT Name FROM country ORDER BY SurfaceArea DESC;
    `,
    citiesInNetherlands: `
      SELECT Name FROM city WHERE CountryCode = 'NLD';
    `,
    populationOfRotterdam: `
      SELECT Population FROM city WHERE Name = 'Rotterdam';
    `,
    top10CountriesBySurfaceArea: `
      SELECT Name, SurfaceArea FROM country ORDER BY SurfaceArea DESC LIMIT 10;
    `,
    top10MostPopulatedCities: `
      SELECT Name, Population FROM city ORDER BY Population DESC LIMIT 10;
    `,
    worldPopulation: `
      SELECT SUM(Population) AS WorldPopulation FROM city;
    `
  };

  
  for (const [queryName, query] of Object.entries(queries)) {
    connection.query(query, (err, results) => {
      if (err) {
        console.error(`Error executing ${queryName}:`, err.stack);
        return;
      }
      console.log(`Results for ${queryName}:`, results);
    });
  }

  connection.end();
});
