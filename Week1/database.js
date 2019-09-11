const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});

function createQuery(query) {
  connection.query(query, function(error, results, fields) {
    if (error) {
      throw error;
    }
    console.log(`The Querys is : ${query}
    `);
    console.log('The result', results, '\n');
  });
}

function insertValues(createdQuery) {
  for (let i = 0; i < createdQuery.length; i++) {
    createQuery(createdQuery[i]);
  }
}

connection.connect();

const create_country =
  "CREATE TABLE country (Name VARCHAR(60) NOT NULL ,Continent enum('Asia','Europe','North America','Africa','Australia','Antarctica','South America') NOT NULL ,Region VARCHAR(30),SurfaceArea INT NOT NULL, IndepYear INT,Population DECIMAL(5,2) NOT NULL , LifeExpectancy DECIMAL(5,2),GNP BIGINT,GNPOld INT,LocalName VARCHAR(30),GovernmentForm VARCHAR(50),HeadOfState VARCHAR(50),Capital VARCHAR(50))";
createQuery(create_country);

const create_city =
  'CREATE TABLE city (ID INT NOT NULL AUTO_INCREMENT,Name VARCHAR(60) NOT NULL, CountryCode INT NOT NULL, District VARCHAR(60), Population INT NOT NULL , PRIMARY KEY (ID) )';
createQuery(create_city);

const insert_country_queries = [
  "INSERT INTO country VALUES ('Netherlands', 'Europe', 'Western Europe', 42508 , 1581, 17.08, 81.51, 901900000, NULL, 'Holland', 'Constitutional Monarchy', 'King Willem-Alexander', 'Amsterdam')",
  "INSERT INTO country VALUES ('Turkey', 'Asia', 'Europe', 783562 ,1923, 79.81 ,75.76, 2225000000, NULL,'Türkiye','Republic', 'Recep Tayyip Erdogan','Ankara')",
  "INSERT INTO country VALUES ('Afghanistan', 'Asia', 'Southern and Central Asia', 652237, 1919, 35.53, 63.67, 71050000, NULL, 'Islamic Emirate of Afghanistan', 'Islamic republic','Ashraf Ghani', 'Kabul')",
  "INSERT INTO country VALUES ('Canada', 'North America', 'North America', 9985000, 1867, 37.06,82.30, 1679000000,NULL, 'Canada', 'Constitutional Monarchy', 'Queen Elizabeth II','Ottowa')",
  "INSERT INTO country VALUES ('Germany', 'Europe', 'Europe',357386, 1990, 82.79, 80.64, 4280000000 , NULL, 'Deutschland', 'Republic','Frank-Walter Steinmeier', 'Berlin')",
];
insertValues(insert_country_queries);

const insert_city_queries = [
  "INSERT INTO city SET name='Amsterdam', CountryCode=31, District='North Holland', Population= 821752",
  "INSERT INTO city SET name='Rotterdam', CountryCode=31, District='South Holland', Population= 623652",
  "INSERT INTO city SET name='Utrecht', CountryCode=31,District= 'Utrecht',Population= 1262000",
  "INSERT INTO city SET name='Izmir',CountryCode=90,District='Aegean',Population= 4224000",
  "INSERT INTO city SET name='Berlin',CountryCode=49,District='Berlin',Population= 3575000",
];
insertValues(insert_city_queries);

const countryPopulationOver8million =
  'SELECT name AS country_population_over_8_million FROM country WHERE Population > 8000000';
createQuery(countryPopulationOver8million);

const countryHaveLand =
  "SELECT name AS country_includes_land FROM country WHERE name LIKE '%land%'";
createQuery(countryHaveLand);

const citiesPopulationBetween =
  'SELECT name AS cities_between_5billion_and_1million FROM city WHERE Population BETWEEN 500000 AND 1000000';
createQuery(citiesPopulationBetween);

const continentsInEurope =
  "SELECT name AS continents_in_Europe FROM country WHERE Continent='Europe'";
createQuery(continentsInEurope);

const countrySurfaceAreaDesc =
  'SELECT name,SurfaceArea AS countries_surfaceArea_in_desc FROM country ORDER BY SurfaceArea DESC';
createQuery(countrySurfaceAreaDesc);

const citiesInNetherlands =
  "SELECT country.name AS country_name ,city.name AS city_name FROM country JOIN city ON city.countryCode=31 WHERE country.name = 'Netherlands'";
createQuery(citiesInNetherlands);

const populationRotterdam =
  "SELECT Population AS population_Rotterdam from city WHERE name='Rotterdam'";
createQuery(populationRotterdam);

const topThreeCountriesSurfceArea =
  'SELECT name,SurfaceArea AS top_three_country_surfaceArea FROM country ORDER BY surfaceArea DESC LIMIT 3';
createQuery(topThreeCountriesSurfceArea);

const topThreeCitiesPopulation =
  'SELECT name,Population AS top_three_city_population FROM city ORDER BY Population DESC LIMIT 3';
createQuery(topThreeCitiesPopulation);

const populationWorld = 'SELECT SUM(Population) AS world_population FROM country';
createQuery(populationWorld);

connection.end();
