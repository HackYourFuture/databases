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
   let tables = [
        "CREATE TABLE country (Name varchar(50) ,Continent enum('Asia','Europe','North America','Africa','Oceania','Antarctica','South America') ,Region varchar(50),SurfaceArea float, IndepYear int, Population int,  LifeExpectancy float, GNP float ,GNPOld float, LocalName varchar(50), GovernmentForm varchar(50),HeadOfState varchar(50), Capital varchar(50))",
        "CREATE TABLE city (ID int auto_increment primary key, Name varchar(50), CountryCode varchar(50), District varchar(50), Population int)"
    ];
    for (let i in tables) {
    connection.query(tables[i], function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
}
});

