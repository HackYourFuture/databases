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

    create(description,userId, callback) {
        let createQuery = "INSERT INTO todo_items (text,user_id) VALUES (?, ?)"
        this.dbConnection.query(createQuery, [description,userId], function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            };
            callback(null, results)
        })
    }

    update(id, description, callback) {
        let updateQuery = "UPDATE todo_items SET text = ? WHERE id =  ?";
        this.dbConnection.query(updateQuery, [description, id], function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        })
    }

    delete(id, callback) {
        let deleteQuery = "DELETE FROM todo_items WHERE id = ?";
        this.dbConnection.query(deleteQuery,id ,function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results)
        })
    }

    tagTodoItem(todoItemId, tagId, callback) {
        let addingTagQuery = "INSERT INTO todo_item_tag(todo_item_id,tag_id) VALUES (?,?)";
        this.dbConnection.query(addingTagQuery,[todoItemId,tagId], function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results)
        })
    }

    untagTodoItem(todoItemId, tagId, callback) {
        let untagQuery = "DELETE FROM todo_item_tag WHERE todo_item_id = ? AND tag_id = ?";
        this.dbConnection.query(untagQuery,[todoItemId,tagId], function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        })
    }

    markCompleted(todoItemId, callback) {
        let markAsDoneQuery = "UPDATE todo_items SET is_completed = true WHERE id = ?"
        this.dbConnection.query(markAsDoneQuery, todoItemId, function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        })
    }
}

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'talal',
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

        console.log("existing todo items:", todoItems);
    });
    
    // testing for the class methods 


    /*todoModel.create('hello world',2, function (err) {
        if (err) {
            console.log("error occurred while creating a todo item",err)
        } 
        console.log("A todo item has been created")
    })
    todoModel.update(45, "test updating todo", function (err) {
        if (err) {
            console.log("an error occurred while updating the todo item", err)
        } 
        console.log("todo item has been updated")
    })  
    todoModel.delete(45, function (err) {
        if (err) {
            console.log("an error occurred while deleting the todo item", err);
        } 
        console.log("a todo item has been deleted")
    })
    todoModel.tagTodoItem(42, 2, function (err) {
        if (err) {
            console.log("an error occurred while adding a tag to a todo item", err);
        } 
         console.log("done adding a tag to todo item")
    })
    todoModel.untagTodoItem(42, 2, function (err) {
        if (err) {
            console.log("an error occurred while untagging a todo item ", err);
        } 
        console.log("A todo item has been untagged");
    })
    todoModel.markCompleted(42, function (err) {
        if (err) {
            console.log("an error occurred while marking the item as completed", err);
        }
        console.log("an todo item has been marked as completed")
    })*/


    //dbConnection.end();
});
