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
    password: '20002000',
    database: 'todos'
});

connection.connect(function(err) {
    if (!err) {
        console.log("Database is connected ...");
    } else {
        console.log("Error connecting database ...");
    }
});
// Use body parser middleware.
app.use(bodyParser.json())

//Send HTML file
app.get('/', function(request, response) {
  response.sendFile('./index.html', {root:__dirname});
})

// Actions
app.get('/todo', function(request, response) {
    var id = request.params.id;

    // The html expects the todos as an arry of objects such as this:
    response.json([{
      todoId: 1,
      label: 'somelabel'
    }])

    /**

    Remove response abobe and uncomment query below to start using the database instead!
    **/
    /**
    var rows = todosAPI.getTodos(connection, id, function(rows) {
      // Make sure you change the database results (rows) below into the eample,
      // otherwise the html website won't work
      response.json(rows);
      response.end();
    });
    **/
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
// Delete all todos
app.delete('/todo', function(request, response) {
    var id = request.params.id;


    // Delete it using the todosAPI deleteTodos function

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
