const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "meetup",
  //port :3307
});
connection.connect();

const clearQuery = ["drop table if exists Invitee,Room,Meeting"];
const createQuery = [
  "create table if not exists  Invitee(invitee_no int auto_increment primary key,invitee_name text,invited_by text)",
  "create table if not exists Room(room_no int auto_increment primary key ,room_name text,floor_name text)",
  "create table if not exists Meeting(meeting_no int auto_increment primary key,meeting_title text, starting_time Time,ending_time Time,room_no int )",
];

const insertQuery = [
  "insert into Invitee (invitee_name, invited_by) values ('Jack', 'John'),('Rose', 'Juan'),('Nur', 'Busra'),('Adem','Jacop'),('Victor', 'Elly')",
  "insert into Room (room_name, floor_name) values('Red','7B'),('Blue', '8A'),('Yellow','3C'), ('Purple','4E'),('Gray','2F')",
  "insert into Meeting (meeting_title,starting_time, ending_time,room_no) values ('Social Interview','10:00','10:30',1), ('Social Interview','12:00','12:30',2), ('Tech Interview','15:00','16:00',3), ('Social Interview','14:00','14:30',4), ('Tech Interview','10:00','11:00',5)",
];

clearQuery.forEach((query) => {
  connection.query(query, (err, result) => {
    if (err) throw err;
    console.log("Tables are cleared. . .");
  });
});

createQuery.forEach((query) => {
  connection.query(query, (err, result) => {
    if (err) throw err;
    console.log("Table is created. . .");
  });
});

insertQuery.forEach((query) => {
  connection.query(query, (err, result) => {
    if (err) throw err;
    console.log("The data has been added to the tables. . .");
  });
});

connection.end();
