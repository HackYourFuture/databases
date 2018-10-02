// This is the connector (also known as driver)
// that we can use to connect to a MySQL process
// and access its databases.
const mysql = require('mysql');
const inputAll = process.argv[2];
let description = process.argv[3];
let id = process.argv[4];

class TodoModel {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }

    load(callback) {
        const selectTodoItems = `SELECT * FROM todo_items`;
        this.dbConnection.query(selectTodoItems, function(err, results) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
    }

    ///think about collection of inputs?
    create(callback) {
        //const description = process.argv[3];
        //const userID = process.argv[4];
        const createTodoItems = `INSERT INTO todo_items VALUES(NULL, '${description}', false, ${id})`;

        this.dbConnection.query(createTodoItems, function(err, results) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
    }
    update(callback) {

        const updateTodoItems = `UPDATE todo_items SET text = '${description}' WHERE id = ${id}`;
        this.dbConnection.query(updateTodoItems, function(err, results) {
            if (err) {
                callback(err);
                return;
            }
            console.log('Task with ID: ' + id + ' updated to: ' + description);
            callback(null, results);
        });
    }

    delete(callback) {
        const deleteTodo = `DELETE FROM todo_items WHERE id = ${description}`;
        this.dbConnection.query(deleteTodo, function(err, results) {
            if (err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
    }

    tagTodoItem(todoItemId, tagId, callback) {
        // Write code and query add a tag to a TODO item
    }

    untagTodoItem(todoItemId, tagId, callback) {
        // Write code and query remove a tag from a TODO item
    }

    markCompleted(todoItemId, callback) {
        // Write code to mark a TODO item as completed
    }
}

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'test_user',
    password: '',
    database: 'todo_app'
});

dbConnection.connect(function(err) {
    if (err != null) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + dbConnection.threadId);
    const todoModel = new TodoModel(dbConnection);

    if (inputAll == 'load') {
        todoModel.load(function(err, todoItems) {
            if (err) {
                console.log('error loading TODO items:', err);
            }
            console.log('existing todo items:', todoItems);
        });
    } else if (inputAll == 'create') {
        todoModel.create(function(err) {
            if (err) {
                console.log('error loading TODO items:', err);
            }
            console.log('created new task: ' + description + ' with user ID: ' + id);
        });
    } else if (inputAll == 'update') {
        todoModel.update(function(err) {
            if (err) {
                console.log('error loading TODO items:', err);
            }
            console.log('Task with ID: ' + id + ' updated to: ' + description);
        })
    } else if (inputAll == 'delete') {
        todoModel.delete(function(err) {
            if (err) {
                console.log("error loading TODO items:", err);
            }
            console.log('deleted task with id of: ', description);
        });
    }
});