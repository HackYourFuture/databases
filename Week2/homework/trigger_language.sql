DELIMITER //
  CREATE 
	TRIGGER trigger_language BEFORE INSERT
	ON countrylanguage 
	FOR EACH ROW BEGIN
          DECLARE message VARCHAR(100);
          DECLARE languagesForCountry INT;
          SET languagesForCountry = (SELECT COUNT(language) FROM countrylanguage WHERE countrycode = NEW.countrycode);
          IF languagesForCountry >= 10
          THEN
            set message = 'The selected country has more than 9 language';
            SET lc_messages = message; SIGNAL SQLSTATE '45000';
          END IF;
        END //
DELIMITER ;