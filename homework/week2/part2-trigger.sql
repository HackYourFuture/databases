DELIMITER $$
CREATE TRIGGER ten_or_more_language  
BEFORE INSERT ON countrylanguage 
FOR EACH ROW 
BEGIN
    IF ( (SELECT count(*) FROM countrylanguage where countrycode = NEW.countrycode) >= 10) THEN
        SET lc_messages =  'Warning: country has 10 or more language';SIGNAL SQLSTATE '45000';
    END IF;
END$$
DELIMITER ;