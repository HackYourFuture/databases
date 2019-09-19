
-- Gets alerts when a country has >= 10 languages.
DROP TRIGGER IF EXISTS `new_world`.`countrylanguage_AFTER_INSERT`;
DELIMITER $$
  USE `new_world`$$
  CREATE DEFINER=`hyfuser`@`localhost` TRIGGER `countrylanguage_AFTER_INSERT` BEFORE INSERT ON `countrylanguage`
  FOR EACH ROW 
  BEGIN
    DECLARE message VARCHAR(150);
      DECLARE NumberOFLanguges INT;
        SELECT count(Language) INTO NumberOFLanguges FROM countrylanguage WHERE CountryCode = NEW.CountryCode;
        IF (NumberOFLanguges >=9)
        THEN 
        SET message='The country already has 9 languages!';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT= message;
        END IF;
    END$$
DELIMITER;


-- Tried to INSERT one more row in the CountryLanguage table:
INSERT INTO countrylanguage VALUES ('VNM', 'Test', 'F',0);

-- I got this alert from MySQL:
Error Code: 1644. The country already has 9 languages!

-- To select all countries with 9 langages:
SELECT c.Name, COUNT(Language) AS 'Number of language'
FROM country c
JOIN countrylanguage cl 
ON cl.CountryCode = c.Code
GROUP BY c.code           
HAVING COUNT(Language) = 9
ORDER BY COUNT(Language) ASC;

-- Got those countries:
Name      Number of language
Angola     	9
Vietnam	    9
Indonesia 	9