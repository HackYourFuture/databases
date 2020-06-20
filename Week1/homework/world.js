const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "new_world",
});

connection.connect();

connection.query("SELECT * FROM city WHERE Population > 8000000", function ( error,result) {
 
    if (error) throw err;
  
     console.log(result);
});

connection.query("SELECT name FROM country WHERE name LIKE '%land%';", function ( error,result) {
      
    if (error) throw err;
      
        console.log(result);
    });

connection.query("SELECT name, population FROM city WHERE population BETWEEN 500000 AND 1000000;", function ( error,result) {
         
    if (error) throw err;
          
            console.log(result);
        });

connection.query("SELECT name FROM country WHERE continent = 'Europe';", function ( error,result) {
  
    if (error) throw err;
              
                console.log(result);
            });
            
connection.query("SELECT name, SurfaceArea FROM country ORDER BY SurfaceArea DESC;", function ( error,result) {
       
    if (error) throw err;
                  
        console.log(result);
                          });


connection.query("SELECT name, countryCode FROM city WHERE countryCode LIKE 'NLD'", function ( error,result) {
       
                            if (error) throw err;
                                          
                                console.log(result);
                             });



connection.query("SELECT name, population FROM city WHERE name = 'Rotterdam';", function ( error,result) {
       
    if (error) throw err;
                  
        console.log(result);
                          });

connection.query("SELECT name, SurfaceArea FROM country ORDER BY SurfaceArea DESC LIMIT 10;", function ( error,result) {
       
    if (error) throw err;
                  
        console.log(result);
                          });

connection.query("SELECT name, population FROM city ORDER BY population DESC LIMIT 10;", function ( error,result) {
       
    if (error) throw err;
                  
        console.log(result);
                          });
                          
connection.query("SELECT SUM(population)  AS 'Population of the World' FROM country;", function ( error,result) {
       
           if (error) throw err;
                                          
                console.log(result);
                             });