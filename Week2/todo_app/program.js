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
        const selectTodoItems = "SELECT * FROM todo_items;";
        this.dbConnection.query(selectTodoItems, function(err, results, fields) {
            if(err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
    }

    create(description,id, callback) {
        // Write code and query to create a new TODO item
        const newTodoItem = 'INSERT INTO todo_items (text,user_id) VALUES (?,?)';
        this.dbConnection.query(newTodoItem,[description,id],function(err,results){
            if(err){
                callback(err);
                return;
            }
            callback(null,results);
        });
    }

    update(id, description, callback) {
        // Write code and query to update and existing TODO item
        const updatedTodoItem = 'UPDATE todo_items SET text = ? WHERE id = ?';
        this.dbConnection.query(updatedTodoItem,[description,id],function(err,results){
            if(err){
                callback(err);
                return;
            }
            callback(null,results);
        });
    }

    delete(id, callback) {
        // Write code and query to delete an existing TODO item
        const deletedTodoItem = "DELETE FROM todo_items WHERE id = ?";
        this.dbConnection.query(deletedTodoItem,[id],function(err,results){
            if (err){
                callback(err);
                return;
            }
            callback(null,results);
        });
    }

    tagTodoItem(todoItemId, tagId, callback) {
        // Write code and query add a tag to a TODO item
        const taggedTodoItem = "INSERT INTO todo_item_tag VALUES (?, ?)";
        this.dbConnection.query(taggedTodoItem,[todoItemId,tagId], function(err,results){
            if(err){
                callback(err);
                return;
            }
            callback(null,results);
        });
    }
        
    untagTodoItem(todoItemId, tagId, callback) {
        // Write code and query remove a tag from a TODO item
        const unTaggedTodoItem = "DELETE FROM todo_item_tag WHERE todo_item_id = ? AND tag_id = ?";
        this.dbConnection.query(unTaggedTodoItem,[todoItemId,tagId], function(err,results){
            if(err){
                callback(err);
                return;
            }
            callback(null,results);
        });
    }

    markCompleted(todoItemId, callback) {
        // Write code to mark a TODO item as completed
        const markedTodoItem = "UPDATE todo_items SET is_completed = 1 WHERE id = ?";
        this.dbConnection.query(markedTodoItem,[todoItemId],function(err,results){
            if(err){
                callback(err);
                return;
            }
            callback(results);
        });
    }
}

const dbConnection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'todo_app'
});

dbConnection.connect(function(err) {
    if (err != null) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + dbConnection.threadId);

    const todoModel = new TodoModel(dbConnection);
    
        // Load
    todoModel.load(function(err, todoItems) {
        if(err) {
            console.log("error loading TODO items:", err);
        }

        console.log("existing todo items:", todoItems);
    });

        // Create
    todoModel.create("Teach class 14",1,function(err,todoItems){
        if (err){
            console.log("error loading TODO items:", err);
        }
        console.log("existing todo items:", todoItems);
    });

        // Update
    todoModel.update(46,'Teach class 15',function(err,todoItems){
        if (err){
            console.log("error loading TODO items:", err);
        }
        console.log("existing todo items:", todoItems);
    });

        // Tag Todo Item
    todoModel.tagTodoItem(46,1,function(err,todoItems){
        if (err){
            console.log("error loading TODO items:", err);
        }
        console.log("existing todo items:", todoItems);
    });

        // Untag Todo Item
    todoModel.untagTodoItem(46,1,function(err,todoItems){
        if (err){
            console.log("error loading TODO items:", err);
        }
        console.log("existing todo items:", todoItems);
    });

        // Mark Completed
    todoModel.markCompleted(46,function(err,todoItems){
        if (err){
            console.log("error loading TODO items:", err);
        }
        console.log("existing todo items:", todoItems);
    });

        // Delete
    todoModel.delete(46,function(err,todoItems){
        if (err){
            console.log("error loading TODO items:", err);
        }
        console.log("existing todo items:", todoItems);
    });
});