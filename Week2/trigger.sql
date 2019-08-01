DELIMITER $$
	CREATE TRIGGER langCount_after_insert
	    AFTER INSERT 
	        ON countrylanguage
	            FOR EACH ROW
	            BEGIN 
	                DECLARE message VARCHAR(40);
	                DECLARE langNumber INT ;
	                SET langNumber=(SELECT COUNT(language)as language FROM countrylanguage WHERE countrycode = new.countrycode);
	                IF langNumber >= 10 
	                THEN 
	                    set message= 'Ooops. Max 9 language for one Country!';
	                    SET lc_messages=message; SIGNAL SQLSTATE '45000';
	                END IF;
	            END $$
	
DELIMITER ;