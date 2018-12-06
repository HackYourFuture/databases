const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world'
});

connection.connect();

// insert rows
const insert_query = [
  "insert ignore into countries values(001, 'Brazil', 211243220 , 'South America', 8358140	)",
  "insert ignore into countries values(002, 'USA', 326766748 , 'North America', 9147420	)",
  "insert ignore into countries values(003, 'Japan', 127185332 , 'Asia', 364555)",
  "insert ignore into countries values(004, 'Germany', 82293457 , 	'Europe', 348560)",
  "insert ignore into countries values(005, 'Turkey', 81916871 , 'Asia', 769630	)",
  "insert ignore into countries values(006, 'U.K.', 66573504 , 'Europe', 241930	)",
  "insert ignore into countries values(007, 'Ukraine', 44009214 , 'Europe', 579320)",
  "insert ignore into countries values(008, 'India', 1354051854	, 'Asia', 2973190		)",
  "insert ignore into countries values(009, 'Netherlands', 17084459 , 'Europe', 33720	)",
  "insert ignore into countries values(010, 'Qatar', 2694849 , 'Asia' , 11610	)",
  "insert ignore into countries values(011, 'Switzerland', 8544034 , 'Europe', 39516	)",
  "insert ignore into countries values(012, 'Argentina', 44688864 , 'South America', 2736690	)",
  "insert ignore into countries values(013, 'Canada', 36953765 , 'North America', 9093510	)",
  "insert ignore into countries values(014, 'Greece', 11142161 , 'Europe' , 128900	)",
  "insert ignore into countries values(015, 'Austria', 8751820 , 'Europe' , 82409	)",
  "insert ignore into countries values(016, 'Chad', 15353184 , 'Africa' , 1259200	)",
  "insert ignore into countries values(017, 'Rwanda', 12501156 , 'Africa' , 24670	)",
  "insert ignore into countries values(018, 'Thailand', 69183173 , 'Asia' , 510890	)",
  "insert ignore into countries values(019, 'Poland', 38104832 , 'Europe' , 306230	)",
  "insert ignore into countries values(020, 'Egypt', 100150951 , 'Africa' , 995450	)",

  "insert ignore into cities values(01, 'Amsterdam', 741636 , 009	)",
  "insert ignore into cities values(02, 'Rotterdam', 598199 , 009	)",
  "insert ignore into cities values(03, 'The Hague', 474292 , 009)",
  "insert ignore into cities values(04, 'Cairo', 19128000 , 020	)",
  "insert ignore into cities values(05, 'Kigali', 859332 , 017	)",
  "insert ignore into cities values(06, 'Basel', 164488 , 011	)",
  "insert ignore into cities values(07, 'Los Angeles', 3971883 , 002	)",
  "insert ignore into cities values(08, 'Teresina', 744512 , 001	)",
  "insert ignore into cities values(09, 'Munich', 1330440 , 004	)",
  "insert ignore into cities values(10, 'North York', 636000 , 013	)",
  "insert ignore into cities values(11, 'Chiang Mai', 200952 , 018	)",
  "insert ignore into cities values(12, 'Lublin', 360044 , 019	)",
  "insert ignore into cities values(13, 'Doha', 344939 , 010	)",
  "insert ignore into cities values(14, 'Rosario', 1173533 , 012	)",
  "insert ignore into cities values(15, 'Tokyo', 8336599 , 003	)",
]
for (let x in insert_query) {
  console.log("going to run" + insert_query[x]);
  connection.query(insert_query[x], function (error, results, fields) {
    if (error) {
      throw error;
    }
    console.log("the reply if", results[0]);
  })
}