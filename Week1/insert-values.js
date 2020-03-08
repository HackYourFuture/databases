var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'company'
});

connection.connect();
var insert_queries = [
                    "insert into employees values (106, 'Ibrahim', 2000, '2019-03-10', 'm')",
                    "insert into employees values (107, 'Ali', 3000, '2019-04-10', 'm')",
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
