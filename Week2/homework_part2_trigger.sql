USE world;

DELIMITER //
DROP TRIGGER IF EXISTS checkLanguageNumberTrigger;
CREATE TRIGGER checkLanguageNumberTrigger
AFTER INSERT ON countrylanguage 
FOR EACH ROW
BEGIN
  DECLARE v1 INT(10);
  DECLARE v2 VARCHAR(100);
  DECLARE message VARCHAR (100);
	SELECT COUNT(countrylanguage.Language) INTO v1 FROM countrylanguage JOIN country On countrycode = country.code WHERE country.code = NEW.countrycode; 
	SELECT country.name INTO v2 FROM countrylanguage JOIN country On countrycode = country.code WHERE country.code = NEW.countrycode LIMIT 1; 
 IF v1 > 9 
THEN
SET message = concat('Alert: ', v2, ' has ',  v1, ' language!' );
SIGNAL SQLSTATE '02000' SET MESSAGE_TEXT = message; 
END IF;
END//
DELIMITER ;

INSERT INTO countrylanguage (countrycode, language, IsOfficial)
Values ('VNM', 'Turkisdsfsd', 'T');

