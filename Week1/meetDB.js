import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});
//create meetUp database
connection.query(
  "CREATE DATABASE IF NOT EXISTS meetup",
  function (error, results, fields) {
    if (error) {
      throw error;
    }
    console.log("the reply is ", results);
  }
);

//create table name Invitiee error
connection.query("USE meetup", function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log("the reply is ", results);
});
//connect database
connection.connect();
//create table Room
const create_query =
  "create table Room (room_no int, room_name varchar(50),floor_number int)";
connection.query(create_query, function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log("the reply is ", results);
});
//create table invitee
const create_query1 =
  "create table invitee (meeting_no int, meeting_title varchar(50), starting_time time, ending_time time,room_no int)";
connection.query(create_query1, function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log("the reply is ", results);
});
//insert rows into inviteetable
const insert_query =
  "insert into invitee (meeting_title,starting_time) values ('meeting1','10:00:00','meeting2','11:00:00','meeting3','12:00:00','meeting4','13:00:00','meeting5','14:00:00')";
connection.query(insert_query, function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log("the reply is ", results);
});
//insert rows into room table
const insert_query1 =
  "insert into Room (room_name,floor_number) values ('room1','1','room2','2','room3','3','room4','4','room5','5')";
connection.query(insert_query1, function (error, results, fields) {
    if (error) {
        throw error;
    }
    console.log("the reply is ", results);
    }
);
//insert into meeting rows 
const insert_query2 =
  "insert into invitee (meeting_title,starting_time) values ('meeting1','10:00:00','meeting2','11:00:00','meeting3','12:00:00','meeting4','13:00:00','meeting5','14:00:00')";       
connection.query(insert_query2, function (error, results, fields) {
    if (error) {
        throw error;
    }
    console.log("the reply is ", results);
    }
);  
//create and insert queries
