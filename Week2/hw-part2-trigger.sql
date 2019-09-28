USE new_world;

delimiter $$

CREATE TRIGGER language_trigger 
    BEFORE INSERT 
      ON countrylanguage
        FOR EACH ROW
        BEGIN
            DECLARE message VARCHAR(100);
            DECLARE lang_count INT;
            SET lang_count= (SELECT COUNT(language)
                            FROM countrylanguage 
                            WHERE CountryCode=NEW.CountryCode);
            IF  (lang_count >= 9)
            THEN
                set message= 'Languages cannot be more than 9!';
                SET lc_messages=message; SIGNAL SQLSTATE '45000';
            END IF;
        END $$

delimiter ;