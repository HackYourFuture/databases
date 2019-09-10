const selectCountry = 'SELECT Name FROM country';
const selectCity = 'SELECT Name FROM city';
const SELECT_QUERIES = [
  `${selectCountry} WHERE Population > 8000000`,
  `${selectCountry} WHERE Name LIKE '%land%'`,
  `${selectCity} WHERE population BETWEEN 500000 AND 1000000`,
  `${selectCountry} WHERE Continent = 'Europe'`,
  `${selectCountry} ORDER BY SurfaceArea DESC`,
  `${selectCity} WHERE CountryCode = "NLD"`,
  `SELECT Population FROM city WHERE Name = "Rotterdam"`,
  `${selectCountry} ORDER BY SurfaceArea  DESC LIMIT 10`,
  `${selectCity} ORDER BY Population DESC LIMIT 10`,
  `SELECT SUM(Population) AS worldPopulation FROM country`,
];

function handelError(err, msg) {
  if (err) return console.log(err);
  console.log(msg);
}

module.exports = {
  handelError,
  SELECT_QUERIES,
};
