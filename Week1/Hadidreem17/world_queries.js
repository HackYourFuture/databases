const { Client } = require("pg");

async function main() {
  const client = new Client({
    user: "hyfuser",
  host: "localhost",
    database: "world",
    password: "hyfpassword",
    port: 5432,
  });

  try {
    await client.connect();

    console.log("\n1. Countries with population > 8 million:");
    let result = await client.query(`
      SELECT name FROM country WHERE population > 8000000;
    `);
    console.log(result.rows);

    console.log("\n2. Countries that contain 'land' in their names:");
    result = await client.query(`
      SELECT name FROM country WHERE name ILIKE '%land%';
    `);
    console.log(result.rows);

    console.log("\n3. Cities with population between 500k and 1 million:");
    result = await client.query(`
      SELECT name FROM city
      WHERE population BETWEEN 500000 AND 1000000;
    `);
    console.log(result.rows);

    console.log("\n4. Countries in Europe:");
    result = await client.query(`
      SELECT name FROM country WHERE continent = 'Europe';
    `);
    console.log(result.rows);

    console.log("\n5. Countries ordered by surface area DESC:");
    result = await client.query(`
      SELECT name, surfacearea FROM country ORDER BY surfacearea DESC;
    `);
    console.log(result.rows);

    console.log("\n6. All cities in the Netherlands:");
    result = await client.query(`
      SELECT name FROM city WHERE countrycode = 'NLD';
    `);
    console.log(result.rows);

    console.log("\n7. Population of Rotterdam:");
    result = await client.query(`
      SELECT population FROM city WHERE name = 'Rotterdam';
    `);
    console.log(result.rows);

    console.log("\n8. Top 10 countries by surface area:");
    result = await client.query(`
      SELECT name, surfacearea FROM country ORDER BY surfacearea DESC LIMIT 10;
    `);
    console.log(result.rows);

    console.log("\n9. Top 10 most populated cities:");
    result = await client.query(`
      SELECT name, population FROM city ORDER BY population DESC LIMIT 10;
    `);
    console.log(result.rows);

    console.log("\n10. Total population of the world:");
    result = await client.query(`
      SELECT SUM(population) AS world_population FROM country;
    `);
    console.log(result.rows);

  } catch (err) {
    console.error("Error while running queries:", err);
  } finally {
    await client.end();
  }
}

main();
