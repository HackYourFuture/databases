const mysql = require("mysql");
const connections ={
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
    database: "new_world"
  }
const db = mysql.createConnection(connections);
  db.connect((err) => {
    if(err) throw err;
    console.log('connecting ...')
  });
function createMySQL_Query (mySQL_Command){
  db.query(mySQL_Command,(error,results,fields)=>{
    if (error) throw error ;
    console.table(results)
});
}

createMySQL_Query('SELECT Name FROM country WHERE Population > 8000000');
createMySQL_Query('SELECT Name FROM country WHERE name LIKE "%land%"');
createMySQL_Query('SELECT Name FROM country WHERE Population BETWEEN 500000 AND 1000000');
createMySQL_Query('SELECT Name FROM country ORDER BY SurfaceArea DESC' );
createMySQL_Query('SELECT Name FROM City where CountryCode = "NLD"' );
createMySQL_Query('SELECT Population FROM City where Name = "Rotterdam"' );
createMySQL_Query('SELECT Name FROM country ORDER BY SurfaceArea DESC LIMIT 10' );
createMySQL_Query('SELECT Name FROM country ORDER BY Population DESC LIMIT 10' );
createMySQL_Query('SELECT Population FROM country ORDER BY Population DESC LIMIT 1' );
db.end();