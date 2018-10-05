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
        const selectTodoItems = "select * FROM todo_items";
        this.dbConnection.query(selectTodoItems, function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
    }

    create(description, callback) {
        // Write code and query to create a new TODO item
        const newItem = "INSERT INTO todo_items (text,user_id) VALUES (?,?)";
        this.dbConnection.query(newItem, [description, id], function (err, results) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
    }

    update(id, description, callback) {
        // Write code and query to update and existing TODO item
        const updateItem = "UPDATE todo_items SET text = ? WHERE id = ?";
        this.dbConnection.query(updateItem, [description, id], function (err, results) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        });

    }


    delete(id, callback) {
        // Write code and query to delete an existing TODO item
        const deletItem = "DELETE FROM todo_items WHERE id = ?";
        this.dbConnection.query(deletItem, [id], function (err, results) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
    }

    tagTodoItem(todoItemId, tagId, callback) {
        // Write code and query add a tag to a TODO item
        const taggedItem = "INSERT INTO todo_item_tag VALUES (?, ?)";
        this.dbConnection.query(taggedItem, [todoItemId, tagId], function (err, results) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        });

    }

    untagTodoItem(todoItemId, tagId, callback) {
        // Write code and query remove a tag from a TODO item
        const unTaggedItem = "DELETE FROM todo_item_tag WHERE todo_item_id = ? AND tag_id = ?";
        this.dbConnection.query(unTaggedItem, [todoItemId, tagId], function (err, results) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
    }

    markCompleted(todoItemId, callback) {
        // Write code to mark a TODO item as completed
        const markItem = "UPDATE todo_items SET is_completed = 1 WHERE id = ?";
        this.dbConnection.query(markItem, [todoItemId], function (err, results) {
            if (err) {
                callback(err);
                return;
            }
            callback(results);
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

        console.log("loading todo items is OK:", todoItems);
    });
});

todoModel.create("study databases", 1, function (err, todoItems) {
    if (err) {
        console.log("error creating TODO items:", err);
    }

    console.log("creating todo items is OK:", todoItems);
});

todoModel.update(46, "study javascript", function (err, todoItems) {
    if (err) {
        console.log("error updating TODO items:", err);
    }

    console.log("updating todo items is OK:", todoItems);
});

todoModel.tagTodoItem(46, 1, function (err, todoItems) {
    if (err) {
        console.log("error tagging TODO items:", err);
    }
    console.log("tagging todo items is OK:", todoItems);
});

todoModel.untagTodoItem(46, 1, function (err, todoItems) {
    if (err) {
        console.log("error untagging TODO items:", err);
    }
    console.log("untagging todo items is OK:", todoItems);
});

todoModel.markCompleted(46, function (err, todoItems) {
    if (err) {
        console.log("error marking TODO items:", err);
    }
    console.log("marking todo items is OK:", todoItems);
});
todoModel.delete(46, function (err, todoItems) {
    if (err) {
        console.log("error deleting TODO items:", err);
    }
    console.log("deleting todo items is OK:", todoItems);
});
dbConnection.end();
