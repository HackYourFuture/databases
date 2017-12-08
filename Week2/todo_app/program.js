const mysql = require('mysql');

class TodoModel {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }

    // Loads all the TODOs in the database
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

    // create new todo
    create(description, user_id, callback) {

        const createTodoItems = "INSERT INTO todo_items (text, user_id) VALUES (?, ?);";
        this.dbConnection.query(createTodoItems, [description, user_id], function(err, results, fields) {
            if(err) {
                callback(err);
                return;
            }
            
            callback(null, results);
        });
    }

    // update existing todo
    update(id, description, callback) {
        
        const updateTodoItems =  "UPDATE todo_items SET text = ? WHERE id = ?";
        this.dbConnection.query(updateTodoItems, [description, id], function(err, results, fields) {
            if(err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
    }

    // delete a todo
    delete(id, callback) {

        const deleteTodoItems =  "DELETE FROM todo_items WHERE id = ?";
        this.dbConnection.query(deleteTodoItems, [id], function(err, results, fields) {
            if(err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
        
    }

    //tagging todo
    tagTodoItem(todoItemId, tagId, callback) {

        const tagTodoItems =  "INSERT INTO todo_item_tag (todo_item_id, tag_id) VALUES (?, ?);";
        this.dbConnection.query(tagTodoItems, [todoItemId, tagId], function(err, results, fields) {
            if(err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
    }

    //untagging todo
    untagTodoItem(todoItemId, tagId, callback) {

        const untagTodoItems =  "DELETE FROM todo_item_tag WHERE todo_item_id = ? AND tag_id = ?;";
        this.dbConnection.query(untagTodoItems, [todoItemId, tagId], function(err, results, fields) {
            if(err) {
                callback(err);
                return;
            }
            callback(null, results);
        });

    }

    // marking as complete 
    // it is a true or false
    markCompleted(todoItemId, callback) {

        const completeTodoItems =  "UPDATE todo_items SET is_completed = true WHERE id = ?";
        this.dbConnection.query(completeTodoItems, [todoItemId], function(err, results, fields) {
            if(err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
    
    }
}

//connection to the server
const dbConnection = mysql.createConnection({
    host     : 'john_smith',
    user     : 'root',
    password : 'supersecret',
    database : 'todo_app'
});

//callbacks after connect
dbConnection.connect(function(err) {
    if (err != null) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + dbConnection.threadId);

    const todoModel = new TodoModel(dbConnection);
    // todoModel.load(function(err, todoItems) {
    //     if(err) {
    //         console.log("error loading TODO items:", err);
    //     }

    //     console.log("existing todo items:", todoItems);
    // });

    // todoModel.create("fix bicycle" , 1 , function(err, result) {
    //     if(err) {
    //         console.log("error creating TODO items:", err);
    //     }

	// 	console.log("you added new todo item: \n" , result);
    // });

    // todoModel.update(46, "buy christmas tree", function(err, results) {
    //     if(err) {
    //         console.log("error updating TODO items:", err);
    //     }

    //     console.log("updating todo item:", results);
    // });

    // todoModel.delete(45, function(err, results) {
    //     if(err) {
    //         console.log("error deleting TODO items:", err);
    //     }

    //     console.log("deleting todo item:", results);
    // });

    // todoModel.tagTodoItem(43, 1, function(err, results) {
    //         if(err) {
    //             console.log("error tagging TODO items:", err);
    //         }
    
    //         console.log("tagging todo item:", results);
    //     });

    // todoModel.untagTodoItem(43, 1, function(err, results) {
    //         if(err) {
    //             console.log("error untagging TODO items:", err);
    //         }
    
    //         console.log("untagging todo item:", results);
    //     });

    // todoModel.markCompleted(46, function(err, results) {
    //         if(err) {
    //             console.log("error mark Completing TODO items:", err);
    //         }
    
    //         console.log("mark Completed todo item:", results);
    //     });
});