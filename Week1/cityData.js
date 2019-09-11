const { checkAndCreate } = require('./dbUtils');
const insert = `INSERT INTO city(Name, CountryCode, District, Population) VALUES`;
const CREATE_CITY_TABLE = `
        ${checkAndCreate} city(
              ID int AUTO_INCREMENT,
              Name VARCHAR(50) DEFAULT '',
              CountryCode VARCHAR(3)  DEFAULT '',
              District VARCHAR(50)  DEFAULT '',
              Population INT  DEFAULT 0,
              PRIMARY KEY (ID));
              `;

const INSERT_CITY_QUERIES = `
       ${insert} 
               ('Amsterdam','NLD','Noord-Holland',731200),
               ('Rotterdam','NLD','Zuid-Holland',593321),
               ('Haag','NLD','Zuid-Holland',440900),
               ('Eindhoven','NLD','Noord-Brabant',201843),
               ('Groningen','NLD','Groningen',172701),
               ('Breda','NLD','Noord-Brabant',160398),
               ('Barcelona','ESP','Katalonia',1503451),
               ('Dubai','ARE','Dubai',669181),
               ('Austin','USA','Texas',656562),
               ('Portland','USA','Oregon',529121),
               ('Jerusalem','ISR','Jerusalem',633700),
               ('Mumbai (Bombay)','IND','Maharashtra',10500000),
               ('Shanghai','CHN','Shanghai',9696300),
               ('Seoul','KOR','Seoul',9981619),
               ('New York','USA','New York',8008278),
               ('Karachi','PAK','Sindh',9269265);`;

module.exports = {
  CREATE_CITY_TABLE,
  INSERT_CITY_QUERIES,
};
