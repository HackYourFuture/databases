delimiter $$
CREATE TRIGGER date_trigger
    BEFORE INSERT 
        ON emp_proj
            FOR EACH ROW
            BEGIN 
                DECLARE message VARCHAR(100);
                DECLARE project_start_date datetime ;
                DECLARE project_end_date datetime ;
                DECLARE employee_join_date datetime ;
                SET project_start_date = (select start_date from projects where proj_no=new.proj_no);
                SET project_end_date = (select end_date from projects where proj_no=new.proj_no);
                SET employee_join_date = (select start_djoining_date from employees where emp_no=new.emp_no);
                IF employee_join_date not between project_start_date and project_end_date 
                THEN 
                    set message= 'Employee start date is not within project dates';
                    SET lc_messages=message; SIGNAL SQLSTATE '45000';
                END IF;
            END $$

delimiter ;
