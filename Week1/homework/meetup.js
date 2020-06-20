const mySql = require('mysql');
const connection = mySql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',    
    database: 'meetup'
});

connection.connect();

connection.query('create table Invitee(invitee_no int, invitee_name varchar(50), invited_by varchar(30))', (err, result) => {
    if (err) throw err;
    console.log(result);
});

const Invitee = [
    "insert into invitee values (1, 'ali', 'jack')",
    "insert into invitee values (2, 'mike', 'samer')",
    "insert into invitee values (3, 'karam', 'rami')",
    "insert into invitee values (4, 'Jo', 'naji')",
    "insert into invitee values (5, 'Jone', 'Mahmoud')"
];

Invitee.forEach(ele => {

    connection.query(ele, (err, result) => {
        if (err) throw err;
        console.log(result);
    });

});

connection.query('create table Room(room_no int, room_name varchar(20), floor_number int)', (err, result) => {
    if (err) throw err;
    console.log(result);
});
const Room = [
    "insert into room values (44, 'GREAT', 3)",
    "insert into room values (1, 'NICE', 4)",
    "insert into room values (40, 'MIKE', 1)",
    "insert into room values (45, 'MOON', 1)",
    "insert into room values (20, 'DOOM', 11)"
];


Room.forEach(ele => {
    connection.query(ele, (err, result) => {
        if (err) throw err;
        console.log(result);

    })
});

connection.query('create table meeting(meeting_no int, meeting_title varchar(50), starting_time TIME, ending_time TIME, room_no int)', (err, result) => {
    if (err) throw err;
});

const Meeting = [
    "insert into meeting values(23, 'Problem Solving', '12:10', '01:20', 1)",
    "insert into meeting values(24, 'Information Sharing', '04:10', '05:20', 12)",
    "insert into meeting values(25, 'Team Building ', '05:10', '05:50', 11)",
    "insert into meeting values(26, 'html & CSS', '06:15', '07:30', 7)",
    "insert into meeting values(27, 'Decision Making', '08:00', '08:45', 2)"
];

Meeting.forEach(ele => {
    connection.query(ele, (err, result) => {
        if (err) throw err;
        console.log(result);
    })
});

connection.end();