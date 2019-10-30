const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'world',
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected...');
});

function inject(val) {
  for (let i in val) {
    connection.query(val[i], function(err) {
      if (err) console.log(`message: ${err}`);
      console.log('Data has been injected into the table');
    });
  }
}

/*Country table model: ID, Name, Continent, Region, SurfaceArea, IndepYear, Population, LifeExpectancy, GNP, GNPOld, LocalName, GovernmentForm, HeadOfState, Capital */
let countries = [
  "insert into country values ( NULL ,'Syria', 'Asia', 'Middle East','185180.00','1941', '16125000', '68.5','65984.00', '64926.00', 'Suriya', 'Republic', 'MF', 'Damascus'  )",
  "insert into country values ( NULL, 'Netherlands', 'Europe', 'Western Europe', '41526.00', '1581', '15864000', '78.3', '371362.00', '360478.00', 'Nederland', 'Constitutional Monarchy', 'Beatrix', 'Amsterdam')",
  "insert into country values ( NULL, 'Australia', 'Oceania', 'Australia and New Zealand', '7741220.00', '1901', '18886000', '79.8', '351182.00', '392911.00', 'Australia', 'Constitutional Monarchy, Federation', 'Elisabeth II', 'Sidney')",
  "insert into country values ( NULL, 'Belgium', 'Europe', 'Western Europe', '30518.00', '1830', '10239000', '77.8', '249704.00', '243948.00', 'Belgia/Belgique', 'Constitutional Monarchy, Federation', 'Albert II', 'Brussels')",
  "insert into country values ( NULL, 'Germany', 'Europe', 'Western Europe', '357022.00', '1955', '82164700', '77.4', '2133367.00', '2102826.00', 'Deutschland', 'Federal Republic', 'Johannes Rau', 'Berlin')",
  "insert into country values ( NULL, 'Ireland', 'Europe', 'British Islands', '70273.00', '1921', '3775100', '76.8', '75921.00', '73132.00', 'Ireland/Ã‰ire', 'Republic', 'Mary McAleese', 'Dublin')",
  "insert into country values ( NULL, 'Spain', 'Europe', 'Southern Europe', '505992.00', '1492', '39441700', '78.8', '553233.00', '532031.00', 'Espar±a', 'Constitutional Monarchy', 'Juan Carlos I', 'Madrid')",
  "insert into country values ( NULL, 'France', 'Europe', 'Western Europe', '551500.00', '843', '59225700', '78.8', '1424285.00', '1392448.00', 'France', 'Republic', 'Emmanuel Macron', 'Paris')",
  "insert into country values ( NULL, 'Swaziland', 'Africa', 'Southern Africa', '17364.00', '1968', '1008000', '40.4', '1206.00', '1312.00', 'kaNgwane', 'Monarchy', 'Mswati III', 'Mbabane')",
];

//City table model: ID, Name, CountryCode, District, Population
let cities = [
  "insert into city values (NULL, 'Damascus', 'SYR', 'Damascus', '1347000')",
  "insert into city values (NULL, 'Amsterdam', 'NLD', 'Noord-Holland', '731200')",
  "insert into city values (NULL, 'Eindhoven', 'NLD', 'Noord-Brabant', '201843')",
  "insert into city values (NULL, 'Rotterdam', 'NLD', 'Zuid-Holland', '593321')",
  "insert into city values (NULL, 'Den Haag', 'NLD', 'Zuid-Holland', '440900')",
  "insert into city values (NULL, 'Utrecht', 'NLD', 'Utrecht', '234323')",
  "insert into city values (NULL, 'Mumbai (Bombay)', 'IND', 'Maharashtra', '10500000')",
  "insert into city values (NULL, 'Baghdad', 'IRQ', 'Baghdad', '4336000')",
  "insert into city values (NULL, 'Leipzig', 'DEU', 'Saksi', '489532')",
  "insert into city values (NULL, 'Paris', 'FRA', 'Île-de-France', '2125246')",
];

inject(countries);
inject(cities);
connection.end();
