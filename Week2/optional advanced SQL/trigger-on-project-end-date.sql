delimiter $$
CREATE TRIGGER end_date_trigger
    BEFORE INSERT 
        ON project
            FOR EACH ROW
            BEGIN 
                DECLARE message VARCHAR(100);
                IF new.start_date > new.end_date 
                THEN 
                    set message= 'Project end date cannot be before the start date';
                    SET lc_messages=message; SIGNAL SQLSTATE '45000';
                END IF;
            END $$

delimiter ;
