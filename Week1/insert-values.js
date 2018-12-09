var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world2'
});

connection.connect();
var insert_queries = [
  "insert into countries values (1, 'Nederland', 41543,17080000, 'Europe'   )",
  "insert into countries values (2, 'Turkey',783356,79810000 ,'Asia' )",
  "insert into countries values (3, 'Dutch',357386,82790000 ,'Europe' )",
  "insert into countries values (4, 'Moroccans',710850,35740000 ,'Africa' )",
  "insert into countries values (5, 'Indonesians',1905000,264000000 ,'Asia' )",
  "insert into countries values (6, 'Japan',377930, 126800000 , 'Asia')",
  "insert into countries values (7, 'France',640679,67120000 ,'Europe' )",
  "insert into countries values (8, 'India',3287000,1339000000 ,'Asia' )",
  "insert into countries values (9, 'Iraq',437072,38270000 , 'Asia')",
  "insert into countries values (10, 'Mali',1241000,18540000 ,'Africa' )",

  "insert into cities values(1, 'Amsterdam', 821752, 1)",
  "insert into cities values(2, 'Rotterdam', 623652, 1)",
  "insert into cities values(3, 'DenHaag', 534158, 1)",
  "insert into cities values(4, 'Utrecht', 330772, 1)",
  "insert into cities values(5, 'Eindhoven', 223209, 1)",
  "insert into cities values(6, 'Tilburg', 206234, 1)",
  "insert into cities values(7, 'Groningen', 579034, 1)",
  "insert into cities values(8, 'Breda', 180937, 1)",
  "insert into cities values(9, 'Apeldoorn', 157057, 1)",
  "insert into cities values(10, 'Nijmegen', 165253, 1)",
  "insert into cities values(11, 'Enschede', 115548, 1)",
  "insert into cities values(12, 'Haarlem', 155147, 1)",
  "insert into cities values(13, 'Almere', 196013, 1)",
  "insert into cities values(14, 'Arnhem', 150823, 1)",
  "insert into cities values(15, 'Zaanstad', 150598, 1)",
  "insert into cities values(16, 'Hertogenbosch', 141906, 1)",
  "insert into cities values(17, 'Amersfoort', 150897, 1)",
  "insert into cities values(18, 'Maastricht', 122488, 1)",
  "insert into cities values(19, 'Dordrecht', 119009, 1)",
  "insert into cities values(20, 'Leiden', 121163, 1)",
  "insert into cities values(21, 'Haarlemmermeer', 144061, 1)",
  "insert into cities values(22, 'Zoetermeer', 123561, 1)",
  "insert into cities values(23, 'Emmen', 108052, 1)",
  "insert into cities values(24, 'Zwolle', 123159, 1)",
  "insert into cities values(25, 'Ede', 110656, 1)",
  "insert into cities values(26, 'Delft', 100046, 1)",
  "insert into cities values(27, 'Heerlen', 88259, 1)",
  "insert into cities values(28, 'Alkmaar', 106857, 1)",
  "insert into cities values(29, 'Istanbul', 15030000,2)",
  "insert into cities values(30, 'Ankara', 5445000,2)"
]

for (var i in insert_queries) {
  console.log("Going to run ", insert_queries[i])
  connection.query(insert_queries[i], function (error, results, fields) {
    if (error) {
      throw error;
    }
  });
}
connection.end();
