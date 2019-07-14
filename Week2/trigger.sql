DELIMITER $$
DROP TRIGGER IF EXISTS language_checker;
CREATE TRIGGER language_checker
    BEFORE INSERT 
        ON countrylanguage
            FOR EACH ROW
            BEGIN 
                DECLARE message VARCHAR(200);
                DECLARE counter INT ;
                SET counter = (select COUNT(language) from countrylanguage where countrycode = NEW.countrycode);
                IF counter >= 10
                THEN 
                    SET message= 'Ooops the limited languages are 9';
                    SET lc_messages=message; SIGNAL SQLSTATE '45000';
                END IF;
            END $$

DELIMITER ;