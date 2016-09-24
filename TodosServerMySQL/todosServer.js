var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var mysql = require('mysql');
var todosAPI = require('./todosAPI').todosAPI;

// Try this out - guess what it prints before you uncomment it!
//console.log(todosAPI);

// Create a new application.
var app = express();

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todos'
});

connection.connect(function(err) {
    if (!err) {
        console.log("Database is connected ...");
    } else {
        console.log("Error connecting database ...");
    }
});

// Use JSON body parser middleware.
app.use(bodyParser.json());

// Actions
app.get('/todo', function(request, response) {
    var id = request.params.id;
    var rows = todosAPI.getTodos(connection, id, function(rows) {
        console.log('Rows received by get: ', rows);
        response.json(rows);
        response.end();
    });
});

// Insert a todo
app.post('/todo', function(request, response) {
    var todo = request.body;

    if (todo.text == null || todo.text == '') {
        sendError(response, 400, 'No text specified');
    } else {
        // Insert it using the todosAPI insertTodo function
    }

});

// Delete a todo
app.delete('/todo/:id', function(request, response) {
    var id = request.params.id;

    // Delete it using the todosAPI deleteTodo function
});

// Update a todo
app.put('/todo/:id', function(request, response) {
    var id = request.params.id;

    // Update it using the todosAPI updateTodo function
});


function sendError(response, code, message) {
    response.statusCode = code;
    response.json({
        error: message
    });
    response.end();
}


// Start the server.
app.listen(8080);
