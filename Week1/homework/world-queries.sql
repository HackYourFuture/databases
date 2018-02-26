--# 1- What are the names of all the cities in the Netherlands?
	SELECT Name AS 'Netherlands_Cities'
	FROM city
	WHERE CountryCode = 'NLD';

--# 2-What is the population of Rotterdam ?
	SELECT Population AS 'Population of Rotterdam'
	FROM city
	WHERE  Name = 'Rotterdam';

--# 3-What's the name of all the countries on the continent ‘North America’ ?
	SELECT Name NorthAmericaCountry
	FROM country
	WHERE Continent = 'North America';

--# 4-What's the top 10 countries by SurfaceArea ?

	SELECT Name, SurfaceArea
	FROM country
	ORDER BY SurfaceArea DESC
	LIMIT 10;
--# 5-What's the top 10 most populated cities?

	SELECT Name, Population
	FROM city
	ORDER BY Population DESC
	LIMIT 10;
--# 6-Select the top 3 countries by population that their names start with the later ‘P’ 

	SELECT Name, Population
	FROM country
	WHERE Name LIKE 'P%'
	ORDER BY Population DESC
	LIMIT 3;
--# 7-What is the population in Asia?

	SELECT SUM(Population) AS 'Population of Asia'
	FROM country
	WHERE Continent = 'Asia';

--# 8-Which languages are spoken in the Region of ‘South America’ ?
	SELECT Language
	FROM
	    country C
		INNER JOIN
	    countrylanguage CL ON C.Code = CL.CountryCode
	WHERE
	    Region = 'South America';
--# 9-What are the languages spoken on all cities named ‘Barcelona’ (you may need to join 3 tables =)) 
--#join 2 tables

	SELECT 
	    cl.Language, c.Name
	FROM
	    city c
		INNER JOIN
	    countrylanguage cl ON c.CountryCode = cl.CountryCode
	WHERE
	    c.Name = 'Barcelona';



/* I don't think we need to join 3 tables, it's the same resulte */
--#join 3 tables

	SELECT 
	    country.Name AS 'Country',
	    c.Name AS 'City Name',
	    cl.Language
	FROM
	    ((city c
	    INNER JOIN countrylanguage cl ON c.CountryCode = cl.CountryCode)
	    INNER JOIN country ON c.CountryCode = country.Code)
	WHERE
	    c.Name = 'Barcelona';







