const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'myWorld',
});

connection.connect();

connection.query('USE myWorld;', error => {
  if (error) throw error;
  console.log(`you accessed the database 'world'`);
});

function addValue(val) {
  for (let i in val) {
    connection.query(val[i], function(err) {
      if (err) console.log(`message: ${err}`);
      console.log('Data has been added into the table');
    });
  }
}

let countries = [
  "insert ignore into countries values ( NULL ,'Argentina', 'South America', 'South America','2780400.00','1816', '16125000', '75.1','340238.0','323310.0', 'Argentina', 'Federal Republic', 'Fernando de la', 'Buenos Aires' )",
  "insert ignore into countries values ( NULL, 'Brazil', 'South America', 'South America', '8547403.00', '1822', '18886000', '62.9', '776739.00', '804108.00', 'Brasil', 'Federal Republic', 'Fernando Henrique Cardoso', 'Brazil')",
  "insert ignore into countries values ( NULL, 'Belgium', 'Europe', 'Western Europe', '30518.00', '1830', '10239000', '77.8', '249704.00', '243948.00', 'Belgique', 'Constitutional Monarchy, Federation', 'Albert II', 'Brussels')",
  "insert ignore into countries values ( NULL, 'Germany', 'Europe', 'Western Europe', '357022.00', '1955', '82164700', '77.4', '2133367.00', '2102826.00', 'Deutschland', 'Federal Republic', 'Johannes Rau', 'Berlin')",
  "insert ignore into countries values ( NULL, 'Russian Federation', 'Europe', 'Eastern Europe', '17075400.00', '1991', '146934000', '67.2', '276608.00', '442989.00', 'Rossija', 'Federal Republic', 'Vladimir Putin', 'Moscow')",
  "insert ignore into countries values ( NULL, 'Spain', 'Europe', 'Southern Europe', '505992.00', '1492', '39441700', '78.8', '553233.00', '532031.00', 'Espar±a', 'Constitutional Monarchy', 'Juan Carlos I', 'Madrid')",
  "insert ignore into countries values ( NULL, 'France', 'Europe', 'Western Europe', '551500.00', '843', '59225700', '78.8', '1424285.00', '1392448.00', 'France', 'Republic', 'Emmanuel Macron', 'Paris')",
  "insert ignore into countries values ( NULL, 'Turkey', 'Europe', 'Europe', '774815.00', '1923', '66591000', '71.0', '210721.00', '189122.00', 'Turkiye', 'Republic', 'Ataturk', 'Ankara')",
  "insert ignore into countries values ( NULL, 'Netherlands', 'Europe', 'Western Europe', '41526.00', '1581', '15864000', '78.3', '371362.00', '360478.00', 'Netherland', 'Constitutional Monarchy', 'Beatrix', 'Amsterdam')",
];

let cities = [
  "insert ignore into cities values (NULL, 'Istanbul', 'TUR', 'Istanbul', '8787958')",
  "insert ignore into cities values (NULL, 'Eskisehir', 'TUR', 'Eskisehir', '470781')",
  "insert ignore into cities values (NULL, 'Antananarivo', 'MDG', 'Antananarivo', '675669')",
  "insert ignore into cities values (NULL, 'Bangkok', 'THA', 'Bangkok', '6320174')",
  "insert ignore into cities values (NULL, 'Edinburgh', 'GBR', 'Edinburgh', '450180')",
  "insert ignore into cities values (NULL, 'Utrecht', 'NLD', 'Utrecht', '234323')",
  "insert ignore into cities values (NULL, 'Manchester', 'GBR', 'England', '430000')",
  "insert ignore into cities values (NULL, 'Newcastle', 'AUS', 'New South Wales', '270324')",
  "insert ignore into cities values (NULL, 'Groningen', 'NLD', 'Groningen', '172701')",
  "insert ignore into cities values (NULL, 'Paris', 'FRA', 'Île-de-France', '2125246')",
];

addValue(countries);
addValue(cities);
connection.end();
