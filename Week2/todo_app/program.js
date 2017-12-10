// jshint esnext: true
'use strict';
// This is the connector (also known as driver)
// that we can use to connect to a MySQL process
// and access its databases.
const mysql = require('mysql');
const TodoModel = require('./todoClass');



const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'user1',
    password: '',
    database: 'todo_app'
});


dbConnection.connect(function (err) {
    if (err != null) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + dbConnection.threadId);

    const todoModel = new TodoModel(dbConnection);


    // todoModel.load(renderResultOrErr);//listing the items

    // todoModel.create('wash cloth', renderResultOrErr);//creating a todo item

    // todoModel.update(48, 'Distroy the car', renderResultOrErr);

    // todoModel.delete(48, renderResultOrErr);

    // todoModel.tagTodoItem(42, 1, renderResultOrErr);

    // todoModel.untagTodoItem(42, 1, renderResultOrErr);

    // todoModel.markCompleted(42, renderResultOrErr);

    // todoModel.markNotComplete(42, renderResultOrErr);


    


    dbConnection.end();

});


function renderResultOrErr(error, results) {
    if (error) {
        console.log(error);
        return;
    }
    console.log(results);
}


function demoList(query) {
    const listQuery = 'SELECT * FROM todo_items;';

    dbConnection.query(query, (err, results, fields) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(results);
    })
}
