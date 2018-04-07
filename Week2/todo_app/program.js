// This is the connector (also known as driver)
// that we can use to connect to a MySQL process
// and access its databases.
'use strict';

const mysql = require('mysql');
const config = require('./config.json');
const cmd = process.argv[2];
const args1 = process.argv[3];
const args2 = process.argv[4];

const helpArray = {
    'create': 'CREATE A NEW TODO ITEM!',
    'update': 'UPDATE AN EXISTING TODO ITEM!',
    'delete': 'DELETE AN EXISTING TODO ITEM!',
    'tagTodoItem': 'ADD A TAG TO A TODO ITEM!',
    'untagTodoItem': 'REMOVE THE TAG FROM A TODO ITEM!',
    'completed': 'MARK A TODO ITEM AS COMPLETED!',
    'help': 'SHOW YOU THE USABLE COMMANDS!'
};

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

    create(description, user_id, callback) {
        const queryString = `INSERT INTO todo_items(text , is_completed , user_id) 
        VALUES (${connention.scape(description)} , 0 ,${connention.scape(user_id)} );`
        // this.dbConnection.query(queryString, () => {
        //     callback(null, results);
        // });


        this.dbConnection.query(queryString, function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
        // Write code and query to create a new TODO item

    }

    update(id, description, callback) {
        const queryString = `UPDATE todo_items
         SET text = ${connention.scape(description)} 
         WHERE id = ${connention.scape(id)};`;
        this.dbConnection.query(queryString, () => {
            callback(null, results);
        });
        // Write code and query to update and existing TODO item
    }

    delete(id, callback) {
        const queryString = `DELETE FROM todo_items
        WHERE id = ${connention.scape(id)};`;
        this.dbConnection.query(queryString, () => {
            callback(null, results);
        });
        // Write code and query to delete an existing TODO item
    }

    tagTodoItem(todoItemId, tagId, callback) {
        // const queryString = `INSERT INTO todo_item_tag(todo_item_id , tag_id)
        // SELECT * FROM (SELECT 'John', 'Doe', '022') AS tmp
        // WHERE NOT EXISTS (
        // SELECT name FROM table_listnames WHERE name = 'John'
        // );`;
        const queryString = `INSERT INTO todo_item_tag(todo_item_id , tag_id) 
        VALUES (${connention.scape(todoItemId)} , ${connention.scape(tagId)});`;
        this.dbConnection.query(queryString, () => {
            callback(null, results);
        });

        // Write code and query add a tag to a TODO item
    }

    untagTodoItem(todoItemId, tagId, callback) {
        const queryString = `DELETE FROM todo_item_tag
        WHERE todoItemId = ${connention.scape(todoItemId)} AND tagId = ${connention.scape(tagId)};`;
        this.dbConnection.query(queryString, () => {
            callback(null, results);
        });
        // Write code and query remove a tag from a TODO item
    }

    markCompleted(todoItemId, callback) {
        const queryString = `UPDATE todo_items 
        SET is_completed = 1
        WHERE ${connention.scape(todoItemId)} = id;`;
        this.dbConnection.query(queryString, () => {
            callback(null, results);
        });


        // Write code to mark a TODO item as completed
    }
}

const dbConnection = mysql.createConnection({
    host: config.host,
    user: config.username,
    password: config.password,
    database: 'todo_app'
});

dbConnection.connect(function (err) {
    if (err != null) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + dbConnection.threadId);

    const todoModel = new TodoModel(dbConnection);

    switch (cmd) {
        case "create":
            todoModel.create(args1, args2, () => {
                console.log(`NEW ELEMENT CREATED SUCCESFULLY!`);
            })
            break;

        case "update":
            todoModel.update(args1, args2, () => {
                console.log(`DATA UPDATED SUCCESFULLY!`);
            })
            break;

        case "delete":
            todoModel.delete(args1, () => {
                console.log(`DATA DELETED SUCCESFULLY!`);
            })
            break;

        case "tagTodoItem":
            todoModel.tagTodoItem(args1, args2, () => {
                console.log(`TAG ADDED TO TODO ITEM SUCCESFULLY!`);
            })
            break;

        case "untagTodoItem":
            todoModel.untagTodoItem(args1, args2, () => {
                console.log(`TAG REMOVED FROM TODO ITEM SUCCESFULLY!`);
            })
            break;

        case "completed":
            todoModel.markCompleted(args1, args2, () => {
                console.log(`TODO ITEM MARKED AS COMPLETED SUCCESFULLY!`);
            })
            break;

        case 'load':
            {
                todoModel.load((err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(result);

                    }
                })
                break;
            }

            // case "load":
            //     todoModel.load();
            //     break;



        case "help":
        default:
            console.log('PLEASE TYPE ONE OF THE BELOW COMMANDS!\n')
            console.log(helpArray);

    }







    // todoModel.load(function (err, todoItems) {
    //     if (err) {
    //         console.log("error loading TODO items:", err);
    //     }

    //     console.log("existing todo items:", todoItems);
    // });

    dbConnection.end();
});