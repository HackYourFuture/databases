DELIMITER $$
CREATE TRIGGER language_trigger
  AFTER INSERT 
  ON countrylanguage 
  FOR EACH ROW
BEGIN
  DECLARE message VARCHAR(100);
  DECLARE language_Number INT;
  SET language_Number = (SELECT COUNT(Language) FROM countrylanguage JOIN country ON Code = Country_Code WHERE code = new.Country_Code);
  IF language_Number >= 10
  THEN
    SET message = 'Alert: no more languges can be added to the country!';
    SET lc_messages=message; SIGNAL SQLSTATE '45000';
  END IF;
END $$
DELIMITER ;

-- mysql> INSERT INTO countrylanguage VALUES('VNM', 'English', 'T', 0.0);                                                                                                               
-- ERROR 1649 (HY000): Unknown locale: 'Alert: no more languges can be added to the country!'