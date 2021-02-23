const  mysql      = require('mysql');
const  connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  port : 3306
});

connection.connect(err => {
  if (err) throw err;
  console.log(" DB meetup IS connected..");
});

// Delete DB IF  existed..!
connection.query(("DROP DATABASE IF EXISTS meetup"), (error, results, fields) => {
  if (error) throw error;
  console.log("Database is deleted.");
});

// Create new meetup database ..!
connection.query(("CREATE DATABASE meetup"), (error, results, fields) => {
  if (error) throw error;
  console.log("Database is created.");
});

// Use new meetup database ......
connection.query(("USE meetup"), (error, results, fields) => {
  if (error) throw error;
});


const create_Invitee = "create table Invitee (invitee_no int, invitee_name varchar(50),  invited_by varchar(50))";

const create_Room  = "create table Room (room_no int, room_name varchar(50), floor_number int)";

const create_Meeting  = "create table Meeting (meeting_no int, meeting_title varchar(50),  starting_time date , ending_time date)";

function tables(create_query){
  connection.query(create_query, function (error, results, fields) {
      if (error) {
          throw error;
      }
      console.log(`Table is created ${create_query}`);
  });
};

tables(create_Invitee);
tables(create_Room);
tables(create_Meeting);

const array_invitee = ["INSERT INTO Invitee VALUES (1, 'Dan', 'fade')","INSERT INTO Invitee VALUES (2, 'sarah', 'nizami')","INSERT INTO Invitee VALUES (3, 'marwa', 'khalid')","INSERT INTO Invitee VALUES (4, 'atabek', 'ahmed')","INSERT INTO Invitee VALUES (5,'ehab','ali')"];

 const array_room = ["INSERT INTO Room VALUES (1, 'Dan', 10)","INSERT INTO Room VALUES (2, 'manal', 20)","INSERT INTO Room VALUES (3, 'yasmin', 30)","INSERT INTO Room VALUES (4, 'ellen', 40)","INSERT INTO Room VALUES (5, 'asmaa', 40)"];

 const array_meeting = ["INSERT INTO Meeting VALUES (1, 'html', '2020-01-01 10:10:10','2020-01-01 10:10:10')","INSERT INTO Meeting VALUES (2, 'css', '2020-01-01 10:10:10','2020-01-01 10:10:10')","INSERT INTO Meeting VALUES (3, 'js1', '2020-01-01 10:10:10','2020-01-01 10:10:10')","INSERT INTO Meeting VALUES (4, 'JS2', '2020-01-01 10:10:10','2020-01-01 10:10:10')","INSERT INTO Meeting VALUES (5, 'js3', '2020-01-01 10:10:10','2020-01-01 10:10:10')"];

function insert_data (array){
  array.forEach(element => {
    connection.query(element, function (error, results, fields) {
      if (error) {
          throw error;
      }
      console.log(`data is attached to ${element} Table` );
  });
    
  });
};

insert_data(array_invitee);
insert_data(array_room);
insert_data(array_meeting);
connection.end();
