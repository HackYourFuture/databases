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
        const selectTodoItems = `SELECT * FROM todo_items `;
        this.dbConnection.query(selectTodoItems, function(err, results) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
    }

    create(callback) {
        const createTodoItems = `INSERT INTO todo_items
         VALUES(NULL, '${description}', false, ${id})`;
        this.dbConnection.query(createTodoItems, function(err, results) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
    }
    update(callback) {

        const updateTodoItems = `UPDATE todo_items SET text = '' WHERE id = ` +
            this.dbConnection.escape(description, id);
        this.dbConnection.query(updateTodoItems, function(err, results) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
    }

    delete(callback) {
        const deleteTodo = `DELETE FROM todo_items WHERE id = ` +
            this.dbConnection.escape(description);
        this.dbConnection.query(deleteTodo, function(err, results) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
    }

    tagTodoItem(callback) {
        const addTagTodoItem = `INSERT INTO todo_item_tag
         VALUES (${description}, ${id})`;
        this.dbConnection.query(addTagTodoItem, function(err, results) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
    }

    untagTodoItem(callback) {

        const untagTodoItem = `DELETE FROM todo_item_tag WHERE 
        todo_item_id = ${description}  and tag_id = ${id}  `;
        this.dbConnection.query(untagTodoItem, function(err, results) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
    }

    markCompleted(callback) {
        const taskDone = `UPDATE todo_items SET 
        is_completed = true WHERE id = ` +
            this.dbConnection.escape(description);
        this.dbConnection.query(taskDone, function(err, results) {
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
    user: 'userx',
    password: 'secret',
    database: 'todo_app'
});

dbConnection.connect(function(err) {
    if (err != null) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + dbConnection.threadId);
    const todoModel = new TodoModel(dbConnection);

    switch (inputAll) {
        case 'load':
            todoModel.load(function(err, todoItems) {
                if (err) {
                    console.log('error loading TODO items:', err);
                }
                console.log('existing todo items:\n', todoItems);
            })
            break;
        case 'create':
            todoModel.create(function(err) {
                if (err) {
                    console.log('error loading TODO items:', err);
                }
                console.log('created new task: ' + description + ' with user ID: ' + id);
            })
            break;
        case 'update':
            todoModel.update(function(err) {
                if (err) {
                    console.log('error loading TODO items:', err);
                }
                console.log('Task with ID: ' + id + ' updated to: ' + description);
            })
            break;
        case 'delete':
            todoModel.delete(function(err) {
                if (err) {
                    console.log('error loading TODO items:', err);
                }
                console.log('deleted task with id of: ', description);
            })
            break;
        case 'item_tag':
            todoModel.tagTodoItem(function(err) {
                if (err) {
                    console.log('error loading TODO items:', err);
                }
                console.log('todo item with ID: ' + description + ' ,added to Tag with ID: ' + id);
            })
            break;
        case 'untag':
            todoModel.untagTodoItem(function(err) {
                if (err) {
                    console.log('error loading TODO items:', err);
                }
                console.log('todo item with ID: ' + description + ' , removed from Tag with ID: ' + id);
            })
            break;
        case 'done':
            todoModel.markCompleted(function(err) {
                if (err) {
                    console.log('error loading TODO items:', err);
                }
                console.log('todo item with ID: ' + description + ' , is completed(true)');
            })
            break;
        default:
            console.log('See help.txt for tips!');
    }
    dbConnection.end();
});