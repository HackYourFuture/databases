const mysql = require('mysql');

class TodoModel {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }


    load(callback, userId) {
        if (userId) {
            const selectTask = `SELECT * FROM todo_items WHERE user_id = ?`;
            this.dbConnection.query(selectTask, userId, function (err, results, fields) {
                if (err) {
                    callback(err);
                    return;
                }

                callback(null, results);
            });
        } else {
            const selectTask = `SELECT * FROM todo_items`;
            this.dbConnection.query(selectTask, function (err, results, fields) {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null, results);
            });
        }
    }

    create(description, callback, userId) {
        const newTask = `INSERT INTO todo_items (text, user_id) VALUES (?, ?)`;
        this.dbConnection.query(newTask, description, userId, function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
    }

    update(id, description, callback) {
        const updateTask = `UPDATE todo_items SET text = ${description} WHERE id = ?`;
        this.dbConnection.query(updateTask, id, function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
    }

    delete(id, callback) {
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
        const tagTask = `INSERT INTO todo_item_tag (todo_item_id, tag_id) VALUES (?, ?)`;
        this.dbConnection.query(tagTask, todoItemId, tagId, function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
    }

    untagTodoItem(id, tagId, callback) {
        const untagTask = `Delete FROM todo_item_tag WHERE todo_item_id = ? AND tag_id = ?`;
        this.dbConnection.query(untagTask, id, tagId, function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
    }

    markCompleted(id, userId, callback) {
        const taskStatus = `UPDATE todo_items SET is_completed = True WHERE id = ? AND user_id = ?`;
        this.dbConnection.query(taskStatus, id, userId, function (err, results, fields) {
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
    user: 'user',
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

dbConnection.end();