DELIMITER $$
CREATE TRIGGER over_nine_language  
AFTER INSERT ON countrylanguage 
FOR EACH ROW 
BEGIN
    IF ( (SELECT count(*) FROM countrylanguage where countrycode = NEW.countrycode) >= 10) THEN
        INSERT INTO countrylanguage VALUES(NEW.countrycode,NEW.language,NEW.isofficial,NEW.percentage);
        SIGNAL SQLSTATE '02000' SET MESSAGE_TEXT =  'Warning: country has 10 or more language' ;
    END IF;
END$$
DELIMITER ;