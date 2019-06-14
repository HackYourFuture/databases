DELIMITER $
$

CREATE PROCEDURE spQuery1(input_country VARCHAR
(50))
BEGIN
  SELECT e1.Name AS Country, e2.Name AS Capital
  FROM country AS e1 LEFT JOIN city AS e2 ON (e1.Capital = e2.ID)
  WHERE e1.name = input_country;
  END$$
  GO
CREATE PROCEDURE spQuery2(input_region VARCHAR
(50))
BEGIN

  SELECT region, language
  FROM (SELECT e1.region AS region, e2.Language AS Language
    FROM country AS e1
      LEFT JOIN (SELECT *
      FROM countrylanguage) AS e2 ON (e1.Code = e2.CountryCode)) AS regionsAndLanguages
  WHERE region = input_region
  GROUP BY region, language;
  END$$
    GO
CREATE PROCEDURE spQuery3(input_language VARCHAR
(50))
BEGIN
  SELECT COUNT(*) AS Cities
  FROM (SELECT e1.Language AS Language, e2.Name AS City
    FROM countrylanguage AS e1
      LEFT JOIN city AS e2 ON (e1.CountryCode = e2.CountryCode)
    WHERE e1.Language = input_language) AS Number_of_Cities;

  END$$
      GO
CREATE PROCEDURE spQuery4(region VARCHAR
(50),official_lang VARCHAR
(50))
BEGIN

  DECLARE message VARCHAR
  (300);
DECLARE count_countries INT;

SELECT COUNT(*)
INTO count_countries
FROM country JOIN countrylanguage ON country.code = countrylanguage.CountryCode
WHERE countrylanguage.language = official_lang
  and country.Region = region
  and Isofficial = 'T';

IF (count_countries > 1) THEN
SELECT country.Name
FROM country JOIN countrylanguage ON country.code = countrylanguage.CountryCode
WHERE countrylanguage.language =official_lang
  and country.Region = region
  and Isofficial = 'T';
ELSE
SET message
= 'FALSE: No countries on the given region with same official language!';
SET lc_messages
= message; SIGNAL SQLSTATE '45000';
END
IF;
  END$$
      GO
CREATE PROCEDURE spQuery5()
BEGIN
  SELECT continent, COUNT(language) AS Languages
  FROM (SELECT e1.Continent AS Continent, e2.Language AS Language
    FROM country AS e1
      LEFT JOIN (SELECT *
      FROM countrylanguage
      WHERE isOfficial = 'T') AS e2 ON (e1.Code = e2.CountryCode)) AS l
  GROUP BY continent;

  END$$

DELIMITER ; 