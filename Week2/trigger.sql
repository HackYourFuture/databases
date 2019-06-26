delimiter $$
CREATE TRIGGER language_limiter
    BEFORE INSERT
        ON countrylanguage
            FOR EACH ROW
            BEGIN
                DECLARE message VARCHAR(100);
                DECLARE language_count INT;
                SET language_count= (select count(language) from countrylanguage where countrycode =new.countrycode);
                IF language_count >=9
                THEN
                    set message= 'number of languages in a country cannot be more than 9';
                    SET lc_messages=message; SIGNAL SQLSTATE '45000';
                END IF;
            END $$

delimiter ;