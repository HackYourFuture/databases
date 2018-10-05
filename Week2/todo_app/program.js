'use strict';

const mysql = require('mysql');

const command = process.argv[2];
const command2 = process.argv[3];
const command3 = process.argv[4];

class TodoModel {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }

    load(callback) {
        const selectTodoItems = "SELECT * FROM todo_items";
        this.dbConnection.query(selectTodoItems, function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
    }

    create(description) {
        const newItem = {
            todo_text: description
        };
        this.dbConnection.query('INSERT INTO todo_items SET ?', newItem, function (err, results, fields) {
            if (err) {
                throw err;
                return;
            }

            console.log('Query OK, 1 row created')
        })
    }

    update(description, id) {
        const updateRow = [description, id];
        this.dbConnection.query('UPDATE todo_items SET todo_text = ? WHERE todo_id = ?', updateRow, function (err, results, fields) {
            if (err) {
                throw err;
                return;
            }

            console.log('Query OK, 1 row updated')
        })
    }

    delete(id) {
        this.dbConnection.query('DELETE FROM todo_items WHERE todo_id = ?', [id], function (error, results, fields) {
            if (error) throw error;
            console.log('deleted ' + results.affectedRows + ' rows');
        })
    }

    tagTodoItem(todoItemId, tagId) {
        const tag = [tagId, todoItemId];
        this.dbConnection.query('UPDATE todo_items SET tag_id = ? WHERE todo_id = ?', tag, function (err, results, fields) {
            if (err) {
                throw err;
                return;
            }

            console.log('Query OK, 1 row tagged')
        })
    }

    untagTodoItem(todoItemId) {
        this.dbConnection.query('UPDATE todo_items SET tag_id = NULL WHERE todo_id = ?', todoItemId, function (err, results, fields) {
            if (err) {
                throw err;
                return;
            }

            console.log('Query OK, 1 row untagged')
        })
    }

    markCompleted(todoItemId) {
        this.dbConnection.query('UPDATE todo_items SET done = 1 WHERE todo_id = ?', todoItemId, function (err, results, fields) {
            if (err) {
                throw err;
                return;
            }

            console.log('Query OK, 1 todo done')
        })
    }
}

function help() {
    console.log('1. node program.js create "something to do" -- creates a new TODO item');

    console.log('2. node program.js update todo_id "something else to do" -- updates an existing TODO item');

    console.log('3. node program.js delete todo_id -- deletes an existing TODO item');

    console.log('4. node program.js tag todo_id tag_id -- adds a tag to an existing TODO item');

    console.log('5. node program.js untag todo_id -- removes the tag from an existing TODO item');

    console.log('6. node program.js done todo_id -- adds a done flag to an existing TODO item');
}

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'todo_app_user',
    password: 'Password123.',
    database: 'todo_app',
    port: 3306
});

dbConnection.connect(function (err) {
    if (err != null) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + dbConnection.threadId);

    const todoModel = new TodoModel(dbConnection);

    switch (command) {
        case 'load':
            todoModel.load(function (err, todoItems) {
                if (err) {
                    console.log("error loading TODO items:", err);
                }

                console.log("existing todo items:", todoItems);
            });
            break;
        case 'create':
            todoModel.create(command2);
            break;
        case 'update':
            todoModel.update(command2, command3);
            break;
        case 'delete':
            todoModel.delete(command2);
            break;
        case 'tag':
            todoModel.tagTodoItem(command2, command3);
            break;
        case 'untag':
            todoModel.untagTodoItem(command2);
            break;
        case 'done':
            todoModel.markCompleted(command2);
            break;
        default:
            help();
    }
});