// This is the connector (also known as driver)
// that we can use to connect to a MySQL process
// and access its databases.
const mysql = require('mysql');
const TodoModel = require('./TodoModel')

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'todo_user',
    password: '123',
    database: 'todo_app'
});

dbConnection.connect(function (err) {
    if (err != null) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + dbConnection.threadId);

    const todoModel = new TodoModel(dbConnection);

    todoModel.load(function (err, todoItems) {
        if (err) {
            console.log("error loading TODO items:", err);
        }

        console.log("existing todo items:", todoItems);
    });


    todoModel.create('go to shcool', (err) => {
        if (err) {
            console.log("error creating TODO items:", err);
        }

        console.log('TODO created');
    });


    todoModel.update(49, 'Shopping', (err) => {
        if (err) {
            console.log("error updating TODO items:", err);
        }

        console.log('TODO updated');
    });


    todoModel.deleteRow(47, (err) => {
        if (err) {
            console.log("error deleting TODO items:", err);
        }

        console.log('TODO deleted');
    });

    todoModel.tagTodoItem(47, 2, (err) => {
        if (err) {
            console.log("error tagging TODO items:", err);
        }

        console.log('TODO tag added');
    });


    todoModel.untagTodoItem(47, 2, (err) => {
        if (err) {
            console.log("error tagging TODO items:", err);
        }

        console.log('TODO tag deleted');
    });

    todoModel.markCompleted(46, (err) => {
        if (err) {
            console.log("error marking TODO items:", err);
        }

        console.log('TODO 46 updated');
    });
});


