const greaterThan8Million = 'SELECT name FROM country WHERE population > 8000000';
const namesHaveLand = 'SELECT name FROM country LIKE %land%';
const populationBetween =
  'SELECT name FROM country WHERE population > 500000 AND population < 1000000';
const europeCountries = 'SELECT name FROM country WHERE continent = "Europe"';
const surfaces = 'SELECT * FROM country ORDER BY surface DESC';
const citiesOfNetherlands = 'SELECT * FROM city WHERE country = "Netherlands"';
const populationOfNetherlands = 'SELECT SUM(population) from cities WHERE country = "Netherlands';
const topTenBySurface = 'SELECT TOP 10 * FROM country ORDER BY surface DESC';
const topTenByPopulation = 'SELECT TOP 10 * FROM city ORDER BY population DESC';
const worldPopulation = 'SELECT SUM(population) from country';

module.exports = {
  greaterThan8Million,
  namesHaveLand,
  populationBetween,
  europeCountries,
  surfaces,
  citiesOfNetherlands,
  populationOfNetherlands,
  topTenBySurface,
  topTenByPopulation,
  worldPopulation,
};
