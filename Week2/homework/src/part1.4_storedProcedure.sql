DELIMITER $$
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
 DELIMITER ;