'use strict'
const mysql = require('mysql');
const fs = require('fs');
const config = require('./db-secret.json');


class TodoModel {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }

    load(callback) {
        const selectTodoItems = "SELECT * FROM todo_items";
        this.dbConnection.query(selectTodoItems, function(err, results, fields) {
            if(err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
    }

    create(description, callback) {
        const createQuery = `
        INSERT INTO todo_items(text , is_completed , user_id)
        VALUES (${dbConnection.escape(description)} , 0 ,${dbConnection.escape(args2)} )`;
        this.dbConnection.query(createQuery, (err, results, fields) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
    }

    update(id, description, callback) {
        const updateQuery = `
        UPDATE todo_items SET text = ${dbConnection.escape(description)} 
        WHERE id = ${dbConnection.escape(id)}`;
        this.dbConnection.query(updateQuery, (err, results, fields) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
    }

    delete(id, callback) {
        const deleteQuery = `
        DELETE FROM todo_items
        WHERE id = ${dbConnection.escape(id)}`;
        this.dbConnection.query(deleteQuery, (err, results, fields) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
    }

    tagTodoItem(todoItemId, tagId, callback) {
        const tagInsertQuery = `
        INSERT INTO todo_item_tag(todo_item_id , tag_id) 
        VALUES (${dbConnection.escape(todoItemId)} , ${dbConnection.escape(tagId)})`;
        this.dbConnection.query(tagInsertQuery, (err, results, fields) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
    }
        
    untagTodoItem(todoItemId, tagId, callback) {
        const tagDeleteQuery = `
        DELETE FROM todo_item_tag
        WHERE todoItemId = ${dbConnection.escape(todoItemId)} AND tagId = ${dbConnection.escape(tagId)}`;
        this.dbConnection.query(tagDeleteQuery, (err, results, fields) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
    }

    markCompleted(todoItemId, callback) {
        const updateQuery = `
        UPDATE todo_items SET is_completed = 1
        WHERE ${dbConnection.escape(todoItemId)} = id`;
        this.dbConnection.query(updateQuery, (err, results, fields) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
    }
}

const dbConnection = mysql.createConnection({
    host     : config.host,
    user     : config.user,
    password : config.password,
    database : 'todo_app'
});

const cmd = process.argv[2];
const args = process.argv[3];
const args2 = process.argv[4];

dbConnection.connect(function(err) {
    if (err != null) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + dbConnection.threadId);

    const todoModel = new TodoModel(dbConnection);
 
    if (cmd == 'load') {
        todoModel.load((err, todoItems) => {
            if (err) throw err;
            console.log("existing todo items:", todoItems);
        });
    } else if (cmd == 'create') {
        todoModel.create(args, (err) => {
            if (err) throw err;
            console.log('new todo:', args);
        });
    } else if (cmd == 'update') {
        todoModel.update(args, args2, (err) => {
            if (err) throw err;
            console.log(args, 'updated to:', args2);
        });
    } else if (cmd == 'delete') {
        todoModel.delete(args, (err) => {
            if (err) throw err;
            console.log(args, 'has been deleted!')
        });
    } else if (cmd == 'tag') {
        todoModel.tagTodoItem(args, args2, (err) => {
            if (err) throw err;
            console.log(args, 'tagged to', args2)
        });
    } else if (cmd == 'untag') {
        todoModel.untagTodoItem(args, args2, (err) => {
            if (err) throw err;
            console.log(args, 'has untagged')
        });
    } else if (cmd == 'mark') {
        todoModel.markCompleted(args, (err) => {
            if (err) throw err;
            console.log(args, 'is done!')
        });
    } else if (cmd == 'help' && cmd == '') {
        fs.readFile('help.txt', 'utf8', (err, data) => {
            if (err) throw err;
            console.log(data)
        });
    } else {
        console.log("You didn't select anything check type help");
        fs.readFile('help.txt', 'utf8', (err, data) => {
            if (err) throw err;
            console.log(data)
        });
    }

    dbConnection.end();
});