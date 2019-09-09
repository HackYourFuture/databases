var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'myWorld'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var tables = [
        "CREATE TABLE country (Country_ID int, Country_Name char(52) ,Continent enum('Asia','Europe','North America','Africa','Oceania','Antarctica','South America') ,Region char(50),SurfaceArea float,Population int,LifeExpectancy float, GNP float ,GNPOld float, LocalName char(50),GovernmentForm char(50),HeadOfState char(50),Capital char(50))",
        "CREATE TABLE city (ID int,City_Name char(50),CountryCode varchar(50),District varchar(50),Population int)"
    ];
    for (var i in tables) {
    connection.query(tables[i], function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
}
});