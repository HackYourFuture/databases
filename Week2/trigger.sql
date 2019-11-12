delimiter $$
CREATE TRIGGER language_Max_Trigger BEFORE INSERT ON countrylanguage
FOR EACH ROW
BEGIN
  DECLARE message varchar(254);
DECLARE languages INT;
SET languages = (SELECT COUNT(language)
FROM countrylanguage
WHERE countrycode = NEW.countrycode);
IF languages > 9
          THEN
set message = 'More than 9 languages are spoken in the selected country';
SET lc_messages = message; SIGNAL SQLSTATE '45000';
END IF;
        END$$
delimiter ;