const express = require('express');
const app = express();
const mysql = require('mysql');
let bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'userx',
    password: 'secret',
    database: 'todo_app'
});
dbConnection.connect();

//Front-end/////
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/todos', (req, res) => {

    dbConnection.query(`SELECT * FROM todo_items `, function(err, results) {
        if (err) {
            console.error(err);
        }
        res.json({
            'Task with id: ': JSON.parse(JSON.stringify(results))
        })
    })

});
//////////route
app.get('/todo/:id', (req, res) => {
    const taskID = req.params.id;
    dbConnection.query(`SELECT * FROM todo_items WHERE id = ? `, taskID, function(err, results) {
        if (err) {
            console.error(err);
        }
        res.json({
            'Task with id: ': JSON.parse(JSON.stringify(results))
        })
    })

});

app.post('/create/:id', function(req, res) {
    let taskInput = req.body;
    let userID = req.params.id;

    if (!taskInput) {
        res.status(400).send({ error: true, message: 'Please add task' });
    }

    dbConnection.query(`INSERT INTO todo_items(id,text,is_completed,
        user_id) VALUES(NULL,'${taskInput}',
    false, ${userID} )`, function(error, data) {
        if (error) throw error;
        res.send(taskInput + ' task, has been created successfully.');
        console.log(typeof userID);

    });
});
//delete
app.get('/todos/:id', function(req, res) {
    let taskID = req.params.id;
    const x = req.body;
    dbConnection.query(`DELETE FROM todo_items WHERE id = ?`, taskID, function(error, results) {
        if (error) throw error;

        res.status(400);
        res.redirect('/');
        console.log(req.body);
    })

});

app.put('/todos/update/:id', function(req, res) {
    let taskID = req.params.id;
    let text = req.body;
    dbConnection.query(`UPDATE todo_items SET text=''
     WHERE id = `, text, taskID, function(error, results) {
        if (error) throw error;
        res.send(text + ' has been updated!');
        console.log(text);

    })
});

app.listen(3010);