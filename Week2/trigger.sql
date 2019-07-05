use world;

drop trigger if exists languageAlert;

DELIMITER $$
CREATE TRIGGER languageAlert 
BEFORE INSERT ON countrylanguage
FOR EACH ROW BEGIN
	DECLARE languagenumber INT(5);
    SELECT COUNT(language) INTO languagenumber FROM countrylanguage 
JOIN country ON country.code=countrylanguage.countrycode
WHERE country.code = new.countrycode; 
	IF languagenumber >= 9
    THEN 
        SIGNAL SQLSTATE '02000' SET MESSAGE_TEXT = 'You can not add more than 9 language !';
    END IF;
END$$
DELIMITER ;



