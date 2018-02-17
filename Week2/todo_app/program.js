
const mysql = require('mysql');

const express = require("express");
const app = express();

const fs = require("fs");

const bodyParser = require('body-parser');


class TodoModel {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }

    // Loads all the TODOs in the database
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


    create(description, callback) {

        const createNewItem = "INSERT INTO `todo_app`.`todo_items` (`text`, `is_completed`, `user_id`) VALUES ('?', '?', '?')";
        this.dbConnection.query(createNewItem,[description],function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            }

            callback(null, results);
        });



    }

    update(id, description, callback) {


        const updateItem = "UPDATE `todo_app`.`todo_items` SET `id`='?', `text`='?', `user_id`='?' WHERE `id`='?'";
        this.dbConnection.query(updateItem, [description, id], function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            }

            callback(null, results);
        });


    }

    delete(id, callback) {
  
        const deleteItem = "DELETE FROM `todo_app`.`todo_items` WHERE `id`='?'";
        this.dbConnection.query(deleteItem, [id], function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            }

            callback(null, results);
        });


    }

    tagTodoItem(todoItemId, tagId, callback) {
        

        const addTag = "INSERT INTO `todo_app`.`todo_item_tag` (`todo_item_id`, `tag_id`) VALUES ('?', '?')";
        this.dbConnection.query(addTag, [todoItemId, tagId ], function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            }

            callback(null, results);
        });

    }

    untagTodoItem(todoItemId, tagId, callback) {
        

        const unTagItem = "DELETE FROM `todo_app`.`todo_items` WHERE `id`='?'";
        this.dbConnection.query(unTagItem, [todoItemId, tagId ], function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            }

            callback(null, results);
        });

    }

    markCompleted(todoItemId, callback) {

        const markComplete = "UPDATE `todo_app`.`todo_items` SET `is_completed`='1' WHERE `id`='?'";
        this.dbConnection.query(markComplete, [todoItemId], function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            }

            callback(null, results);
        });


    }
}

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
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
});