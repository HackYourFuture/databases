delimiter $$
CREATE TRIGGER date_trigger
    BEFORE INSERT 
        ON project
            FOR EACH ROW
            // insert into project values (104, "ironman", 1, "2007-01-01")
            // variable new contains (104, "ironman", 1, "2007-01-01")
            BEGIN 
                DECLARE message VARCHAR(100);
                DECLARE sd datetime ;
                SET sd= (select starting_date from employee where eno=new.manager_id);
                IF new.start_date < sd 
                THEN 
                    set message= 'Project date cannot be earlier than manager starting date';
                    SET lc_messages=message; SIGNAL SQLSTATE '45000';
                END IF;
            END $$



delimiter ;
