CREATE DEFINER=`hyfuser`@`localhost` TRIGGER `countrylanguage_AFTER_INSERT` AFTER INSERT ON `countrylanguage` FOR EACH ROW BEGIN
declare languages_number int;

select count(CountryCode) into languages_number from countrylanguage where countrycode=new.countrycode;

 IF(languages_number >= 10) THEN 
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Alert: The country which related to the country code , was has now 10 or more languages. ';
    END IF;
    
END