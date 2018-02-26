
-- 1. What are the names of all the cities in the Netherlands?

SELECT Name AS City    
FROM city     
WHERE CountryCode = 'NLD';


-- 2. What is the population of Rotterdam?

SELECT Population   
FROM city   
WHERE Name = 'Rotterdam';


-- 3. What are the names of all the countries on the continent ‘North America’? 

SELECT Name AS Country  
FROM country   
WHERE Continent = 'North America';


-- 4. Which are the top 10 countries by SurfaceArea?

SELECT Name AS Country, SurfaceArea  
FROM country  
ORDER BY SurfaceArea DESC;  
LIMIT 10;


-- 5. Which are the top 10 most populated cities?

SELECT Name AS City, Population  
FROM city   
ORDER BY Population DESC  
LIMIT 10;


-- 6. Select the top 3 countries by population whose names start with the letter ‘P’.

SELECT Name AS Country, Population  
FROM country  
WHERE name LIKE 'P%'  
ORDER BY Population DESC  
LIMIT 3;  


-- 7. What is the population of Asia?

SELECT SUM(Population) AS AsiaPopulation  
FROM country  
WHERE Continent = 'Asia';


-- 8. Which languages are spoken in the region of ‘South America’?

SELECT DISTINCT Language  
FROM country c
JOIN countrylanguage l   
    ON c.Code = l.CountryCode  
WHERE Continent = 'South America';


-- 9. What are the languages spoken in all cities named ‘Barcelona’?

SELECT DISTINCT Language 
FROM city c 
JOIN countrylanguage l 
    ON c.countrycode = l.countrycode 
WHERE c.name = 'Barcelona';

