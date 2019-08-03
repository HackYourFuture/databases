create table test if not exists(country_name varchar(50),language varchar(50))
delimiter //
    CREATE TRIGGER languages_trigger BEFORE INSERT ON test FOR EACH ROW 
    BEGIN  
        DECLARE alert VARCHAR(200);  
        DECLARE language_num INT; 
        SET language_num = (select count(language) from test where country_name = new.country_name);  
        IF language_num = 9
          THEN 
          SET alert= 'This country has already 9 languages which is the limited number of languages in a country';  
          SET lc_messages = alert; SIGNAL SQLSTATE '45000'; 
        END IF; 
    END//
delimiter ;
    
INSERT INTO test VALUES ('Netherlands','Dutch');
INSERT INTO test VALUES ('Netherlands','English');
INSERT INTO test VALUES ('Netherlands','Arabic');
INSERT INTO test VALUES ('Netherlands','French');
INSERT INTO test VALUES ('Netherlands','Spanish');
INSERT INTO test VALUES ('Netherlands','Italian');
INSERT INTO test VALUES ('Netherlands','Japaneese');
INSERT INTO test VALUES ('Netherlands','Hendi');
INSERT INTO test VALUES ('Netherlands','Farsi');

