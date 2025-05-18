-- What are the names of countries with population greater than 8 million?
SELECT name, population 
FROM country 
WHERE population > 8000000;

-- What are the names of countries that have “land” in their names?
SELECT name 
FROM country 
WHERE name LIKE '%land%';

-- What are the names of the cities with population in between 500,000 and 1 million?
SELECT name, population  
FROM city 
WHERE population BETWEEN 500000 AND 1000000;

-- What's the name of all the countries on the continent ‘Europe’?
SELECT name, Continent 
FROM country 
WHERE Continent = 'Europe';

-- List all the countries in the descending order of their surface areas.
SELECT name, SurfaceArea 
FROM country 
ORDER BY SurfaceArea DESC;

-- What are the names of all the cities in the Netherlands?
SELECT name 
FROM city 
WHERE CountryCode = 'NLD';

-- What is the population of Rotterdam?
SELECT name, Population 
FROM city 
WHERE name = 'Rotterdam';

-- What's the top 10 countries by Surface Area?
SELECT name, SurfaceArea 
FROM country 
ORDER BY SurfaceArea DESC 
LIMIT 10;

-- What's the top 10 most populated cities?
SELECT name, Population 
FROM city 
ORDER BY Population DESC 
LIMIT 10;

-- What is the population number of the world?
SELECT 
       SUM(Population) AS 'world_population'
FROM country;
