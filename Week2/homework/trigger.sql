
delimiter $$
CREATE TRIGGER alertOnCountryCount
    BEFORE INSERT
        ON countrylanguage
            FOR EACH ROW
            BEGIN 
                DECLARE msg VARCHAR(50);
                DECLARE numberOfLangueges INT ;                
                SET numberOfLangueges = (SELECT COUNT(*) FROM countrylanguage WHERE countrycode = new.countrycode);                
                IF numberOfLangueges >= 10 
                THEN 
                    set msg = 'country more than 10 languages!';
                    SET lc_messages= msg; SIGNAL SQLSTATE '45000';
                END IF;
            END $$

delimiter ;