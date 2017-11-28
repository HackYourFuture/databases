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

    create(description, user_id , callback) {
        // Write code and query to create a new TODO item
		const query = "INSERT INTO todo_items(text , user_id) VALUES(? ,?)";
        this.dbConnection.query(query, [description,user_id] , function(err, results, fields) {
            if(err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
    }

    update(id, description, callback) {
        // Write code and query to update and existing TODO item
		const query = "UPDATE todo_items SET text = ? WHERE id = ?";
        this.dbConnection.query(query, [description,id] , function(err, results, fields) {
            if(err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
    }

    delete(id, callback) {
        // Write code and query to delete an existing TODO item
		const query = "DELETE FROM todo_items WHERE id = ?";
        this.dbConnection.query(query, [id] , function(err, results, fields) {
            if(err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
    }

    tagTodoItem(todoItemId, tagId, callback) {
        // Write code and query add a tag to a TODO item
		const query = "INSERT INTO todo_item_tag(todo_item_id , tag_id) VALUES(? ,?)";
        this.dbConnection.query(query, [todoItemId,tagId] , function(err, results, fields) {
            if(err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
    }
        
    untagTodoItem(todoItemId, tagId, callback) {
        // Write code and query remove a tag to a TODO item
		const query = "DELETE FROM todo_item_tag WHERE todo_item_id = ? AND  tag_id = ?";
        this.dbConnection.query(query, [todoItemId,tagId] , function(err, results, fields) {
            if(err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
    }
	
	markCompleted(todoItemId, callback) {
        // Write code to mark a TODO item as completed
		const query = "UPDATE todo_items SET is_completed = 1 WHERE id = ?";
        this.dbConnection.query(query, [todoItemId] , function(err, results, fields) {
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
    user     : 'todo_user',
    password : '123',
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
	
	todoModel.create("homework '2' for database" , 1 , function(err, result) {
        if(err) {
            console.log("error creating TODO items:", err);
        }
		console.log("a new TODO item has been created successfully!" , "\n operation details : \n" , result);
    });
	
	todoModel.update(50 ,"changes for homework '2'" , function(err, result) {
        if(err) {
            console.log("error updating TODO items:", err);
        }
		console.log("a TODO item has been updated successfully!" , "\n operation details : \n" , result);
    });
	
	todoModel.delete(50 , function(err, result) {
        if(err) {
            console.log("error deleting TODO items:", err);
        }
		console.log("a TODO item has been deleted successfully!" , "\n operation details : \n" , result);
    });
	
	todoModel.tagTodoItem(51 , 1 , function(err, result) {
        if(err) {
            console.log("error taging TODO items:", err);
        }
		console.log("a new tag has been added successfully!" , "\n operation details : \n" , result);
    });
	
	todoModel.untagTodoItem(51 , 1 , function(err, result) {
        if(err) {
            console.log("error untaging TODO items:", err);
        }
		console.log("the tag has been removed successfully!" , "\n operation details : \n" , result);
    });
	
	todoModel.markCompleted(51, function(err, result) {
        if(err) {
            console.log("error completing TODO items:", err);
        }
		console.log("the TODO item has been marked as completed successfully!" , "\n operation details : \n" , result);
    });
	
});
