const express = require('express');
const bodyParser = require('body-parser');
const dbConnection = require('./connection');
const Port = 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

dbConnection.connect((err) => {
    if (err) throw err;
    console.log('You are now connected...');
});

app.get('/todos', (req, res) => {
        const selectAllTodoItems = `SELECT * FROM todo_items`;
        dbConnection.query(selectAllTodoItems, (err, results) => {
            if (err) throw err;
            res.send(results);
        });
    })
    .get('/todo/:id', (req, res) => {
        const selectTodoItemById = 'SELECT * FROM todo_items WHERE id =?';
        dbConnection.query(selectTodoItemById, [req.params.id], (err, results) => {
            if (err) throw err;
            res.send(results);
        });
    });

app.post('/insert', (req, res) => {
    const input = 'INSERT INTO todo_items(text, user_id) VALUES(?, ?)';
    const body = [req.body.text, req.body.user_id];
    dbConnection.query(input,body, (err) => {
        if(err){
            res.json({ "Error": true, "Message": err });
        } else {
            res.json({ "Error": false, "Message": "Success" });
        }
    });
});

app.put('/update', (req, res) => {
    const updateItem = 'UPDATE todo_items SET text = ?, is_completed = ? WHERE id = "'
        + req.body.id + '"';
    const body = [req.body.text, req.body.is_completed];
    dbConnection.query(updateItem, body, (err) => {
        if (err) {
            res.json({ "Error": true, "Message": "Error execute sql" });
        } else {
            res.json({ "Error": false, "Message": "Success" });
        }
    });
});

app.delete('/delete/:id', (req, res) => {
    const deleteItem = 'DELETE  FROM todo_items WHERE id =?';
    dbConnection.query(deleteItem, [req.params.id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.listen(Port, (err) => {
    if (err) throw err;
    console.log(`Server started on ${Port}`);
});
