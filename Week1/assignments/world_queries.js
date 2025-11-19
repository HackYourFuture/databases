// PostgreSQL client
const { Client } = require("pg");

// Connect to world database
const client = new Client({
  user: "hyfuser",
  host: "localhost",
  database: "world",
  password: "hyfpassword",
  port: 5432,
});

// Function to run select queries
async function runQueries() {
  await client.connect();

  // 1. Countries with population > 8 million
  let result = await client.query(`
    SELECT name FROM country
    WHERE population > 8000000;
  `);
  console.log("Countries with population > 8M:", result.rows);

  // 2. Countries that contain "land"
  result = await client.query(`
    SELECT name FROM country
    WHERE name ILIKE '%land%';
  `);
  console.log('Countries containing "land":', result.rows);

  // 3. Cities with population 500k–1M
  result = await client.query(`
    SELECT name FROM city
    WHERE population BETWEEN 500000 AND 1000000;
  `);
  console.log("Cities between 500k and 1M:", result.rows);

  // 4. Countries in Europe
  result = await client.query(`
    SELECT name FROM country
    WHERE continent = 'Europe';
  `);
  console.log("Countries in Europe:", result.rows);

  // 5. Countries ordered by surface area (desc)
  result = await client.query(`
    SELECT name, surfacearea 
    FROM country
    ORDER BY surfacearea DESC;
  `);
  console.log("Countries ordered by surface area:", result.rows);

  // 6. Cities in the Netherlands
  result = await client.query(`
    SELECT name FROM city
    WHERE countrycode = 'NLD';
  `);
  console.log("Cities in Netherlands:", result.rows);

  // 7. Population of Rotterdam
  result = await client.query(`
    SELECT population FROM city
    WHERE name = 'Rotterdam';
  `);
  console.log("Population of Rotterdam:", result.rows);

  // 8. Top 10 countries by surface area
  result = await client.query(`
    SELECT name, surfacearea
    FROM country
    ORDER BY surfacearea DESC
    LIMIT 10;
  `);
  console.log("Top 10 by surface area:", result.rows);

  // 9. Top 10 most populated cities
  result = await client.query(`
    SELECT name, population
    FROM city
    ORDER BY population DESC
    LIMIT 10;
  `);
  console.log("Top 10 populated cities:", result.rows);

  // 10. Total world population
  result = await client.query(`
    SELECT SUM(population) AS world_population
    FROM country;
  `);
  console.log("Total world population:", result.rows);

  await client.end();
}

// Run everything
runQueries();
