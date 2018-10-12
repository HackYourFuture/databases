const express = require('express');
const connection = require('./db').connection;
const bodyParser = require('body-parser');
const taskController = require('./taskController');


var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.post('/post', taskController.createTask);

app.get ('/get', taskController.getTask);

app.get('/get/id/:taskId',taskController.getTaskByID);

app.put('/update/id/:taskId',taskController.upDateTask);

app.delete('/delete/id/:taskId',taskController.deleteRow);

app.post('/tag', taskController.tagTodoItem);

app.delete('/untag/id/:tagId', taskController.untagTodoItem);



app.listen(5000, ()=>{
    console.log('Server succesfully started at port 5000')
});