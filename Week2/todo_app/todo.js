const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require("body-parser");
const mysql = require('mysql');
const config = JSON.parse(fs.readFileSync("config_secret.json"))
const connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
connection.connect();
let userInfo = "SELECT id, first_name FROM users";
app.get('/users', function (req, res) {
    connection.query(userInfo, function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        if (results.length === 0) {
            res.status(404);
            res.send({ "error: ": "There is no users" });
        }
        else {
        
            res.send(results);
        }    
    });   
});
app.get('/todo/:id', function (req, res) {
    var id = req.params.id;
    var is_completed = true;
    console.log(req.params);
    let getTaskById = `SELECT id, text, is_completed FROM todo_items WHERE id = ${id}`;
    connection.query(getTaskById, function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        if (results.length === 0) {
            res.status(404);
            res.send({ "error: ": "There is no task in this id" });
        }
        else {
            res.send(results);
        }    
    });
});

app.post('/create', function (req, res) {
    let createQuery = "INSERT INTO todo_items (text, user_id) VALUES (?, ?);";
    const user_id = req.body.user_id;
    const text = req.body.text;
    console.log(req.body);
    connection.query(createQuery,[text,user_id], function (error, results, fields) {
        console.log('the result: ' + results);
        console.log('the fields: ' + fields);
        if (error) {
            res.status(404);
            res.send({ "error: ": "There is an error" });
        }
        else {
            res.json({ results,"Success: ": "You added a new task to todo list."});
        }    
    });
});

app.put('/update/todo', function (req, res) {
    let updateQuery = "UPDATE todo_items SET text = ? WHERE id = ?;";
    const text = req.body.text;
    const id = req.body.id;
    console.log(req.body);
    connection.query(updateQuery,[text,id], function (err, results, fields) {
        if (error) {
            console.log('the result: ' + results);
            res.status(404);
            res.send({ "error: ": "There is an error" });
        }
        else {
            res.json({ results, "Success: ": "Task updated." });
        }    
    });
});

app.delete('/delete', function (req, res) {
    let deleteQuery = "DELETE FROM todo_items WHERE id = ?;";
    const values = [req.body.id];
    connection.query(deleteQuery, [values], function (err, results, fields) {
        if (error) {
            res.status(404);
            res.send({ "error: ": "There is an error" });
        }
        else {
            res.json({ results, "Success: ": "Task deleted" });
        }    
    });
});

app.post('/tag', function (req, res) {
    let createNewTag = "INSERT INTO todo_item_tag (todo_item_id, tag_id) VALUES (?,?);";
    const values = [req.body.todo_item_id, req.body.tag_id];
    console.log(res.body);
    connection.query(createNewTag, [values], function (err, results, fields) {
        if (error) {
            res.status(404);
            res.send({ "error: ": "There is an error" });
        }
        else {
            res.json({ results, "Success: ": "updated category." });
        }
    });
});

app.put('/update/tag', function (req, res) {
    let updateTag = "UPDATE tags SET description = ? WHERE id = ?;";
    const values = [req.body.description, req.body.Id];
    connection.query(createQuery, [values], function (err, results, fields) {
        if (error) {
            res.status(404);
            res.send({ "error: ": "There is an error" });
        }
        else {
            res.json({ results, "Success: ": "You added a new category." });
        }
    });
});


app.listen(8000, function () {
    console.log('Connected to server on port 8000');
});



