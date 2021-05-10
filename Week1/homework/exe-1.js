const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "meetup",
  port: 3306,
});
connection.connect();

connection.query("DROP DATABASES meetup", (error, results, fields) => {
  if (error) {
    throw error;
  }
  console.log("Databases is dropped");
});

connection.query(
  "CREATE DATABASES IF NOT EXISTS meetup ",
  (error, results, fields) => {
    if (error) {
      throw error;
    }
    console.log("meetup database created");
  }
);

connection.query("USE meetup", (error, results, fields) => {
  if (error) {
    throw error;
  }
});

const createInviteTable =
  "create table Invite(invitee_no int, invitee_name varchar(50), invited_by text)";
const createRoomTable =
  "create table Room(room_no int, room_name varchar(50), floor_number int)";
const createMeetingTable =
  "create table Meeting(meeting_no int, meeting_title varchar(50), starting_time datetime, ending_time datetime, room_no int )";

const createTables = (tableQuery) => {
  connection.query(tableQuery, function (error, results, fields) {
    if (error) {
      throw error;
    }
    console.log("the table is created");
  });
};
createTables(createInviteTable);
createTables(createRoomTable);
createTables(createMeetingTable);

const insertInviteData = [
  "INSERT INTO Invite VALUES ( 1, 'Marwa', 'Ghaith')",
  "INSERT INTO Invite VALUES ( 2, 'Naya', 'Linda')",
  "INSERT INTO Invite VALUES ( 3, 'Sam', 'Anas')",
  "INSERT INTO Invite VALUES ( 4, 'Ahmed', 'Khaled')",
  "INSERT INTO Invite VALUES ( 5, 'Fadi', 'Manal')",
];
const insertRoomData = [
  "INSERT INTO Room VALUE (6, 'A', 0)",
  "INSERT INTO Room VALUE (7, 'B', 1)",
  "INSERT INTO Room VALUE (8, 'C', 2)",
  "INSERT INTO Room VALUE (9, 'D', 3)",
  "INSERT INTO Room VALUE (10, 'E', 4)",
];
const insertMeetingData = [
  "INSERT INTO Meeting VALUE (11, 'HR', '2020-01-01 12:00:00', '2020-01-01 13:00:00', 2)",
  "INSERT INTO Meeting VALUE (12, 'HR', '2020-01-02 12:00:00', '2020-01-02 13:00:00', 4)",
  "INSERT INTO Meeting VALUE (13, 'HR', '2020-01-03 12:00:00', '2020-01-03 13:00:00', 5)",
  "INSERT INTO Meeting VALUE (14, 'HR', '2020-01-04 12:00:00', '2020-01-04 13:00:00', 6)",
  "INSERT INTO Meeting VALUE (15, 'HR', '2020-01-05 12:00:00', '2020-01-05 13:00:00', 7)",
];
const insertData = (array) => {
  array.forEach((element) => {
    connection.query(element, function (error, results, fields) {
      if (error) {
        throw error;
      }
      console.log("Data is inserted");
    });
  });
};
insertData(insertInviteData);
insertData(insertRoomData);
insertData(insertMeetingData);

connection.end();
