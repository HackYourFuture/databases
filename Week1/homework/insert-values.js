const mysql = require('mysql');
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'myWorld',
});

conn.connect();
const insert_country_queries = [
  "insert into country values('Tonga', 'Oceania', 'Polynesia', 748 , '1970-07-04', 100.651, 64, 20.09, 20.58, 'Puleʻanga Fakatuʻi ʻo Tonga/Tonga ', 'Constitutional Monarchy', 'Tupou VI', 'Nukuʻalofa' )",
  "insert into country values('Afghanistan', 'Asia', 'Southern-Asia', 652230, '1919-08-19', 32225560, 63, 20.09, 20.58, 'Islamic Republic of Afghanistan', 'Republic', 'Gani Ahmedzai', 'Kabul')",
  "insert into country values('Burundi', 'Africa', 'Eastern Asia', 27834, '1962-07-01', 10524117, 57, 10.09, 11.48, 'Republic of Burundi', 'Republic', 'Pierre Nkurunziza', 'Gitega')",
  "insert into country values('India', 'Asia', 'Southern Asia', 3287263, '1947-08-15', 1324171354, 67, 22.06, 18.48	, 'Republic of India', 'Republic', '	Ram Nath Kovind', 'Delhi' )",
  "insert into country values('Italy', 'Europe', 'Southern Europe', 301340, '1946-06-18', 60483973, 82, 19.95, 21.83, ' Repubblica Italiana/Italy/Italia', 'Republic', 'Sergio Mattarella', 'Rome' )",
  "insert into country values('The Netherlands', 'Europe', 'Western Europe', 41543, '1648-05-16', 17336891, 81, 90.90, 89.90, 'Nederland/The Netherlands/Holland', 'Constitutional Monarchy', 'Willem-Alexander', 'Amsterdam' )",
  "insert into country values('Oman', 'Asia', 'Western Asia', 309500, '1650-11-18', 4424762, 73, 20.09, 20.58, 'Sultanate of Oman/Umman/سلطنة عُمان', 'Absolute Monarchy', 'Qaboos bin Said al Said', 'Muscat' )",
  "insert into country values('Thailand', 'Asia', 'South-Eastern Asia', 513120, '1238-00-00', 68863514, 74, 20.09, 20.58, 'ราชอาณาจักรไทย/Kingdom of Thailand ', 'Constitutional Monarchy', '	Maha Vajiralongkorn', 'Bankok' )",
];

const city_queries = [
  "insert into city values(id,'Farrukhabad-cum', 'IND', 'Uttar-Pradesh', 194567)",
  "insert into city values(id,'Istanbul', 'TUR', 'Istanbul', 8787958)",
  "insert into city values(id,'Emmen', 'NLD', 'Drenthe', 105853)",
  "insert into city values(id,'Padova', 'ITA', 'Veneto', 211391)",
  "insert into city values(id,'Kawasaki', 'JPN', 'Kanagawa', 1217359)",
  "insert into city values(id,'York', 'GBR', 'England', 104425)",
  "insert into city values(id,'Odessa', 'USA', 'Texas', 89293)",
  "insert into city values(id,'Kanchipuram', 'IND', 'Tamil Nadu', 150100)",
  "insert into city values(id,'Haarlem', 'NLD', 'Noord-Holland', 148772)",
  "insert into city values(id,'Amsterdam', 'NLD', 'Noord-Holland', 731200)",
];

for (let i in insert_country_queries) {
  conn.query(insert_country_queries[i], function(error, results, fields) {
    if (error) {
      throw error;
    }
    console.log('the reply is ', results[0]);
  });
}

for (let i in city_queries) {
  conn.query(city_queries[i], function(error, results, fields) {
    if (error) {
      throw error;
    }
    console.log('the reply is ', results[0]);
  });
}
conn.end();
