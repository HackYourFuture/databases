// This is the connector (also known as driver)
// that we can use to connect to a MySQL process
// and access its databases.
const mysql = require('mysql');

class TodoModel {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }

    // Loads all the TODOs in the database
    load(callback) {
        const selectTodoItems = 'SELECT * FROM todo_items';
        this.dbConnection.query(selectTodoItems, (err, results, fields) => {
            if (err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
    }

    // creates a todo, required entries: description, userID || username
    create(description, callback, userID) {
        const createTodoQuery = 'INSERT INTO todo_items (text, user_id) VAULUES (?, ?)';
        this.dbConnection.query(createTodoQuery, description, userID, (err, results, fields) => {
            if (err) {
                return callback(err);
            }

            callback(null, results);
        });
    }

    update(id, description, callback) {
        // Write code and query to update and existing TODO item
        const updateTodoQuery = `UPDATE todo_items SET text = ${description} WHERE id = ?`;
        this.dbConnection.query(updateTodoQuery, id, (err, results, fields) => {
            if (err) {
                return callback(err);
            }

            callback(null, results);
        });
    }

    delete(id, callback) {
        // Write code and query to delete an existing TODO item
        const deleteTodoQuery = 'DELETE FROM todo_items WHERE id = ?';
        this.dbConnection.query(deleteTodoQuery, id, (err, results, fields) => {
            if (err) {
                return callback(err);
            }

            callback(null, results);
        });
    }

    tagTodoItem(todoItemId, tagId, callback) {
        // Write code and query add a tag to a TODO item
        const tagTodoQuery = 'INSERT INTO todo_item_tag (todo_item_id, tag_id) VALUES (?, ?)';
        this.dbConnection.query(tagTodoQuery, todoItemId, tagId, (err, results, fields) => {
            if (err) {
                return callback(err);
            }

            callback(null, results);
        });
    }
        
    untagTodoItem(todoItemId, tagId, callback) {
        // Write code and query remove a tag from a TODO item
        const untagTodoQuery = 'DELETE FROM todo_item_tag WHERE todo_item_id = ? AND tag_id = ?';
        this.dbConnection.query(untagTodoQuery, todoItemId, tagId, (err, results, fields) => {
            if (err) {
                return callback(err);
            }

            callback(null, results);
        });
    }

    markCompleted(todoItemId, userID, callback) {
        // Write code to mark a TODO item as completed
        const markCompletedQuery = 'UPDATE todo_items SET is_completed = true WHERE id = ? AND user_id = ?';
        this.dbConnection.query(markCompletedQuery, todoID, userID, (err, results, fields) => {
            if (err) {
                return callback(err);
            }
            
            callback(null, results);
        });
    }
}
// end of class todoModel


const dbConnection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root', // change to the newly created user
    password : 'hi', // no password for the new user
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