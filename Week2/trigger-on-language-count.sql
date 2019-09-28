DELIMITER $$
	CREATE TRIGGER language_counter
	    AFTER INSERT 
	        ON countrylanguage
	            FOR EACH ROW
	            BEGIN 
	                DECLARE message VARCHAR(255);
	                DECLARE langNumber INT ;
	                SET langNumber=(SELECT COUNT(language)as language FROM countrylanguage WHERE countrycode = new.countrycode);
	                IF langNumber >= 10 
	                THEN 
	                    set message= 'This country cannot support any more languages :((';
	                    SET lc_messages=message; SIGNAL SQLSTATE '45000';
	                END IF;
	            END $$