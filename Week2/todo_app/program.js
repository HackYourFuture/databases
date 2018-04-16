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
        // Write code and query ito create a new TODO item
        let createTodos = 'INSERT INTO todo_items (text,user_id) VALUES(?,?)';
        this.dbConnection.query(createTodos, [description, userId], function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            } else {
                callback(null, results);
            }
        });
    }




    update(id, description, callback) {
        // Write code and query to update and existing TODO item
        let updateTodos = 'UPDATE todo_items SET text=? WHERE id=?';
        this.dbConnection.query(updateTodos, [description, id], function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            } else {
                callback(null, results);
            }
        });
    }

    delete(id, callback) {
        // Write code and query to delete an existing TODO item
        let deleteTodos = 'DELETE FROM todo_items WHERE id=?';
        this.dbConnection.query(deleteTodos, id, function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            } else {
                callback(null, results);
            }
        });
    }

    tagTodoItem(todoItemId, tagId, callback) {
        // Write code and query add a tag to a TODO item
        let addingTagTodos = 'INSERT INTO todo_items_tag(todo_item_id,tag_id) VALUES (?,?)';
        this.dbConnection.query(addingTagTodos, [todoItemId, tagId], function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            } else {
                callback(null, results)
            }
        });
    }

    untagTodoItem(todoItemId, tagId, callback) {
        // Write code and query remove a tag from a TODO item
        let untagTodos = 'DELETE FROM todo_item_tag WHERE todo_item_id=? AND tag_id=? ';
        this.dbConnection.query(untagTodos, [todoItemId, tagId], function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            } else {
                callback(null, results);
            }

        });
    }

    markCompleted(todoItemId, callback) {
        // Write code to mark a TODO item as completed
        let markCompletedTodos = 'UPDATE todo_items SET is_completed = true WHERE id = ?';
        this.dbConnection.query(untagTodos, [todoItemId, tagId], function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            } else {
                callback(null, results);
            }
        });
    }
}

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
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
    todoModel.load(function (err, todoItems) {
        if (err) {
            console.log("error loading TODO items:", err);
        }

        console.log("existing todo items:", todoItems);
    });
});
