DELIMITER $
$
CREATE TRIGGER country_language_trigger
    BEFORE
INSERT 
        ON
countrylanguage
FOR
EACH
ROW
BEGIN
  DECLARE message VARCHAR
  (100);
DECLARE language_number INT;
SET language_number
=
(SELECT COUNT(Language)
FROM countrylanguage JOIN country ON
WHERE countrycode = NEW.countrycode)
>= 10
                THEN
SET message
= 'Insertion limit has been exceeded! No more laguages can be added.';
SET lc_messages
= message; SIGNAL SQLSTATE '45000';
END
IF;
END $$

DELIMITER ;
