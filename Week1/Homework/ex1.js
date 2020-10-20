const mysql = require("mysql");
const connections ={
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword"
  }
const db = mysql.createConnection(connections);
  db.connect((err) => {
    if(err) throw err;
    console.log('connecting ...')
  });
function createMySQL_Query (mySQL_Command){
  db.query(mySQL_Command,(error,results,fields)=>{
    if (error) throw error ;
    // console.log(results)
});
}

createMySQL_Query('DROP DATABASE IF EXISTS meetup');
createMySQL_Query('CREATE DATABASE IF NOT EXISTS meetup');
createMySQL_Query('use meetup');
createMySQL_Query('CREATE TABLE Invitee (invitee_no INT, invitee_name VARCHAR(50), invited_by VARCHAR(50))');
createMySQL_Query('CREATE TABLE Room (room_no INT, room_name VARCHAR(50),floor_number INT)');
createMySQL_Query('CREATE TABLE Meeting (meeting_no INT, meeting_title VARCHAR(50), starting_time DATETIME, ending_time DATETIME,room_no INT )');

createMySQL_Query('INSERT INTO Invitee VALUES ("1","Sami","Colan")');
createMySQL_Query('INSERT INTO Invitee VALUES ("2","Nour","Yon")');
createMySQL_Query('INSERT INTO Invitee VALUES ("3","Max","Naya")');
createMySQL_Query('INSERT INTO Invitee VALUES ("4","Eva","Kila")');
createMySQL_Query('INSERT INTO Invitee VALUES ("5","Karben","Med")');

createMySQL_Query('INSERT INTO Room VALUES ("300","Red","3")');
createMySQL_Query('INSERT INTO Room VALUES ("301","Blue","3")');
createMySQL_Query('INSERT INTO Room VALUES ("302","Green","3")');
createMySQL_Query('INSERT INTO Room VALUES ("303","Yellow","3")');
createMySQL_Query('INSERT INTO Room VALUES ("304","White","3")');

createMySQL_Query('INSERT INTO Meeting VALUES ("1","Meeting Title","2020-02-01 09:30:00","2020-02-01 11:30:00","302")');
createMySQL_Query('INSERT INTO Meeting VALUES ("1","Meeting Title","2020-02-01 09:30:00","2020-02-01 11:30:00","301")');
createMySQL_Query('INSERT INTO Meeting VALUES ("1","Meeting Title","2020-02-01 09:30:00","2020-02-01 11:30:00","304")');
createMySQL_Query('INSERT INTO Meeting VALUES ("1","Meeting Title","2020-02-01 09:30:00","2020-02-01 11:30:00","300")');
createMySQL_Query('INSERT INTO Meeting VALUES ("1","Meeting Title","2020-02-01 09:30:00","2020-02-01 11:30:00","301")');


db.end();