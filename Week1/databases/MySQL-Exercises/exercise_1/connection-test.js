var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
});
 
connection.connect();
 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});


// connection.query('CREATE DATABASE meetup', (error, results, fields) => {
//   if(error) throw error;
//   console.log('Database created');
//   console.log(results);
// });

connection.query(`use meetup`, (error, results, fields) => {
  if(error) throw error;
  console.log(`meetup in use`);
})

connection.query(`create table if not exists invitee(
  invitee_no INT, 
  invitee_name VARCHAR(255),
  invited_by VARCHAR(255))`);

connection.query(`create table if not exists meeting (
    meeting_no int,
    meeting_title VARCHAR(255),
    starting_time datetime,
    ending_time datetime,
    room_no int )`);

   connection.query(`create table if not exists room (
    room_no INT,
    room_name VARCHAR(255),
    floor_number int)`);


    connection.query(`insert into invitee values
     (1, 'invite_1', 'inviter_1'),
     (2, 'invite_2', 'inviter_2'),
     (3, 'invite_3', 'inviter_3'),
     (4, 'invite_4', 'inviter_4'),
     (5, 'invite_5', 'inviter_5')`, (err, result)=>{
      if(err) throw err;
      console.log(`invitees added`);
     });

     connection.query(`insert into meeting values
     (1, 'meeting_1', '2022-01-17 12:00', '2022-01-19 12:00', 1),
     (2, 'meeting_2', '2022-01-17 12:00', '2022-01-19 12:00', 2),
     (3, 'meeting_3', '2022-01-17 12:00', '2022-01-19 12:00', 3),
     (4, 'meeting_4', '2022-01-17 12:00', '2022-01-19 12:00', 4),
     (5, 'meeting_5', '2022-01-17 12:00', '2022-01-19 12:00', 5)`, (err, result)=>{
      if(err) throw err;
      console.log(`meetings added`);
     });

     connection.query(`insert into room values 
     (1, 'room_1', 1),
     (2, 'room_2', 2),
     (3, 'room_3', 3),
     (4, 'room_4', 4),
     (5, 'room_5', 5)`, (err, result)=>{
      if(err) throw err;
      console.log(`rooms added `);
     });

     
connection.query('select * from room', (err, results, fields) => {
  if (err) throw err;
  console.log(results);
});

connection.query('select * from meeting', (err, results, fields) => {
  if (err) throw err;
  console.log(results);
});

connection.query('select * from invitee', (err, results, fields) => {
  if (err) throw err;
  console.log(results);
});
 
connection.end();