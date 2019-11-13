delimiter $$

CREATE TRIGGER language_row_alert
BEFORE INSERT on countrylanguage
FOR EACH ROW 
BEGIN
DECLARE message VARCHAR(128);
IF (SELECT COUNT(language) FROM countrylanguage WHERE countrycode=NEW.countryCode) > 9
THEN
  SET message = 'This country can get max 9 languages !';
  SET lc_messages = message; SIGNAL SQLSTATE '45000';
END IF;
END $$

delimiter ;