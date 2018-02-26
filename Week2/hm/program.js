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
        const createToDoItem = "INSERT INTO todo_items(text, user_id) VALUES (?,?)";
        this.dbConnection.query(createToDoItem, [description, userId], ((err, results, fields) => {
            if (err) {
                callback(err)
                return;
            }
            callback(null, results);
        })
        )
    }
    update(id, description, callback) {
        // Write code and query to update and existing TODO item
        const updateTodoDescription = "UPDATE todo_items SET text= ? WHERE id= ?";
        this.dbConnection.query(updateTodoDescription, [description, id], ((err, results, fields) => {
            if (err) {
                callback(err)
                return;
            }
            callback(null, results);
        })
        )
    }
    delete(id, callback) {
        // Write code and query to delete an existing TODO item
        const deleteItem = "DELETE FROM todo_items WHERE id = ?";
        this.dbConnection.query(deleteItem, [id], ((err, results, fields) => {
            if (err) {
                callback(err)
                return;
            }
            callback(null, results);
        })
        )
    }

    tagTodoItem(todoItemId, tagId, callback) {
        // Write code and query add a tag to a TODO item
        const addToDoItemTag = "INSERT INTO todo_item_tag(todo_item_id, tag_id) VALUES (?,?)";
        this.dbConnection.query(createToDoItem, [todoItemId, tagId], ((err, results, fields) => {
            if (err) {
                callback(err)
                return;
            }
            callback(null, results);
        })
        )
    }

    untagTodoItem(todoItemId, tagId, callback) {
        // Write code and query remove a tag from a TODO item
        const deleteItemTag = "DELETE FROM todo_item_tag WHERE todo_item_id = ? AND tag_id = ?";
        this.dbConnection.query(deleteItem, [todoItemId, tagId], ((err, results, fields) => {
            if (err) {
                callback(err)
                return;
            }
            callback(null, results);
        })
        )
    }
    markCompleted(Id, callback) {
        // Write code to mark a TODO item as completed
        const todoItemState = "UPDATE todo_items SET is_completed = true WHERE id = ?";
        this.dbConnection.query(updateTodoDescription, [Id], ((err, results, fields) => {
            if (err) {
                callback(err)
                return;
            }
            callback(null, results);
        })
        )
    }
}

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'jalal',
    password: '123',
    database: 'todo_app'
});

dbConnection.connect(function (err) {
    if (err != null) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + dbConnection.threadId);

    const todoModel = new TodoModel(dbConnection);
    // here to place the method we want to call.
    todoModel.delete(49, function (err) {
        if (err) {
            console.log("error deleting TODO items:", err);
        }
        console.log("deleting in done, good job lol.");
    });
    todoModel.load(function (err, todoItems) {
        if (err) {
            console.log("error loading TODO items:", err);
        }

        console.log("existing todo items:", todoItems);
    });
});