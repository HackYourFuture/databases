const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'myWorld'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

let country = [
    "insert into country values ('Aruba', 'North America', 'Caribbean', '193.00', NULL, '103000', '78.4', '828.00', '793.00', 'Aruba', 'Nonmetropolitan Territory of The Netherlands', 'Beatrix', 'Oranjestad')",
    "insert into country values ('Afghanistan', 'Asia', 'Southern and Central Asia', '652090.00', '1919', '22720000', '45.9', '5976.00', NULL, 'Afganistan/Afqanestan', 'Islamic Emirate', 'Mohammad Omar', 'Kabil')",
    "insert into country values ('Angola', 'Africa', 'Central Africa', '1246700.00', '1975', '12878000', '38.3', '6648.00', '7984.00', 'Angola', 'Republic', 'Jose Eduardo dos Santos', 'Luanda')",
    "insert into country values ('Netherlands Antilles', 'North America', 'Caribbean', '800.00', NULL, '217000', '74.7', '1941.00', NULL, 'Nederlandse Antillen', 'Nonmetropolitan Territory of The Netherlands', 'Beatrix', 'Curaçao')",
    "insert into country values ('Australia', 'Oceania', 'Australia and New Zealand', '7741220.00', '1901', '18886000', '79.8', '351182.00', '392911.00', 'Australia', 'Constitutional Monarchy, Federation', 'Elisabeth II', 'Sidney')",
    "insert into country values ('Belgium', 'Europe', 'Western Europe', '30518.00', '1830', '10239000', '77.8', '249704.00', '243948.00', 'Belgia/Belgique', 'Constitutional Monarchy, Federation', 'Albert II', 'Brussels')",
    "insert into country values ('Brazil', 'South America', 'South America', '8547403.00', '1822', '170115000', '62.9', '776739.00', '804108.00', 'Brasil', 'Federal Republic', 'Fernando Henrique Cardoso', 'Brasilia')",
    "insert into country values ('Germany', 'Europe', 'Western Europe', '357022.00', '1955', '82164700', '77.4', '2133367.00', '2102826.00', 'Deutschland', 'Federal Republic', 'Johannes Rau', 'Berlin')",
    "insert into country values ('Spain', 'Europe', 'Southern Europe', '505992.00', '1492', '39441700', '78.8', '553233.00', '532031.00', 'Espar±a', 'Constitutional Monarchy', 'Juan Carlos I', 'Madrid')",
    "insert into country values ('France', 'Europe', 'Western Europe', '551500.00', '843', '59225700', '78.8', '1424285.00', '1392448.00', 'France', 'Republic', 'Jacques Chirac', 'Paris')",
    "insert into country values ('Ireland', 'Europe', 'British Islands', '70273.00', '1921', '3775100', '76.8', '75921.00', '73132.00', 'Ireland/Ã‰ire', 'Republic', 'Mary McAleese', 'Dublin')",
    "insert into country values ('Madagascar', 'Africa', 'Eastern Africa', '587041.00', '1960', '15942000', '55.0', '3750.00', '3545.00', 'Madagasikara/Madagascar', 'Federal Republic', 'Didier Ratsiraka', 'Antananarivo')",
    "insert into country values ('Namibia', 'Africa', 'Southern Africa', '824292.00', '1990', '1726000', '42.5', '3101.00', '3384.00', 'Namibia', 'Republic', 'Sam Nujoma', 'Windhoek')"
  ];
  for (let i in country) {
    console.log(country[i]);
    connection.query(country[i], function(error, results) {
      if (error) {
        throw error;
      }
      console.log(results[0]);
    });
  }

  let city = [
    "insert into city values(NULL,'Amsterdam', 'NLD', 'Noord-Holland', '731200')",
    "insert into city values(NULL, 'Eindhoven', 'NLD', 'Noord-Brabant', '201843')",
    "insert into city values(NULL, 'Rotterdam', 'NLD', 'Zuid-Holland', '593321')",
    "insert into city values(NULL, 'Brasilia', 'BRA', 'Distrito Federal', '1969868')",
    "insert into city values(NULL, 'Shanghai', 'CHN', 'Shanghai', '9696300')",
    "insert into city values (NULL, 'Seoul', 'KOR', 'Seoul', '9981619')",
    "insert into city values(NULL, 'Mumbai (Bombay)', 'IND', 'Maharashtra', '10500000')",
    "insert into city values(NULL, 'Karachi', 'PAK', 'Sindh', '9269265')",
    "insert into city values (NULL, 'Jakarta', 'IDN', 'Jakarta Raya', '9604900')",
    "insert into city values(NULL, 'Ajman', 'ARE', 'Ajman', '114395')",
    "insert into city values(NULL, 'Moreno', 'ARG', 'Buenos Aires', '356993')",
    "insert into city values (NULL, 'Sydney', 'AUS', 'New South Wales', '3276207')",
    "insert into city values(NULL, 'Canberra', 'AUS', 'Capital Region', '322723')",
    "insert into city values(NULL, 'Jessore', 'BGD', 'Khulna', '139710')"
  ];
  
  for (let i in city) {
    console.log(city[i]);
    connection.query(city[i], function(error, results) {
      if (error) {
        throw error;
      }
      console.log(results[0]);
    });
  }
});