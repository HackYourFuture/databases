'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuidv4');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const {
    register,
    login,
    load,
    create,
    update,
    deleteRow,
    markCompleted
} = require('./services');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/register', (req, res) => {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const pw = req.body.password;
    const hash = bcrypt.hashSync(pw, saltRounds);
    const users = {
        first_name: first_name,
        last_name: last_name,
        password: hash
    }
    register(res, users);
});

app.post('/login', (req, response) => {
    const user = req.body.first_name;
    const pw = req.body.password;
    login(user, pw, response);
});
app.get('/load', (req, res) => {
    load(res);
});
app.post('/todo', (req, response) => {
    const text = req.body.text;
    const todo_id = uuid();
    create(text, todo_id, response);
});
app.put('/update:id', (req, response) => {
    const todo_id = req.params.id;
    const text = req.body.text;
    update(todo_id, text, response);
});
app.delete('/:id', (req, response) => {
    const todo_id = req.params.id;
    deleteRow(todo_id, response);
});
app.put('/completed:id', (req, response) => {
    const todo_id = req.params.id;
    markCompleted(todo_id, response);
});

app.listen(3030, error => {
    if (error)
        return console.error(error);

    console.log('Server started on http://localhost: 3030');
});