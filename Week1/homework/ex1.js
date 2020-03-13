var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'meetup'
});

connection.connect();

const create_tables = [
  "create table Invitee (invitee_no int, invitee_name varchar(50),  invited_by varchar(50))",
  "create table Room (room_no int, room_name varchar(50),  floor_number int)",
  "create table Meeting (meeting_no int, meeting_title varchar(50),  starting_time TIME (0) , ending_time TIME (0) , room_no int )",
]

// const insert_queries = {
//   invitee : [ 
//     "insert into Invitee values (1, 'Ibrahim', 'Ammar')",
//   "insert into Invitee values (2, 'Ahmad', 'Joe')",
//   "insert into Invitee values (3, 'Joe', 'Ahmad')",
//   "insert into Invitee values (4, 'Ammar', 'Jack')",
//   "insert into Invitee values (5, 'Jack', 'Joe')",
//   ],
//   room : [
//     "insert into room values (1, 'Amsterdam', 101)",
//     "insert into room values (2, 'London', 102)",
//     "insert into room values (3, 'Berlin', 103)",
//     "insert into room values (4, 'New York', 104)",
//     "insert into room values (5, 'Istanbul', 105)",
//   ],
//   meeting : [
//     "insert into meeting values (1, 'fight crime', '13:00' , '14:00', 201)",
//     "insert into meeting values (2, 'fight Corona', '15:00' , '17:00', 201)",
//     "insert into meeting values (3, 'Better future', '13:00' , '14:00', 207)",
//     "insert into meeting values (4, 'Hack your future', '13:00' , '14:00', 206)",
//     "insert into meeting values (5, 'Playing dead', '17:00' , '19:00', 201)",
//   ]
// }





















const insert_queries = [
// fill in invitee
  "insert into Invitee values (1, 'Ibrahim', 'Ammar')",
  "insert into Invitee values (2, 'Ahmad', 'Joe')",
  "insert into Invitee values (3, 'Joe', 'Ahmad')",
  "insert into Invitee values (4, 'Ammar', 'Jack')",
  "insert into Invitee values (5, 'Jack', 'Joe')",
// fill in room 
  "insert into room values (1, 'Amsterdam', 101)",
  "insert into room values (2, 'London', 102)",
  "insert into room values (3, 'Berlin', 103)",
  "insert into room values (4, 'New York', 104)",
  "insert into room values (5, 'Istanbul', 105)",
// fill in meeting 
    "insert into meeting values (1, 'fight crime', '13:00' , '14:00', 201)",
    "insert into meeting values (2, 'fight Corona', '15:00' , '17:00', 201)",
    "insert into meeting values (3, 'Better future', '13:00' , '14:00', 207)",
    "insert into meeting values (4, 'Hack your future', '13:00' , '14:00', 206)",
    "insert into meeting values (5, 'Playing dead', '17:00' , '19:00', 201)",
    ]

for (let i in create_tables){
  connection.query(create_tables[i] , function (error, results, fields) {
    if (error) {
        throw error;
    }
    console.log("the reply is ", results[0]);
});
}

for(let i in insert_queries){
  console.log("Going to run ", insert_queries[i]) // [] subscript operator : Of 
  connection.query(insert_queries[i], function (error, results, fields) {
      if (error) {
          throw error;
      }
      console.log("adding row ", results[0]);
  });
}

connection.end();
// for(let i in insert_queries_room){
//   console.log("Going to run ", insert_queries_room[i]) // [] subscript operator : Of 
//   connection.query(insert_queries_room[i], function (error, results, fields) {
//       if (error) {
//           throw error;
//       }
//       console.log("adding row ", results[0]);
//   });
// }
// for(let i in insert_queries_meeting){
//   console.log("Going to run ", insert_queries_meeting[i]) // [] subscript operator : Of 
//   connection.query(insert_queries_meeting[i], function (error, results, fields) {
//       if (error) {
//           throw error;
//       }
//       console.log("adding row ", results[0]);
//   });
// }
// 
