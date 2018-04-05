// This is the connector (also known as driver)
// that we can use to connect to a MySQL process
// and access its databases.
const mysql = require('mysql');
const config = require('./db-secret.json');
const fs = require('fs');

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

    create(description, callback) {
        const queryString = `INSERT INTO todo_items(text, is_completed, user_id) VALUES (${description}, 0, NULL)`;
        this.dbConnection.query(queryString, (err, results, fields) => {
            if (err) {
                callback(err);
                return;
            } else {
                callback(null, results)
            }
        });
    }

    update(id, description, callback) {
        const queryString = `UPDATE todo_items SET text = ${description} WHERE id = ${id}`
        this.dbConnection.query(queryString, (err, results, fields) => {
            if (err) {
                callback(err);
                return;
            } else {
                callback(null, results)
            }
        })
    }

    delete(id, callback) {
        const queryString = ` DELETE FROM todo_items WHERE id = ${id}`;
        this.dbConnection.query(queryString, (err, results, fields) => {
            if (err) {
                callback(err);
                return;
            } else {
                callback(null, results)
            }
        })
    }

    tagTodoItem(todoItemId, tagId, callback) {
        const queryString = `INSERT INTO todo_item_tag(todo_item_id, tag_id) VALUES (${todoItemId}, ${tagId})`;
        this.dbConnection.query(queryString, (err, results, fields) => {
            if (err) {
                callback(err);
                return;
            } else {
                callback(null, results)
            }
        })
    }

    untagTodoItem(todoItemId, tagId, callback) {
        const queryString = `DELETE FROM todo_item_tag WHERE todo_item_id = ${todoItemId}`;
        this.dbConnection.query(queryString, (err, results, fields) => {
            if (err) {
                callback(err);
                return;
            } else {
                callback(null, results)
            }
        })
    }

    markCompleted(todoItemId, callback) {
        const queryString = `UPDATE todo_items SET is_completed = 1 WHERE id = ${todoItemId}`;
        this.dbConnection.query(queryString, (err, results, fields) => {
            if (err) {
                callback(err);
                return;
            } else {
                callback(null, results)
            }
        })
    }
}

const dbConnection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: 'todo_app'
});

const cmd = process.argv[2];
const args = process.argv[3];
const args2 = process.argv[4];


dbConnection.connect(function (err) {
    if (err != null) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + dbConnection.threadId);

    const todoModel = new TodoModel(dbConnection);

    switch (cmd) {
        case 'load':
            todoModel.load((err, todoItems) => {
                if (err) {
                    console.log("error loading TODO items:", err);
                }

                console.log("existing todo items:", todoItems);
            });
            break;

        case 'create':
            todoModel.create(args, () => {
                console.log('new todo:', args);
            });
            break;
        
        case 'update':
            todoModel.update(args, args2, () => {
                console.log(args, 'updated to:', args2);
            });
            break;
        
        case 'delete':
            todoModel.delete(args, () => {
                console.log(args, 'has been deleted!')
            });
            break;
        
        case 'tag':
            todoModel.tagTodoItem(args, args2, () => {
                console.log(args, 'tagged to', args2)
            });
            break;
        
        case 'untag':
            todoModel.untagTodoItem(args, args2, () => {
                console.log(args, 'has untagged')
            });
            break;

        case 'mark':
            todoModel.markCompleted(args, () => {
                console.log(args, 'is done!')
            });
            break;

        default: 'help'
            fs.readFile('help.txt', 'utf8', (err, data) => {
                console.log(data)
            });    
            break;
    }
    dbConnection.end();
});
