
DROP TRIGGER IF EXISTS country_language;
    DELIMITER @Salih@
    CREATE TRIGGER country_language
    BEFORE INSERT ON countrylanguage 
    FOR EACH ROW
         BEGIN
            DECLARE msg varchar(128) DEFAULT 'A country cannot have more than 9 languages';
            DECLARE number_of_languages INT;                      
            SET number_of_languages = (
                    SELECT COUNT(Language)
                    FROM countrylanguage                  
                    WHERE CountryCode = NEW.CountryCode);
            IF number_of_languages >= 9
            THEN
              signal sqlstate '45000' set message_text = msg;         
            END IF;
        END @Salih@
  DELIMITER ;