const db = require('./connection.js');
const express = require('express');
const app = express();

const port = process.env.PORT || 3000

//create a database

    app.get('/createdb', (req, res) => {

// refresh database

    db.query('DROP DATABASE IF EXISTS meetup',(error) => {
        if (error) {
        console.log(error);
        res.status(500).send("An error occurred while dropping the database.");
        return;
        }
        console.log('Connected to the MySQL server.')
    });

    const createSqlDb = `CREATE DATABASE IF NOT EXISTS meetup`;
    db.query(createSqlDb, (error, result) => {
        if(error) {
            console.log(error);
            res.status(500).send("An error occurred while creating the database.");
            return;
        }
       console.log('DataBase created', result);
       res.send(result);
    })

// Select the database

    db.query('USE meetup', (error) => {
        if (error) {
            console.log(error);
            res.status(500).send("An error occurred while selecting the database.");
            return;
        }
    
        console.log('Database selected.');
    });
})

// Create table Invitee
    const inviteeTableQuery = `
    CREATE TABLE IF NOT EXISTS Invitee (
        invitee_no INT PRIMARY KEY AUTO_INCREMENT,
        invitee_name VARCHAR(255),
        invitee_by VARCHAR(255)
    )`;

    app.get('/createTableInvitee', (req, res) => {
    db.query(inviteeTableQuery, (error, result) => {
        if(error) {
            console.log(error);
            res.status(500).send("An error occurred while creating the inviteeTableQuery.");
            return;
        }
    console.log('Invitee Table created', result);
    res.send(result);
    })
    });

// Insert values into Invitee

    const insertValuesInvitee = `INSERT INTO Invitee (invitee_name, invitee_by) 
    VALUES ('PERSON_1', 'COMPANY_1'), ('PERSON_2', 'COMPANY_2'), ('PERSON_3', 'COMPANY_3'), 
    ('PERSON_4', 'COMPANY_4'), ('PERSON_5', 'COMPANY_5')`;

    app.get('/insertValuesInvitee', (req, res) => {
        db.query(insertValuesInvitee, (error, result) => {
            if(error) {
                console.log(error);
                res.status(500).send("An error occurred while inserting the values.");
                return;
            }
        console.log('Invitee values added', result);
        res.send(result);
        });
    });

//Show table Invitee

    app.get('/showTableInvitee', (req, res) => {
        const selectQuery = `SELECT * FROM Invitee`;
        db.query(selectQuery, (error, result) => {
            if (error) {
                console.log(error);
                res.status(500).send("An error occurred while retrieving table data.");
                return;
            }
            console.log('Table invitee retrieved', result);
            res.send(result);
        });
    });

// Create table Room
    const roomTableQuery = `
    CREATE TABLE IF NOT EXISTS Room (
        room_no INT PRIMARY KEY AUTO_INCREMENT,
        room_name VARCHAR(255),
        floor_number INT
    )
    `;

    app.get('/createTableRoom', (req, res) => {
        db.query(roomTableQuery, (error, result) => {
            if(error) {
                console.log(error);
                res.status(500).send("An error occurred while creating the inviteeTableQuery.");
                return;
            }
        console.log('Room Table created', result);
        res.send(result);
        })
        });

// Insert values into Room

    const insertValuesRoom = `INSERT INTO Room (room_name, floor_number)
    VALUES ('ROOM_1', 1), ('ROOM_2', 2), ('ROOM_3', 3), ('ROOM_4', 4), ('ROOM_5', 5)`;

    app.get('/insertValuesRoom', (req, res) => {
        db.query(insertValuesRoom, (error, result) => {
            if(error) {
                console.log(error);
                res.status(500).send("An error occurred while inserting the values.");
                return;
            }
        console.log('Room values added', result);
        res.send(result);
        });
    })

// Show table Room

    app.get('/showTableRoom', (req, res) => {
        const selectQuery = `SELECT * FROM Room`;
        db.query(selectQuery, (error, result) => {
            if (error) {
                console.log(error);
                res.status(500).send("An error occurred while retrieving table data.");
                return;
            }
            console.log('Table room retrieved' , result);
            res.send(result);
        });
    })
    
// Create table Meeting

    const meetingTableQuery = `
    CREATE TABLE IF NOT EXISTS Meeting (
        meeting_no INT PRIMARY KEY AUTO_INCREMENT,
        meeting_title VARCHAR(255),
        starting_time TIME,
        ending_time TIME,
        room_no INT,
        FOREIGN KEY (room_no) REFERENCES Room(room_no)
    )
    `;

    app.get('/createTableMeeting', (req, res) => {
        db.query(meetingTableQuery, (error, result) => {
            if(error) {
                console.log(error);
                res.status(500).send("An error occurred while creating the inviteeTableQuery.");
                return;
            }
        console.log('Meeting Table created', result);
        res.send(result);
        })
        });


// Insert values into Meeting

    const insertValuesMeeting = `INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no)
    VALUES ('MEETING_1', '09:00:00', '10:00:00', 1), ('MEETING_2', '10:00:00', '11:00:00', 2), 
    ('MEETING_3', '11:00:00', '12:00:00', 3), ('MEETING_4', '12:00:00', '13:00:00', 4), 
    ('MEETING_5', '13:00:00', '14:00:00', 5)`;

    app.get('/insertValuesMeeting', (req, res) => {
        db.query(insertValuesMeeting, (error, result) => {
            if(error) {
                console.log(error);
                res.status(500).send("An error occurred while inserting the values.");
                return;
            }
        console.log('Meeting values added', result);
        res.send(result);
        });
    })

//Show table Meeting

    app.get('/showTableMeeting', (req, res) => {
        const selectQuery = `SELECT * FROM Meeting`;
        db.query(selectQuery, (error, result) => {
            if (error) {
                console.log(error);
                res.status(500).send("An error occurred while retrieving table data.");
                return;
            }
            console.log('Table meeting retrieved', result);
            res.send(result);
        });
    })


app.listen(3000, () => {
    console.log(`App listening on port ${port}`)
})