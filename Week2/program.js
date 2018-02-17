// This is the connector (also known as driver)
// that we can use to connect to a MySQL process
// and access its databases.
const mysql = require('mysql');

class TodoModel {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }

    // Loads all the TODO in the database
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
        const createTodoItemsQuery = `INSERT INTO todo_items (text, user_id) VALUES (${mysql.escape(description)}, ${mysql.escape(userId)})`;
        this.dbConnection.query(createTodoItemsQuery, function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
    }

    update(id, description, callback) {
        const updateTodoItemsQuery = `UPDATE todo_items SET text = ${mysql.escape(description)} WHERE id = ${mysql.escape(id)}`;
        this.dbConnection.query(updateTodoItems, function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
    }

    delete(id, callback) {
        const deleteTodoItemsQuery = `DELETE FROM todo_items WHERE id = ${mysql.escape(id)}`;
        this.dbConnection.query(deleteTodoItemsQuery, function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
    }

    tagTodoItem(todoItemId, tagId, callback) {
        const tagTodoItemQuery = `INSERT INTO todo_item_tag (todo_item_id, tag_id) VALUES (${mysql.escape(todoItemId)}, ${mysql.escape(tagId)});`;
        this.dbConnection.query(tagTodoItemQuery, function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
    }

    unTagTodoItem(todoItemId, tagId, callback) {
        const unTagTodoItemQuery = `DELETE FROM todo_item_tag WHERE todo_item_id = ${mysql.escape(todoItemId)} and tag_id = ${mysql.escape(tagId)}`;
        this.dbConnection.query(unTagTodoItemQuery, function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
    }

    markCompleted(todoItemId, callback) {
        const markCompletedQuery = `UPDATE todo_items SET is_completed = true WHERE id = ${mysql.escape(todoItemId)}`;
        this.dbConnection.query(markCompletedQuery, function (err, results, fields) {
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
    user: 'Mo',
    password: 'User@123',
    database: 'todo_app'
});

dbConnection.connect(function (err) {
    if (err != null) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + dbConnection.threadId);

    const todoModel = new TodoModel(dbConnection);

    todoModel.create('chill for half an hour',4, function (err, todoItems) {
        if (err) {
            console.log("error loading TODO items:", err);
        }

        console.log("existing todo items:", todoItems);
    });

    todoModel.load(function (err, todoItems) {
        if (err) {
            console.log("error loading TODO items:", err);
        }

        console.log("existing todo items:", todoItems);
    });
});