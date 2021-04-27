const express = require('express');
const mysql = require('mysql');

// Create connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Giresun3428@',
    database : 'meetup'
});

// Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});


const app = express();

// Create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE meetup2';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database created...');
    });
});

// Create table

// Create table of Invitee
// app.get('/createInviteetable', (req, res) => {
//     let sql = "CREATE TABLE Invitee (invitee_no INT AUTO_INCREMENT PRIMARY KEY, invitee_name  VARCHAR(255), invited_by  VARCHAR(255))";
//     db.query(sql, (err, result) => {
//         if(err) throw err;
//         console.log(result);
//         res.send('Invitee table created...');
//     });
// });

// Create table of Room
// app.get('/createRoomtable', (req, res) => {
//     let sql = "CREATE TABLE Room (room_no INT AUTO_INCREMENT PRIMARY KEY, room_name   VARCHAR(255), floor_number  INT)";
//     db.query(sql, (err, result) => {
//         if(err) throw err;
//         console.log(result);
//         res.send('Room table created...');
//     });
// });

// Create table of Meeting 
// app.get('/createMeetingtable', (req, res) => {
//     let sql = "CREATE TABLE Meeting (meeting_no INT AUTO_INCREMENT PRIMARY KEY, meeting_title   VARCHAR(255), starting_time  TIME, ending_time TIME, room_no INT)";
//     db.query(sql, (err, result) => {
//         if(err) throw err;
//         console.log(result);
//         res.send('Meeting table created...');
//     });
// });

// Insert just one row into Invitee table
// app.get('/addpost1', (req, res) => {
//     let post = {invitee_name:'Post One', invited_by:'This is post number one'};
//     let sql = 'INSERT INTO Invitee SET ?';
//     let query = db.query(sql, post, (err, result) => {
//         if(err) throw err;
//         console.log(result);
//         res.send('Post 1 added...');
//     });
// });

// Insert multiple rows of room table
// app.get('/addmultipleposts', (req, res) => {
//     let sql = `INSERT INTO Room(room_name,floor_number)  VALUES ?  `;
//     let post = [
//         ['First room', 1],
//         ['Second room', 2],
//         ['Third room', 3],
//         ['Fourth room', 4],
//         ['Fifth room', 5]
//       ];
//     let query = db.query(sql, [post], (err, result) => {
//         if(err) throw err;
//         console.log(result);
//         res.send('Multiple rows added...');
//     });
// });

// Insert multiple rows of meeting table
// app.get('/addmultipleposts', (req, res) => {
//     let sql = `INSERT INTO Meeting(meeting_title,starting_time,ending_time, room_no)  VALUES ?  `;
//     let post = [
//         ['First meeting',  '08:00:00','10:00:00' , 1],
//         ['Second meeting', '10:00:00','12:00:00' , 2],
//         ['Third meeting',  '12:00:00','14:00:00' , 3],
//         ['Fourth meeting', '14:00:00','16:00:00' , 4],
//         ['Fifth meeting',  '16:00:00','18:00:00' , 5]
//       ];
//     let query = db.query(sql, [post], (err, result) => {
//         if(err) throw err;
//         console.log(result);
//         res.send('Multiple rows into meeting table added...');
//     });
// });

app.listen('3000', () => {
    console.log('Server started on port 3000');
});
