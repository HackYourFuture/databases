DELIMITER //
CREATE TRIGGER mustafa_trigger
    BEFORE INSERT
        ON countrylanguage
            FOR EACH ROW
            BEGIN
                DECLARE message VARCHAR(100);
                DECLARE numberOfLanguages INT;
                SELECT COUNT(Language) INTO numberOfLanguages FROM countrylanguage WHERE country.countrycode=new.countrycode;
                IF numberOfLanguages>= 10
                THEN
                    set message= ' How can I achieve this ?';
                    SET lc_messages=message; SIGNAL SQLSTATE '45000';
                END IF;
            END//

DELIMITER ;