//I WOULD LIKE TO MAKE IT STEP BY STEP
// SO BELOW, WE ARE STARTING A PROCEDURE AND WE ARE PASSING A PARAMETER INSIDE OF IT
// THIS PARAMETER TAKES A VARIABLE CHAR WITH MAXIMUM LENGTH OF 30
// BETWEEN BEGIN AND END, WE ARE TARGETING TWO COLUMNS 
// AFTER CREATING THIS PROCEDURE, NOW WE SHOULD BE ABLE TO CALL IT AND PASS A COUNTRY NAME AS AN ARGUMENT
USE `new_world`;
DROP procedure IF EXISTS `getSpokenLangNum`;

DELIMITER $$
USE `new_world`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getSpokenLangNum`(
IN countryName VARCHAR(30))
BEGIN
select Name, count(distinct language) as 'Spoken Languages'
from country, countrylanguage
where country.code=countrylanguage.countrycode
and country.name= countryName;
END$$

DELIMITER ;


//BELOW WE ARE MODYFYING THE CODE A LITTLE
// WE ARE DECLARING A VARIABLE BEFORE WE START TO OUR QUERY
// WE ARE ASSIGNING THIS VARIABLE TO OUR LANGUAGE COUNT IN ORDER TO USE IT LATER
// AFTER THE QUERY WE ARE MAKING AN IF STATEMENT
// NOW WHEN A COUNTRY HAS 10 OR MORE THAN 10 LANGUAGES, WE SHOULD GET AN ALERT
CREATE DEFINER=`root`@`localhost` PROCEDURE `getSpokenLangNum3`(
  IN countryName VARCHAR(30))
  BEGIN
  DECLARE spokenLang INT(100) DEFAULT 0;
  select count(distinct language) as 'Spoken Languages'
  INTO spokenLang
  from country, countrylanguage
  where country.code=countrylanguage.countrycode
  and country.name= countryName;
  
  IF spokenLang = 10 or spokenLang > 10 THEN
  select 'THIS COUNTRY HAS MORE THAN 10 LANGUAGES ' AS 'Message';
  END IF;
  END