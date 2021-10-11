delimiter $$
CREATE TRIGGER start_date_trigger
BEFORE INSERT
ON employee

FOR EACH ROW
    BEGIN
    DECLARE message varchar(100);
        IF new.starting_date > '2022-01-01'
        THEN
            set message='Employees cannot start in the year 2022';
            SET lc_messages=message;
            SIGNAL SQLSTATE '45000';
        END IF;
    END $$
