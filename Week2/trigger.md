delimiter //


CREATE TRIGGER language_trigger
    BEFORE INSERT
        ON countrylanguage
            FOR EACH ROW
            BEGIN
                DECLARE numberOfLangs int ;
                SELECT count(language) INTO numberOfLangs FROM countrylanguage WHERE countrycode=new.countrycode;
                IF numberOfLangs >= 9
                THEN
                    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Maximum number of language for a country (10) exceeded';
                END IF;
            END //

delimiter ;

The countries which have 9 languages

SELECT
    country.name, countrycode, COUNT(language) count
FROM
    new_world.countrylanguage, new_world.country
WHERE
     country.code = countrylanguage.countrycode
GROUP BY countrycode
HAVING count = 9;

TEST

If new insert adds a new language to the country which has already 9 languages, triggers throw an error.

mysql> insert into new_world.countrylanguage values ('AGO', 'Trigger Test', 'F',0);

ERROR 1644 (45000): Maximum number of language for a country (10) exceeded