const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'meetup',
});

connection.connect();
// TODO Insert value to invite table
const insert_value_invite =
  "insert into invite (invitee_no, invitee_name, invitee_by) VALUES (01,'Fikret','Ali'),(02,'Emine','Ali'),(03,'Umut','Ahmet'),(04,'Bera','Mehmet'),(05,'Hatice','Ali')";
connection.query(insert_value_invite, function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log('The value of invite added:');
});
// TODO Insert value to meeting table
const insert_value_meeting =
  "insert into meeting (meeting_no, meeting_title,starting_time, ending_time, room_no) VALUES (01,'Project','2021-01-01','2021-01-02',21),(02,'Eating','2021-02-01','2021-02-02',22),(03,'Meeting','2021-01-04','2021-01-04',24),(04,'Movie','2021-01-01','2021-01-02',26),(05,'Sales','2021=05-01','2021-05-02',21)";

connection.query(insert_value_meeting, function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log('The value of meeting added:');
});

// TODO Insert value to room table
const insert_value_room =
  "insert into room (room_no, room_name,floor_number) VALUES (11,'Project',1),(22,'Eating',2),(24,'Meeting',4),(26,'Movie',2),(21,'Sales',2)";

connection.query(insert_value_room, function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log('The value of room added:');
});

connection.end();
