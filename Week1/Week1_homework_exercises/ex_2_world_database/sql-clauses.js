export const biggerThan8M =
  "SELECT name FROM country  WHERE Population > 8000000;";
export const landCountries =
  "SELECT name FROM country  WHERE name LIKE '%_land_%';";
export const smallerThan1M =
  "SELECT name FROM country  WHERE Population BETWEEN 500000 AND 1000000;";
export const europeanCountries =
  "SELECT name FROM country  WHERE Continent = 'Europe' ";
export const biggestSurfaceCountries =
  "SELECT name FROM country  ORDER BY SurfaceArea DESC;";
export const netherlandCities =
  "SELECT name FROM city WHERE CountryCode = 'NLD';";
export const rotterdamPeople =
  "SELECT Population FROM city WHERE NAME = 'Rotterdam';";
export const top10SurfaceCountry =
  "SELECT name FROM country  ORDER BY SurfaceArea DESC LIMIT 10;";
export const top10PopulatedCities =
  "SELECT name FROM city ORDER BY Population DESC LIMIT 10;";
export const populationOfTheWorld =
  "SELECT SUM(DISTINCT Population) FROM country;";
