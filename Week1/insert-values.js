var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'class17'
});

connection.connect();
var insert_queries = [
                    "insert into students values (103, 'Ahmad', '1986-01-11', 8.3, 'm')",
                    "insert into students values (104, 'Rim', '1979-11-01', 8.7, 'f')",
                    "insert into students values (105, 'Rabia', '1978-05-30', 8.1, 'f')",
                    "insert into students values (106, 'Karam', '1994-02-02', 8.8, 'm')"
                    ]

for(var i in insert_queries){
    console.log("Going to run ", insert_queries[i])
    connection.query(insert_queries[i], function (error, results, fields) {
        if (error) {
            throw error;
        }
        console.log("the reply is ", results[0]);
    });
}
connection.end();
