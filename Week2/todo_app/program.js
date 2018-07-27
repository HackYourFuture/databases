// This is the connector (also known as driver)
// that we can use to connect to a MySQL process
// and access its databases.
const mysql = require('mysql');

class TodoModel {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }

    _query(statement, parameters, callback) {
        this.dbConnection.query(statement, parameters, function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            }
            if (results.affectedRows === 0) {
                callback(null, '0 todo effected, please recheck your parameters');
                return;
            }
            callback(null, results.affectedRows + ' todos effected');
        });
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

    create(description, userId, callback) {
        const insertTodoItem = "INSERT INTO todo_items (text, user_id) VALUES (?,?)";
        this._query(insertTodoItem, [description, userId], callback);
    }

    update(id, description, callback) {
        const updateTodoItem = "UPDATE todo_items SET text = ? WHERE id = ?";
        this._query(updateTodoItem, [description, id], callback);
    }

    delete(id, callback) {
        const deleteTodoItem = "DELETE FROM todo_items WHERE id = ?";
        this._query(deleteTodoItem, id, callback);
    }

    tagTodoItem(todoItemId, tagId, callback) {
        const insertTodoTag = "INSERT INTO todo_item_tag VALUES (?,?)";
        this._query(insertTodoTag, [todoItemId, tagId], callback);
    }

    untagTodoItem(todoItemId, tagId, callback) {
        const deleteTodoTag = "DELETE FROM todo_item_tag WHERE todo_item_id = ? AND tag_id = ?";
        this._query(deleteTodoTag, [todoItemId, tagId], callback);
    }

    markCompleted(todoItemId, callback) {
        const updateTodoItem = "UPDATE todo_items SET is_completed = 1 WHERE id = ?";
        this._query(updateTodoItem, todoItemId, callback);
    }
}

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'todo_app',
    password: 'password',
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
            return console.log("error loading TODO items:", err.message);
        }

        return console.log("existing todo items:", todoItems);
    });
    dbConnection.end();
});
