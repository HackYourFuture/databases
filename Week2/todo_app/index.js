'use strict';

const fs = require('fs');
const express =  require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const TodoModel =  require('./program')
const userData = require('./')

const dbConnection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'todo_app'
});

const todoModel = new TodoModel();

dbConnection.connect(function(err) {
    if (err != null) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + dbConnection.threadId);

    todoModel.setDbConnection(dbConnection);

    // todoModel.load(function(err, todoItems) {
    //     if(err) {
    //         console.log("error loading TODO items:", err);
    //     }

    //     console.log("existing todo items:", todoItems);
    // });

    // const description = {text:"create again", is_completed:0, user_id:1};
    // todoModel.markCompleted(47, function(err, todoItems) {
    //     if(err) {
    //         console.log("error loading TODO items:", err);
    //     }

    //     console.log("existing todo items:", todoItems);
    // });
});

const app = express();
app.use(bodyParser.json());

app.get(/^\/todos$/, (request, response) => {
    list(response);
    response.status(200);
}); 

app.post(/^\/todos$/, (request, response) => {
    add(request.body.todo);
    response
        .status(201)
        .json({status: "success"});  
});

app.put(/^\/todos\/([1-9][0-9]*)$/, (request, response) => {
    update(request.params[0], request.body.todo);
    response
        .status(200)
        .json({status: "success"}); 
});

app.delete(/^\/todos\/([1-9][0-9]*)$/, (request, response) => {
    remove(request.params[0]);
    response
        .status(200)
        .json({status: "success"}); 
});

app.get(/^\/todos\/([1-9][0-9]*)$/, (request, response) => {
    getTask(request.params[0], response);
    response
        .status(200);
});

app.delete(/^\/todos$/, (request, response) => {
    reset();
    response
        .status(200)
        .json({status: "success"}); 
});

app.post(/^\/todos\/([1-9][0-9]*)\/done$/, (request, response) => {
    markCompleted(request.params[0]);
    response
        .status(200)
        .json({status: "success"}); 
});

app.delete(/^\/todos\/([1-9][0-9]*)\/done$/, (request, response) => {
    update(request.params[0], null, false);
    response
        .status(200)
        .json({status: "success"}); 
});

app.listen(3030);

function add(task, response){
    console.log(task);
    todoModel.create(task, function(err, todoItems) {
        if(err) {
            console.log("error loading TODO items:", err);
            return;
        }
    });
}

function list(response){
    todoModel.load(null, function(err, todoItems) {
        if(err) {
            console.log("error loading TODO items:", err);
            return;
        }
        response.json(todoItems);
    });
}

function getTask(index, response){
    todoModel.load(index, function(err, todoItems) {
        if(err) {
            console.log("error loading TODO items:", err);
            return;
        }
        response.json(todoItems);
    });
}

function remove(index){
    todoModel.delete(index, function(err, todoItems) {
        if(err) {
            console.log("error loading TODO items:", err);
            return;
        }
    });
}

function reset(){
	todoModel.deleteAll();
}

function update(index, description, done){
    todoModel.update(index, description, function(err, todoItems) {
        if(err) {
            console.log("error loading TODO items:", err);
            return;
        }
    });
}

function markCompleted(index){
    todoModel.markCompleted(index, function(err, todoItems) {
        if(err) {
            console.log("error loading TODO items:", err);
            return;
        }
    });
}