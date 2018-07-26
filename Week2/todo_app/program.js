// This is the connector (also known as driver)
// that we can use to connect to a MySQL process
// and access its databases.
const mysql = require('mysql');

//User needs to be defined to be able to correctly perform actions on the todo_items Table
const userId = process.argv[2];
const id = process.argv[3];
const description = process.argv[4];
const tagId = process.argv[4];

class TodoModel {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }

    // Loads all the TODOs in the database
    load(callback) {
        if (process.argv.length >= 2) {
            const selectTodoItems = "SELECT * FROM todo_items WHERE user_id = ?";
            this.dbConnection.query(selectTodoItems, userId, function(err, results, fields) {
                if(err) {
                    callback(err);
                    return;
                }

                callback(null, results);
            });
        } else {
            const selectTodoItems = "SELECT * FROM todo_items ";
            this.dbConnection.query(selectTodoItems, function (err, results, fields) {
                if (err) {
                    callback(err);
                    return;
                }

                callback(null, results);
            });
        }
    }

    create(description, callback) {
        // Write code and query to create a new TODO item
        const createTodoItem = `INSERT INTO todo_items (text, user_id) VALUES (?, ?)`;
        this.dbConnection.query(createTodoItem, description, userId, function(err, results, fields){
            if (err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
    }

    update(id, description, callback) {
        // Write code and query to update and existing TODO item
        const updateTodoItem = `UPDATE todo_items SET text = ${description} WHERE id = ?`;
        this.dbConnection.query(updateTodoItem, id, function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
    }

    delete(id, callback) {
        // Write code and query to delete an existing TODO item
        const deleteTodoItem = `DELETE FROM todo_items WHERE id = ?`;
        this.dbConnection.query(deleteTodoItem, id, function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
    }

    tagTodoItem(todoItemId, tagId, callback) {
        // Write code and query add a tag to a TODO item
        const tagTodo = `UPDATE todo_item_tag SET tag_id = ?, todo_item_id = ?`;
        this.dbConnection.query(tagTodo, tagId, todoItemId, function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
    }
        
    untagTodoItem(id, tagId, callback) {
        // Write code and query remove a tag from a TODO item
        const untagTodo = `Delete FROM todo_item_tag WHERE todo_item_id = ? AND tag_id = ?`;
        this.dbConnection.query(untagTodo, tagId, id, function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
    }

    markCompleted(id, callback) {
        // Write code to mark a TODO item as completed
        const markTodoItem = `UPDATE todo_items SET is_completed = True WHERE id = ? AND user_id = ?`;
        this.dbConnection.query(markTodoItem, id, userId, function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
    }
}

const dbConnection = mysql.createConnection({
    host     : 'localhost',
    user     : 'user',
    password : '',
    database : 'todo_app'
});

dbConnection.connect(function(err) {
    if (err != null) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + dbConnection.threadId);

    const todoModel = new TodoModel(dbConnection);
    todoModel.load(function(err, todoItems) {
        if(err) {
            console.log("error loading TODO items:", err);
        }

        console.log("existing todo items:", todoItems);
    });
});

dbConnection.end();