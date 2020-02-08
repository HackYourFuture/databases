var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'userdb'
});

connection.connect();
var insert_queries = [
                    "insert into student values ('Mehmet', 40, 'm', 'Turkey','1979-03-10', 178)",
                    "insert into student values ('Arya', 32, 'f', 'Turkey','1986-10-20', 173)"
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
