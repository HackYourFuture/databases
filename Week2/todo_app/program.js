const mysql = require('mysql');

class TodoModel {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }

    load(callback) {
        const selectTodoItems = "SELECT * FROM todo_items";
        this.dbConnection.query(selectTodoItems, function(err, results, fields) {
            if(err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
    }

    create(description, callback) {
        // Write code and query to create a new TODO item
        const createTodoItem = "INSERT INTO todo_items (text) VALUES (" + connection.escape(description) + ")";
        this.dbConnection.query(createTodoItem, function(err, results, fields) {
            if(err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
    }

    update(id, description, callback) {
        // Write code and query to update and existing TODO item
        const updateTodoItem = "UPDATE todo_items SET text = ? WHERE id = ?";
        this.dbConnection.query(updateTodoItem, [description,id], function(err, results, fields) {
            if(err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
    }

    delete(id, callback) {
        // Write code and query to delete an existing TODO item
        const deleteTodoItem = "DELETE FROM todo_items WHERE id = ?";
        this.dbConnection.query(deleteTodoItem, [id], function(err, results, fields) {
            if(err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
    }

    tagTodoItem(todoItemId, tagId, callback) {
        // Write code and query add a tag to a TODO item
        const tagTodoItem = "INSERT INTO todo_item_tag(todo_item_id , tag_id) VALUES(? ,?)";
        this.dbConnection.query(tagTodoItem, [todoItemId,tagId], function(err, results, fields) {
            if(err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
    }
        
    untagTodoItem(todoItemId, tagId, callback) {
        // Write code and query remove a tag to a TODO item
        const untagTodoItem = "DELETE FROM todo_item_tag WHERE todo_item_id = ? AND  tag_id = ?";
        this.dbConnection.query(untagTodoItem, [todoItemId,tagId], function(err, results, fields) {
            if(err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
    }

    markCompleted(todoItemId, callback) {
        // Write code to mark a TODO item as completed
        const markTodoItem = "UPDATE todo_items SET is_completed = 1 WHERE id = " + connection.escape(todoItemId);
        this.dbConnection.query(markTodoItem, function(err, results, fields) {
            if(err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
    }
}

const dbConnection = mysql.createConnection({
    host     : 'localhost',
    user     : 'user',
    password : 'password',
    database : 'todo_app'
});

dbConnection.connect(function(err) {
    if (err != null) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + dbConnection.threadId);

    const todoModel = new TodoModel(dbConnection);
    todoModel.load(function(err, todoItems) {
        if(err) {
            console.log("error loading TODO items:", err);
        }

        console.log("existing todo items:", todoItems);
    });
    
    todoModel.create("I have to do this", function(err, todoItems) {
        if(err) {
            console.log("error creating TODO items:", err);
        }

        console.log("added a new  todo item:\n  ", todoItems);
    });

    todoModel.update(45, "This is an updated todo", function(err, todoItems) {
        if(err) {
            console.log("error updating TODO items:", err);
        }

        console.log("updated a  todo item:\n  ", todoItems);
    });

    todoModel.delete(42, function(err, todoItems) {
        if(err) {
            console.log("error deleting TODO items:", err);
        }

        console.log("deleted a  todo item:\n  ", todoItems);
    });

    todoModel.tagTodoItem(45, 2, function(err, todoItems) {
        if(err) {
            console.log("error tagging TODO items:", err);
        }

        console.log("tagged a  todo item:\n  ", todoItems);
    });

    todoModel.untagTodoItem(45, 3, function(err, todoItems) {
        if(err) {
            console.log("error updating TODO items:", err);
        }

        console.log("updated a  todo item:\n  ", todoItems);
    });

    todoModel.markCompleted(45, function(err, todoItems) {
        if(err) {
            console.log("error changing status TODO items:", err);
        }

        console.log("updated a status in  todo item:\n  ", todoItems);
    });



});