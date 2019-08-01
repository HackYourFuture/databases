delimiter $$
CREATE TRIGGER homework_trigger
    BEFORE INSERT 
        ON emp_proj
            FOR EACH ROW
            BEGIN 
                DECLARE message VARCHAR(300);
                DECLARE languageTrigger INT ;
                SET languageTrigger = (SELECT COUNT(language)as language FROM countrylanguage WHERE countrycode = new.countrycode);

                IF languageTrigger > 9 
                THEN 
                    set message = 'It is not allowed to insert more than 10 languages for this country !';
                    SET lc_messages = message; SIGNAL SQLSTATE '45000';
                END IF;
            END $$

delimiter ;


