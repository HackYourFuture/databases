var express = require('express');
var bodyParser = require('body-parser');
var connection = require('./lib/database').connection;
var taskController = require('./taskController');
var SERVER_Port = process.env.PORT || 5000;
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api/v1.0/task', taskController.createTask)

app.get('/api/v1.0/task', taskController.getTask)

app.get('/api/v1.0/task/id/:taskId', taskController.getTaskById)

app.put('/api/v1.0/task/id/:taskId', taskController.updateTaskById)

app.delete('/api/v1.0/task/id/:taskId', taskController.deleteTaskById)

app.listen(SERVER_Port, function () {
  console.log(`Server successfully started at ${SERVER_Port}`)
});