delimiter $$
DROP TRIGGER IF EXISTS language_limit_9;
CREATE TRIGGER language_limit_9
    BEFORE INSERT 
        ON countrylanguage
			FOR EACH ROW
				BEGIN
					DECLARE message VARCHAR(255);
					DECLARE languagesPerCountry INT;
					SET languagesPerCountry = (SELECT COUNT(language) FROM countrylanguage WHERE countrycode = NEW.countrycode);
					IF languagesPerCountry > 9 
						THEN
							SET message = 'The country has already more than 9 languages, you cannot insert more';
							SET lc_messages = message; SIGNAL SQLSTATE '45000';
					END IF;
				END $$
delimiter ;

INSERT INTO countrylanguage VALUES ('AGO', 'Arabic', 'F', 0.1);

DELETE FROM countrylanguage WHERE countrycode = 'AGO' AND language = 'Arabic';