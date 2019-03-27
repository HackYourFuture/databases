DELIMITER $$
CREATE TRIGGER limit_lang_trigger
BEFORE INSERT ON countrylanguage
FOR EACH ROW
BEGIN
IF(SELECT COUNT(language) FROM countrylanguage  WHERE countrycode = NEW.countrycode) >= 10  THEN  SIGNAL SQLSTATE '45000'

SET message = 'Insertion limit exceeded for this country!';

END IF;

END$$

DELIMITER;
