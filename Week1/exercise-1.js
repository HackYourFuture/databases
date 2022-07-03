const MySQL = require('mysql');

const connection = MySQL.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

const dropDatabase = 'DROP DATABASE IF EXISTS meetup;';

const dropTable = 'DROP TABLE IF EXISTS meetup;';

const createDatabase = 'CREATE DATABASE meetup;';

const useDatabase = 'USE meetup;';

const createInviteeTable = `CREATE TABLE Invitee(
  invitee_no INT UNIQUE NOT NULL PRIMARY KEY, 
  invitee_name VARCHAR(50) NOT NULL, 
  invited_by VARCHAR(50) NOT NULL
);`;

const createRoomTable = `CREATE TABLE Room(
  room_no INT UNIQUE NOT NULL PRIMARY KEY, 
  room_name VARCHAR(50) NOT NULL, 
  floor_number int
);`;

const createMeetingTable = `CREATE TABLE Meeting(
  meeting_no INT UNIQUE NOT NULL PRIMARY KEY, 
  invitee_no INT NOT NULL,
  meeting_title VARCHAR(100) NOT NULL, 
  starting_time DATETIME, 
  ending_time DATETIME, 
  room_no INT NOT NULL
);`;

const insertInviteeTable = `INSERT INTO invitee (invitee_no, invitee_name, invited_by)
  VALUES
  (1, 'Fadi', 'Rob'),
  (2, 'Fillimon', 'Collin'),
  (3, 'Ali', 'Wouter'),
  (4, 'Yasemin', 'Jonathan');`;

const insertMeetingTable = `INSERT INTO Meeting (meeting_no, invitee_no, meeting_title, starting_time, ending_time, room_no)
  VALUES
  (111, 1, 'database', '2022-06-30 11:00:00', '2022-06-30 14:00:00', 105),
  (112, 2, 'Browser', '2022-07-01 11:00:00', '2022-07-01 14:00:00', 101),
  (113, 3, 'Node.js', '2022-06-30 14:30:00', '2022-06-30 16:30:00', 103),
  (114, 4, 'Browser', '2022-07-01 11:00:00', '2022-07-01 14:00:00', 102);`;

const insertRoomTable = `INSERT INTO Room (room_no, room_name, floor_number)
  VALUES
  (101, 'HYF-Browser-A',  1),
  (102, 'HYF-Browser-B', 1),
  (103, 'HYF-Node.js', 3),
  (104, 'HYF-Javascript', 2),
  (105, 'HYF-Database', 2);`;

const insertDataIntoInviteeTable = () => {
  connection.query(insertInviteeTable, (err, res) => {
    err ? console.log(err) :
    console.log(res, 'Invitee table populated');
  });
};
const insertDataIntoRoomTable = () => {
  connection.query(insertRoomTable, (err, res) => {
    err ? console.log(err) :
    console.log(res, 'Room table populated');
  });
};
const insertDataIntoMeetingTable = () => {
  connection.query(insertMeetingTable, (err, res) => {
    err ? console.log(err) :
    console.log(res, 'Meeting table populated');
  });
};

const dropDatabases = () => {
  connection.query(dropDatabase, (err, res) => {
    err ? console.log(err) : 
    console.log(res, 'database dropped');
  });
};

const dropTables = () => {
  connection.query(dropTable, (err, res) => {
    err ? console.log(err) : 
    console.log(res, 'Tables dropped');
  });
};

const createDatabases = () => {
  connection.query(createDatabase, (err, res) => {
    err ? console.log(error) :
    console.log(res, 'Database created');
  });
};

const useDatabases = () => {
  connection.query(useDatabase, (err, res) => {
    err ? console.log(err) :
    console.log(res, 'Database used');
  });
};

const createTable = () => {
  connection.query(createInviteeTable, (err, res) => {
      err ? console.log(err) :
      console.log(res, 'Invitee table created');
    })
  connection.query(createRoomTable, (err, res) => {
    err ? console.log(err) :
    console.log(res, 'Room table created');
  });
  connection.query(createMeetingTable, (err, res) => {
    err ? console.log(err) :
    console.log(res, 'Meeting table created');
  });
};

connection.connect();

dropDatabases();
createDatabases();
useDatabases();
dropTables();
createTable();
insertDataIntoInviteeTable();
insertDataIntoRoomTable();
insertDataIntoMeetingTable();

connection.end();
