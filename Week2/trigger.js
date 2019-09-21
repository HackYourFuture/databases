DELIMITER $$
  CREATE TRIGGER max_language
    BEFORE INSERT
      ON countrylanguage 
        FOR EACH ROW
        BEGIN
          DECLARE message VARCHAR(255);
          DECLARE total_language INT;
          SET total_language  = (SELECT COUNT(language) FROM countrylanguage WHERE countrycode = NEW.countrycode);
          IF total_language  >= 9
          THEN
            set message = 'Max limit for language is 9.';
            SET lc_messages = message; SIGNAL SQLSTATE '45000';
          END IF;
        END $$
DELIMITER ; 

// INSERT INTO countrylanguage VALUES('AGO', 'Dutch', 'T', 9.9);
// ERROR 1649 (HY000): Unknown locale: 'Max limit for language is 9.'