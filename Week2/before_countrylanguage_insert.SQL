DELIMITER $$
CREATE TRIGGER before_countrylanguage_insert
  BEFORE INSERT ON CountryLanguage 
  FOR EACH ROW
BEGIN
  DECLARE languageTrigger SMALLINT;
  DECLARE message VARCHAR(100);
  SET languageTrigger = (SELECT COUNT(language) FROM CountryLanguage JOIN country ON code = countryCode WHERE code = new.countryCode);
  IF languageTrigger >= 9
  THEN
    SET message = 'Warning: This country has equal or more than ten languages!';
    SET lc_messages=message; SIGNAL SQLSTATE '45000';
  END IF;
END $$
DELIMITER ;
