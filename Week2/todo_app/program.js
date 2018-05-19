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

    create(user_id, description, callback) {
        const createTodoItem = `INSERT INTO todo_items(text, is_completed, user_id)
        VALUES(${dbConnection.escape(description)}, 0, ${dbConnection.escape(user_id)})`;
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
        const updateTodoItem = `UPDATE todo_items SET text= ${dbConnection.escape(description)}
         WHERE id = ${dbConnection.escape(id)}`;
        this.dbConnection.query(updateTodoItem, function (error, results) {
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
        const deleteTodoItem = `DELETE FROM todo_items WHERE id = ${dbConnection.escape(id)}`;
        this.dbConnection.query(deleteTodoItem, function (error, results) {
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
        const tagATodo = `INSERT INTO todo_item_tag(todo_item_id, tag_id) VALUES(${dbConnection.escape(todoItemId)},
         ${dbConnection.escape(tagId)})`;
        this.dbConnection.query(tagATodo, function (error, results) {
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
        const tagDeleteQuery = `
        DELETE FROM todo_item_tag
        WHERE todoItemId = ${dbConnection.escape(todoItemId)} AND tagId = ${dbConnection.escape(tagId)}`;
        this.dbConnection.query(tagDeleteQuery, (error, results) => {
            if (error) {
                callback(error);
                return;
            }
            callback(null, results);
        });
    }

    markCompleted(todoItemId, callback) {
        const updateQuery = `
        UPDATE todo_items SET is_completed = 1
        WHERE ${dbConnection.escape(todoItemId)} = id`;
        this.dbConnection.query(updateQuery, (error, results, fields) => {
            if (error) {
                callback(error);
                return;
            }
            callback(null, results);
        });
    }
}

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
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


    // create
    todoModel.create(2, "create anything", function (err, todoItems) {
        if (err) {
            console.log("error loading TODO items:", err);
        }

        console.log("existing todo items:", todoItems);
    });

    // update
    todoModel.update(49, "update Todo ITEM", function (err, todoItems) {
        if (err) {
            console.log("error loading TODO items:", err);
        }
        console.log("existing todo items:", todoItems);
    });

    // delete
    todoModel.delete(52, function (err, todoItems) {
        if (err) {
            console.log("error loading TODO items:", err);
        }
        console.log("existing todo items:", todoItems);
    });

    // Tag Todo Item
    todoModel.tagTodoItem(50, 2, function (err, todoItems) {
        if (err) {
            console.log("error loading TODO items:", err);
        }
        console.log("existing todo items:", todoItems);
    });

    //untag Todo Item
    todoModel.untagTodoItem(56, 2, function (err, todoItems) {
        if (err) {
            console.log("error loading TODO items:", err);
        }
        console.log("existing todo items:", todoItems);
    });

    //mark completed
    todoModel.markCompleted(56, function (err, todoItems) {
        if (err) {
            console.log("error loading TODO items:", err);
        }
        console.log("existing todo items:", todoItems);
    });
});
