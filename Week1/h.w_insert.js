var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world'
});

connection.connect();

let insert_countries_query = [
  "insert ignore into countries values('Estonia' , 1319133 , 'Europe' ,45227)",
  "insert ignore into countries values('Qatar' , 2641669 , 'Asia' ,11581)",
  "insert ignore into countries values('Georgia' , 3718200, 'Asia' ,69700)",
  "insert ignore into countries values('Syria' , 18284407, 'Asia' ,185180)",
  "insert ignore into countries values('Nigeria' , 190886311, 'Africa' ,923768)",
  "insert ignore into countries values('Netherlands' , 17272990, 'Europe' ,41543)",
  "insert ignore into countries values('Poland' , 38433600, 'Europe' ,312696)",
  "insert ignore into countries values('Finland' ,5520535 , 'Europe' ,338424)",
  "insert ignore into countries values('Armenia' ,2924816 , 'Asia' ,29743)",
  "insert ignore into countries values('Barbados' ,277821, 'North America',431)"
];

for (let i in insert_countries_query)
  connection.query(insert_countries_query[i], function (error, results) {
    if (error) throw error.message;
    console.log(`row ${i} was inserted into countries table successfully`);
  });

let insert_cities_query = [
  "insert ignore into cities values(1 ,'Tallinn', 426538, 'Estonia')",
  "insert ignore into cities values(2 ,'Tartu', 93124, 'Estonia')",
  "insert ignore into cities values(3 ,'Doha', 956457, 'Qatar')",
  "insert ignore into cities values(4 ,'Abu Samra', 984, 'Qatar')",
  "insert ignore into cities values(5 ,'Tbilisi', 1114000, 'Georgia')",
  "insert ignore into cities values(6 ,'Batum', 155000, 'Georgia')",
  "insert ignore into cities values(7 ,'Damascus', 1711000, 'Syria')",
  "insert ignore into cities values(8 ,'Aleppo', 1850000, 'Syria')",
  "insert ignore into cities values(9 ,'Abuja', 1235880, 'Nigeria')",
  "insert ignore into cities values(10 ,'lagos', 6048430, 'Nigeria')",
  "insert ignore into cities values(11 ,'Amsterdam', 821752, 'Netherlands')",
  "insert ignore into cities values(12 ,'Rotterdam', 623652, 'Netherlands')",
  "insert ignore into cities values(13 ,'Warsaw', 1764615, 'Poland')",
  "insert ignore into cities values(14 ,'Karkow', 769498, 'Poland')",
  "insert ignore into cities values(15 ,'Helsinki', 631695, 'Finland')",
  "insert ignore into cities values(16 ,'Copenhagen', 1402, 'Finland')",
  "insert ignore into cities values(17 ,'Yerevan', 1075800, 'Armenia')",
  "insert ignore into cities values(18 ,'Dilijan', 17712, 'Armenia')",
  "insert ignore into cities values(19 ,'Bridgetown', 110000, 'Barbados')",
  "insert ignore into cities values(20 ,'Speightstown', 3634, 'Barbados')"
];

for (let i in insert_cities_query) {
  connection.query(insert_cities_query[i], function (error, results) {
    if (error) throw error.message;
    console.log(`row ${i} was inserted into cities table successfully`);
  });
}

connection.end();

