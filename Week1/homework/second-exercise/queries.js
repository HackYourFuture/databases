export const queries = [
  {
    statement: `SELECT name FROM country WHERE population > 8000000; `,
    title: `The names of countries with population greater than 8 million`,
  },
  {
    statement: `SELECT name FROM country WHERE name LIKE "%land%"; `,
    title: `The names of countries that have “land” in their names`,
  },
  {
    statement: `SELECT name FROM city WHERE population BETWEEN 500000 and 1000000;`,
    title: `The names of the cities with population in between 500,000 and 1 million`,
  },
  {
    statement: `SELECT name FROM country WHERE continent = 'Europe';`,
    title: `The name of all the countries on the continent "Europe"`,
  },
  {
    statement: `SELECT name FROM country ORDER BY surfaceArea DESC ;`,
    title: `The countries in the descending order of their surface areas.`,
  },
  {
    statement: `SELECT name FROM city WHERE countryCode = "NLD" ;`,
    title: `The names of all the cities in the Netherlands`,
  },
  {
    statement: `SELECT population FROM city WHERE name = "Rotterdam" ; ;`,
    title: `The population of Rotterdam`,
  },
  {
    statement: `SELECT name FROM country ORDER BY surfaceArea DESC LIMIT 10 ;`,
    title: `The top 10 countries by Surface Area`,
  },
  {
    statement: `SELECT name FROM city ORDER BY population DESC LIMIT 10 ;`,
    title: `The top 10 most populated cities`,
  },
  {
    statement: `SELECT sum(population) AS worldPopulation FROM country ;`,
    title: `The population number of the world`,
  },
];
