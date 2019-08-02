module.exports.TRIGGER = `
  CREATE TRIGGER language_trigger
      BEFORE INSERT
          ON languages
              FOR EACH ROW
              BEGIN
                  DECLARE numberOfLanguage INT;
                  SET numberOfLanguage = (SELECT COUNT(language) FROM languages WHERE country_code = NEW.country_code);
                  IF (numberOfLanguage > 9)
                  THEN
                      SIGNAL SQLSTATE '45000'
                      SET MESSAGE_TEXT = 'You can not insert more than 10 languages for any country!';
                  END IF;
              END
`;
