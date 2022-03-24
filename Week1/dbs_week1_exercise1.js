var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'P@ssw0rd',
  database: 'meetup'
});

// make a connection to 'meetup' database
connection.connect((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('connected successfully!');
  }
});

var create_invitee_query = 'CREATE TABLE IF NOT EXISTS Invitee ( \
  invitee_no BIGINT PRIMARY KEY auto_increment, \
  invitee_name varchar(25) NOT NULL, \
  invited_by varchar(25) NOT NULL DEFAULT \'bashar khdr\')';

var create_room_query = 'CREATE TABLE IF NOT EXISTS Room( \
  room_no BIGINT PRIMARY KEY auto_increment,\
  room_name varchar(30) NOT NULL, \
  floor_number INT NOT NULL \
)';

var create_meeting_query = 'Create table IF NOT Exists Meeting (\
	meeting_no bigint primary key auto_increment, \
    meeting_title varchar(40) NOT NULL DEFAULT \'General Meeting\', \
    starting_date varchar(50), \
    ending_date varchar(50), \
    room_no bigint \
);';

connection.query('DROP TABLE IF EXISTS Invitee;', (err, result, fields) => {
  if (err) {

  } else {
    console.log('table Invitee dropped successfully');
  }
});
connection.query('DROP TABLE IF EXISTS Room;', (err, result, fields) => {
  if (err) {

  } else {
    console.log('table Room dropped successfully');
  }
});
connection.query('DROP TABLE IF EXISTS Meeting;', (err, result, fields) => {
  if (err) {

  } else {
    console.log('table Meeting dropped successfully');
  }
});

// create Invitee table
connection.query(create_invitee_query, (err, result, fields) => {
  if (err) {
    console.error(err);
  } else {
    console.log('table Invitee created successfully!');
  }
});

// create Room table
connection.query(create_room_query, (err, result, fields) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Table Room Created Successfully');
  }
});

// create Meet table
connection.query(create_meeting_query, (err, result, fields) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Table Meeting Created Successfully');
  }
});

// Insert into Invitee table
var invitee_data = [
  { 'invitee_name': "'Mazen Khdr'", 'invited_by': "'Sultan'" },
  { 'invitee_name': "'Alaa Khdr'", 'invited_by': "'Bashar Khdr'" },
  { 'invitee_name': "'Mazen Khdr'", 'invited_by': "'Saleem'" },
  { 'invitee_name': "'Bashar Khdr'", 'invited_by': "'Sarah'" },
  { 'invitee_name': "'Samir Salem'", 'invited_by': "'Sarah'" }
];
for (var i = 0; i < invitee_data.length; i++) {

  insert_query = 'INSERT INTO Invitee (invitee_name, invited_by) \
  VALUES ('+invitee_data[i]['invitee_name'] + ',' + invitee_data[i]['invited_by'] + ')';
  connection.query(insert_query, (err, result, fields) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Row with id = '+result['insertId']);
    }
  })
}

// Insert data into Room table

var room_table = [
  {'room_name': "'Recreation Room'", 'floor_number': 0},
  {'room_name': "'General Meeting'", 'floor_number': 1},
  {'room_name': "'Activities Manager Room'", 'floor_number': 4},
  {'room_name': "'Information Office'", 'floor_number': 3},
  {'room_name': "'Computer Room'", 'floor_number': 2}
];

for (var i=0; i < room_table.length; i++) {
  insert_query = 'INSERT INTO Room (room_name, floor_number) \
  VALUES ('+room_table[i]['room_name'] + ',' + room_table[i]['floor_number'] + ')';
  connection.query(insert_query, (err, result, fields) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Row with id = '+result['insertId']);
    }
  })
}

// Inserting meeting_table data
var meeting_data=[
  {'meeting_title':"'Progress meeting'",
  'starting_date':"'2022-03-20T13:30:00Z'",
  'ending_date':"'2022-03-20T14:00:00Z'",
  'room_no': 2
  },
  {'meeting_title':"'Progress meeting'",
  'starting_date':"'2022-03-20T13:30:00Z'",
  'ending_date':"'2022-03-20T14:00:00Z'",
  'room_no': 4
  },
  {'meeting_title':"'Integration Meeting'",
  'starting_date':"'2022-03-25T13:30:00Z'",
  'ending_date':"'2022-03-25T14:30:00Z'",
  'room_no': 1
  },
  {'meeting_title':"'computer club meeting'",
  'starting_date':"'2022-04-23T10:30:00Z'",
  'ending_date':"'2022-04-23T13:30:00Z'",
  'room_no': 5
  },
  {'meeting_title':"'Programming contest'",
  'starting_date':"'2022-03-27T08:30:00Z'",
  'ending_date':"'2022-03-27T12:30:00Z'",
  'room_no': 5
  }
];

for (var i = 0; i < meeting_data.length; i++) {
  insert_query = 'INSERT INTO Meeting (meeting_title, starting_date, ending_date, room_no) \
  VALUES ('+meeting_data[i]['meeting_title'] + ',' + meeting_data[i]['starting_date'] +','+meeting_data[i]['ending_date']+','+meeting_data[i]['room_no']+')';
  connection.query(insert_query, (err, result, fields) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Row with id = '+result['insertId']);
    }
  })
}

connection.end();