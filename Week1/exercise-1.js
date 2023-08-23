const mysql = require("mysql");

const connectionConfig = {
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
};

function createDatabase(connection) {
  connection.query("CREATE DATABASE IF NOT EXISTS meetup", (error) => {
    if (error) console.log(error);
    console.log("Database created: meetup");
    connection.changeUser({ database: "meetup" }, (error) => {
      if (error) console.log(error);
      createTables(connection);
    });
  });
}

function createTables(connection) {
  const createTableQueries = [
    `CREATE TABLE IF NOT EXISTS Invitee (
      invitee_no INT AUTO_INCREMENT PRIMARY KEY,
      invitee_name VARCHAR(255),
      invited_by INT
    );`,
    `CREATE TABLE IF NOT EXISTS Room (
      room_no INT AUTO_INCREMENT PRIMARY KEY,
      room_name VARCHAR(255),
      floor_number INT
    );`,
    `CREATE TABLE IF NOT EXISTS Meeting (
      meeting_no INT AUTO_INCREMENT PRIMARY KEY,
      meeting_title VARCHAR(255),
      starting_time DATETIME,
      ending_time DATETIME,
      room_no INT,
      FOREIGN KEY (room_no) REFERENCES Room(room_no)
    );`,
  ];

  let queryIndex = 0;

  function createNextTable() {
    if (queryIndex < createTableQueries.length) {
      connection.query(createTableQueries[queryIndex], (error) => {
        if (error) console.log(error);
        queryIndex++;
        createNextTable();
      });
    } else {
      console.log("Tables created: Invitee, Room, Meeting");
      insertData(connection);
    }
  }

  createNextTable();
}

const connection = mysql.createConnection(connectionConfig);

connection.connect((error) => {
  if (error) console.log(error);
  console.log("Connected to MySQL server");
  createDatabase(connection);
});
