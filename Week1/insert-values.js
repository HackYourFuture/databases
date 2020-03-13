var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'company'
});

connection.connect();
var insert_queries = [
                    "insert into employees values (107, 'Ibra', 2000,'1979-03-10', 'm')",
                    "insert into employees values (108, 'Maria', 3500,'2018-05-19', 'f')",
                    "insert into employees values (109, 'Kaka', 1500,'2019-04-10', 'm')"
                    ]

for(var i in insert_queries){
    console.log("Going to run ", insert_queries[i]) // [] subscript operator : Of 
    connection.query(insert_queries[i], function (error, results, fields) {
        if (error) {
            throw error;
        }
        console.log("the reply is ", results[0]);
    });
}
connection.end();
