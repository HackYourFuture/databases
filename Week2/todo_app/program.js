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

    create(description, userId, callback) {
        // Write code and query to create a new TODO item
        const createTodoItem = `INSERT INTO todo_items(text, is_completed, user_id) 
                                VALUES (${dbConnection.escape(description)}, "0", ${dbConnection.escape(userId)})`;
        this.dbConnection.query(createTodoItem, (err, results) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
    }

    update(id, description, callback) {
        // Write code and query to update and existing TODO item
        const updateTodoItem = `UPDATE todo_items SET text = ${dbConnection.escape(description)} 
                                WHERE id = ${dbConnection.escape(id)}`;
        this.dbConnection.query(updateTodoItem, (err, results) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
    }

    delete(id, callback) {
        // Write code and query to delete an existing TODO item
        const deleteTodoItem = `DELETE FROM todo_items WHERE id = ${dbConnection.escape(id)}`;
        this.dbConnection.query(deleteTodoItem, (err, results) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
    }

    tagTodoItem(todoItemId, tagId, callback) {
        // Write code and query add a tag to a TODO item
        const addTagTodoItem = `INSERT INTO todo_item_tag(todo_item_id, tag_id) 
                                VALUES (${dbConnection.escape(todoItemId)}, ${dbConnection.escape(tagId)})`;
        this.dbConnection.query(addTagTodoItem, (err, results) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
    }

    untagTodoItem(todoItemId, tagId, callback) {
        // Write code and query remove a tag from a TODO item
        const removeTagTodoItem = `DELETE FROM todo_item_tag WHERE todo_item_id = ${dbConnection.escape(todoItemId)}
        AND tag_id = ${dbConnection.escape(tagId)}`;
        this.dbConnection.query(removeTagTodoItem, (err, results) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
    }

    markCompleted(todoItemId, callback) {
        // Write code to mark a TODO item as completed
        const markCompletedTodoItem = `UPDATE todo_items SET is_completed = 1 
        WHERE id = ${dbConnection.escape(todoItemId)}`;
        this.dbConnection.query(markCompletedTodoItem, (err, results) => {
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
    user: 'root',
    password: '',
    database: 'todo_app'
});

const command = process.argv[2];
const param1 = process.argv[3];
const param2 = process.argv[4];


dbConnection.connect(function (err) {
    if (err != null) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + dbConnection.threadId);

    const todoModel = new TodoModel(dbConnection);

    switch (command) {
        case 'load':
            {
                todoModel.load(function (err, todoItems) {
                    if (err) {
                        console.log("error loading TODO items:", err);
                    }
                    console.log("existing todo items:", todoItems);
                });
                break;
            }

        case 'create':
            {
                todoModel.create(param1, param2, function (err) {
                    if (err) {
                        console.log("Error: todo item has been not created:", err);
                    }
                    console.log('The new todo item has been created successfully:', param1);
                });
                break;
            }

        case 'update':
            {
                todoModel.update(param1, param2, function (err) {
                    if (err) {
                        console.log("Error: todo item has been not updated:", err);
                    }
                    console.log('The todo item has been updated successfully:', param1);
                });
                break;
            }

        case 'delete':
            {
                todoModel.delete(param1, function (err) {
                    if (err) {
                        console.log("Error: todo item has been not deleted:", err);
                    }
                    console.log('The todo item has been deleted successfully:', param1);
                });
                break;
            }

        case 'tagTodoItem':
            {
                todoModel.tagTodoItem(param1, param2, function (err) {
                    if (err) {
                        console.log("Error: tag has been not added:", err);
                    }
                    console.log('The tag has been added successfully:', param1);
                });
                break;
            }

        case 'untagTodoItem':
            {
                todoModel.untagTodoItem(param1, param2, function (err) {
                    if (err) {
                        console.log("Error: tag has been not removed:", err);
                    }
                    console.log('The tag has been removed successfully:', param1);
                });
                break;
            }
        case 'markCompleted':
            {
                todoModel.markCompleted(param1, function (err) {
                    if (err) {
                        console.log("Error: todo item has been not completed:", err);
                    }
                    console.log('Todo item has been completed successfully')
                });
            }

        default:
            console.log("404 error: commend Not found!");
            break;
    }


});