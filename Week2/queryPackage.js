
const languagesInACountry = `with langs as
                            (select country.Name, country.Code, countrylanguage.Language
                                from new_world.country join new_world.countrylanguage
                                on country.Code = countrylanguage.CountryCode)
                            select Language from langs where Name = ?`;

                            
const capitalCityQuery = `with result as
                        (select city.name as Capital, country.name as Country
                            from new_world.country join new_world.city
                            on country.Capital=city.ID)
                        select Capital from result where Country = ?`


const numberOfCitiesLangSpoken = `with result as
                                (select countrylanguage.Language, countrylanguage.CountryCode, city.Name
                                from new_world.countrylanguage join new_world.city
                                on countrylanguage.CountryCode = city.CountryCode)
                                select * from result where Language = ?`


const languagesInARegion = `with result as
                    (select country.Name, country.Region, country.Code, countrylanguage.Language
                        from new_world.country join new_world.countrylanguage
                        on country.Code = countrylanguage.CountryCode)
                    select Language from result where Region = ?`


const officialLanguagesInRegion = `with result as
                                (select country.Name, country.Region, country.Code, 
                                    countrylanguage.Language, countrylanguage.IsOfficial
                                    from new_world.country join new_world.countrylanguage
                                    on country.Code = countrylanguage.CountryCode)
                                select Name from result where Region like '%Europe%' and 
                                Language like '%Dutch%' and IsOfficial like '%T'`




const trigger = `
create table languages as
    (select country.Name, country.Code, countrylanguage.Language
        from new_world.country join new_world.countrylanguage
        on country.Code = countrylanguage.CountryCode);
# select * from languages;

alter table languages
add langnumber INT;


with result as
(select name,count(distinct language) as langnumber from languages group by name)
  select *
from result;



# with result as
#     (select name,count(distinct language) from languages group by name),
# create trigger langcheck after insert on languages for each row IF count(DISTINCT language) > 10
#     THEN set lc_messages = 'alert!';
#     END IF;

delimiter $$
CREATE TRIGGER date_trigger
    AFTER INSERT
        ON languages
            FOR EACH ROW
            BEGIN
                DECLARE message VARCHAR(100);
#                 DECLARE project_start_date datetime ;
#                 DECLARE project_end_date datetime ;
                DECLARE language_count INTEGER ;
#                 SET project_start_date = (select start_date from projects where proj_no=new.proj_no);
#                 SET project_end_date = (select end_date from projects where proj_no=new.proj_no);
                 SET language_count = (select count(distinct language) from languages group by name);
                IF language_count >= 10
                THEN
                    set message = 'Number of languages are now 10 or more.';
                    SET lc_messages=message; SIGNAL SQLSTATE '45000';
                END IF;
            END $$
delimiter ;

drop trigger date_trigger;
`


module.exports = {languagesInACountry,capitalCityQuery,numberOfCitiesLangSpoken,languagesInARegion,officialLanguagesInRegion}
