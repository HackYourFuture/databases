
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

