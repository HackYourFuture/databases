DELIMITER $$
CREATE TRIGGER languages_number
BEFORE INSERT
ON  countrylanguage FOR EACH ROW
BEGIN
DECLARE total int;
SELECT count(language) into total from countrylanguage WHERE new.countyrcode = countrycode;
    IF total >= 10
     THEN
        SIGNAL SQLSTATE '45000';
            SET MESSAGE = `The country has more than 9 languages`;
            END IF;
END $$
DELIMITER ;
