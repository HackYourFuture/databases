const checkAndCreate = 'CREATE TABLE IF NOT EXISTS';
const insert = `INSERT INTO country 
                (Code, Name, Continent, Region, SurfaceArea, 
                IndepYear, Population, LifeExpectancy, GNP, GNPOld, 
                LocalName, GovernmentForm, HeadOfState, Capital) VALUES`;
const CREATE_COUNTRY_TABLE = `
                ${checkAndCreate} country(
                Code  VARCHAR(3) NOT NULL DEFAULT '',
                Name  VARCHAR(52) NOT NULL DEFAULT '',
                Continent  enum('Asia','Europe','North America','Africa','Oceania','Antarctica','South America') NOT NULL,
                Region  VARCHAR(26) NOT NULL DEFAULT '',
                SurfaceArea  FLOAT(10,2) NOT NULL DEFAULT 0.00,
                IndepYear  SMALLINT(6) DEFAULT NULL,
                Population  INT(11) NOT NULL DEFAULT 0,
                LifeExpectancy  FLOAT(3,1) DEFAULT NULL,
                GNP  FLOAT(10,2) DEFAULT NULL,
                GNPOld  FLOAT(10,2) DEFAULT NULL,
                LocalName  VARCHAR(45) NOT NULL DEFAULT '',
                GovernmentForm  VARCHAR(45) NOT NULL DEFAULT '',
                HeadOfState  VARCHAR(60),
                Capital  VARCHAR(20) NOT NULL,
                Code2  VARCHAR(2) NOT NULL DEFAULT '',
                PRIMARY KEY (Code)
              )`;

const INSERT_COUNTRY_QUERIES = `
            ${insert} 
              ('BEL','Belgium','Europe','Western Europe',30518.00,1830,10239000,77.8,249704.00,243948.00,'Belgi/Belgique','Constitutional Monarchy, Federation','Albert II', 'Brussels'),
              ('BGD','Bangladesh','Asia','Southern and Central Asia',143998.00,1971,129155000,60.2,32852.00,31966.00,'Bangladesh','Republic','Shahabuddin Ahmad', 'Dhaka'),
              ('NLD','Netherlands','Europe','Western Europe',41526.00,1581,15864000,78.3,371362.00,360478.00,'Nederland','Constitutional Monarchy','Beatrix', 'Amsterdam'),
              ('SWZ','Swaziland','Africa','Southern Africa',17364.00,1968,1008000,40.4,1206.00,1312.00,'kaNgwane','Monarchy','Mswati III', 'Eswatini'),
              ('AUT','Austria','Europe','Western Europe',83859.00,1918,8091800,77.7,211860.00,206025.00,'sterreich','Federal Republic','Thomas Klestil', 'Vienna')`;

module.exports = {
  CREATE_COUNTRY_TABLE,
  INSERT_COUNTRY_QUERIES,
};
