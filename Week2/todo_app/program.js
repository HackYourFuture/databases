const mysql = require('mysql');
const config = require("./config");

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

    create(description, user_id, callback) {
        const createTodoItem = `INSERT INTO todo_items(text, is_completed, user_id) VALUES(${dbConnection.escape(description)}, 0, ${dbConnection.escape(user_id)})`;
        this.dbConnection.query(createTodoItem, function (error, results, fields) {
            if (error) {
                callback(error);
                return;
            }
            else {
                callback(null, results);
            }
        });
    }

    update(id, description, callback) {
        const updateTodoItem = `UPDATE todo_items SET text= ${dbConnection.escape(description)} WHERE id = ${dbConnection.escape(id)}`;
        this.dbConnection.query(updateTodoItem, function (error, results, fields) {
            if (error) {
                callback(error);
                return;
            }
            else {
                callback(null, results);
            }
        });
    }

    delete(id, callback) {
        const deleteTodoItem = `DELETE FROM todo_items WHERE = ${dbConnection.escape(id)}`;
        this.dbConnection.query(deleteTodoItem, function (error, results, fields) {
            if (error) {
                callback(error);
                return;
            }
            else {
                callback(null, results);
            }
        });
    }

    tagTodoItem(todoItemId, tagId, callback) {
        const tagATodo = `INSERT INTO todo_item_tag(todo_item_id, tag_id) VALUES(${dbConnection.escape(todoItemId)}, ${dbConnection.escape(tagId)})`;
        this.dbConnection.query(tagATodo, function (error, results, fields) {
            if (error) {
                callback(error);
                return;
            }
            else {
                callback(null, results);
            }
        });
    }

    untagTodoItem(todoItemId, tagId, callback) {
        const untagATodo = `DELETE FROM todo_item_tag WHERE todo_item_id = ${dbConnection.escape(todoItemId)} AND tag_id = ${dbConnection.escape(tagId)}`;
        this.dbConnection.query(untagATodo, function (error, results, fields) {
            if (error) {
                callback(error);
                return;
            }
            else {
                callback(null, results);
            }
        });
    }

    markCompleted(todoItemId, callback) {
        const markTodoCompleted = `UPDATE todo_items SET is_completed = 1 WHERE id = ${dbConnection.escape(todoItemId)}`;
        this.dbConnection.query(markTodoCompleted, function (error, results, fields) {
            if (error) {
                callback(error);
                return;
            }
            else {
                callback(null, results);
            }
        });
    }
}

const dbConnection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

let command = process.argv[2];
let arg1 = process.argv[3];
let arg2 = process.argv[4];

dbConnection.connect(function (err) {
    if (err != null) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + dbConnection.threadId);




    const todoModel = new TodoModel(dbConnection);
    switch (command) {
        case "load":   
            todoModel.load(function (error, data) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(data);    
            }
        })    
                break;
        case "create":
            todoModel.create(arg1, arg2, function () {
                console.log(`Todo has been created successfully`);
        })    
                break;
        case "update":
            todoModel.update(arg1, arg2, function () {
                console.log(`Todo has been updated successfully`);
        })    
                break;
        case "delete":
            todoModel.delete(arg1, function () {
                console.log(`Todo has been deleted successfully`);
        })    
                break;
        case "tagTodoItem":
            todoModel.tagTodoItem(arg1, agr2, function () {
                console.log(`Todo has been tagged successfully`);
        })    
                break;
        case "untagTodoItem":
            todoModel.untagTodoItem(arg1, arg2, function () {
                console.log(`Todo has been untagged successfully`);
        })    
                break;
        case "markCompleted":
            todoModel.markCompleted(arg1, function () {
                console.log(`Todo has been marked successfully`);
        })    
                break;
        default:
            console.log(`Please use only the following commands:\n
        load: To load all available Todos\n
        create: To create a new Todo\n
        update: To update an already existing Todo\n
        delete: To delete an already existing Todo\n
        tagTodoItem: To tag an already existing Todo\n
        untagTodoItem: To untag an already existing Todo\n
        markCompleted: To mark complete an already existing Todo`);    
    }


    dbConnection.end();
});