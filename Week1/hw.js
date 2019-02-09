const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
});

connection.connect();

const CREATE_COUNTRY_TABLE =
  'CREATE TABLE IF NOT EXISTS country(country_name VARCHAR(20),population INT,continent TEXT,surface_area INT)';

const CREATE_CITY_TABLE =
  'CREATE TABLE IF NOT EXISTS city(city_name TEXT,population INT,country TEXT,surface_area INT)';

connection.query(CREATE_COUNTRY_TABLE, (error, result, fields) => {
  if (error) {
    throw error;
  }
  console.log(result);
});
connection.query(CREATE_CITY_TABLE, (error, result, fields) => {
  if (error) {
    throw error;
  }
  console.log(result);
});
const countries = [
  "INSERT INTO country VALUES('Nederland',17080000,'Europe',42508)",
  "INSERT INTO country VALUES('Iraq',37202572,'Western Asia',437072)",
  "INSERT INTO country VALUES('Germany',82790000,'Europe',357386)",
  "INSERT INTO country VALUES('United State',327167434,'North America',327167434)",
  "INSERT INTO country VALUES('Switzerland',8508898,'Europe',41285)",
  "INSERT INTO country VALUES('Greenland',55877,'Europe',2166086)",
  "INSERT INTO country VALUES('Russia',146793744,'East Europe',17125191)",
  "INSERT INTO country VALUES('China',1403500365,'ASia',9596961)",
  "INSERT INTO country VALUES('Egypt',94798827,'Africa',1010408)",
  "INSERT INTO country VALUES('Brazil',210147125,'South America',8515767)",
];
for (let i = 0; i < countries.length; i++) {
  connection.query(countries[i], (error, result, fields) => {
    if (error) {
      throw error;
    }
    console.log(result[0]);
  });
}
const cities = [
  "INSERT INTO city VALUES('Amsterdam',859732,'Nederland',219)",
  "INSERT INTO city VALUES('Paris',2140526,'France',105)",
  "INSERT INTO city VALUES('Maastricht',122397 ,'Nederland',56)",
  "INSERT INTO city VALUES('Berlin',3575000,'Germany',891)",
  "INSERT INTO city VALUES('Rotterdam',623652,'Nederland',320)",
  "INSERT INTO city VALUES('Minnesota',5570000,'United state',225163 )",
  "INSERT INTO city VALUES('Den Haag',527748,'Nederland',98)",
  "INSERT INTO city VALUES('Moscow',11503501,'Russia',2511 )",
  "INSERT INTO city VALUES('beijing',19612368,'China',16808 )",
  "INSERT INTO city VALUES('Baghdad',8765000,'Iraq',204)",
  "INSERT INTO city VALUES('Cairo',	19500000,'Egypt',606)",
];

for (let i = 0; i < cities.length; i++) {
  connection.query(cities[i], (error, result, fields) => {
    if (error) {
      throw error;
    }
    console.log(result[0]);
  });
}

connection.end();
