
#What are the names of all the cities in the Netherlands?
SELECT city.Name FROM city 
JOIN country ON city.CountryCode = country.Code 
WHERE country.Name = 'Netherlands';

#What is the population of Rotterdam ?
SELECT city.Name, city.Population FROM city 
WHERE city.Name = 'Rotterdam'; 

#What's the name of all the countries on the continent ‘North America’ ?
SELECT country.Name FROM country 
WHERE country.Continent = 'North America';

#What's the top 10 countries by SurfaceArea ?
SELECT country.Name, country.SurfaceArea FROM country 
ORDER BY country.SurfaceArea DESC 
LIMIT 10;

#What's the top 10 most populated cities?
SELECT city.Name, city.Population FROM city 
ORDER BY city.Population DESC 
LIMIT 10;

#Select the top 3 countries by population that their names start with the letter ‘P’
SELECT country.Name, country.Population FROM country 
WHERE country.Name LIKE 'P%' 
ORDER BY country.Population DESC 
LIMIT 3;

#What is the population in Asia?
SELECT country.Continent, SUM(country.Population) AS AsiaPopulation FROM country 
WHERE country.Continent = 'Asia' 
GROUP BY country.Continent;

#Which languages are spoken in the Region of ‘South America’
SELECT country.Name, countrylanguage.Language FROM country 
JOIN countrylanguage ON country.Code = countrylanguage.CountryCode 
WHERE country.Region = 'South America';

#What are the languages spoken on all cities named ‘Barcelona’
SELECT city.Name, countrylanguage.Language FROM city 
JOIN country ON city.CountryCode = country.Code 
JOIN countrylanguage ON countrylanguage.CountryCode = country.Code
WHERE city.Name = 'Barcelona'; 