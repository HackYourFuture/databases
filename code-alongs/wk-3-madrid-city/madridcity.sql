CREATE VIEW madridcity AS 
select city.ID, city.Name AS Name,city.CountryCode AS CountryCode,city.District AS District, city.Population AS Population,
((city.Population / country.Population) * 100) AS pop_percentage 
from city join country on (city.CountryCode = country.Code) and (country.Name = 'Spain') and (city.District = 'Madrid');

CREATE TABLE `users` IF NOT EXISTS (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `first_name` text NOT NULL,
  `last_name` text,
  `email` text NOT NULL,
  `money` float DEFAULT '0',
  PRIMARY KEY (`id`)
);

insert into users VALUES (3, 'Me', 'Am i not incredible?', 'myemail@hackyourfuture.be', 100);
insert into users VALUES (4, 'My lender', 'A lot of money person', 'alotofmoney@hackyourfuture.be', 10000); 
commit;

