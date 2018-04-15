// This is the connector (also known as driver)
// that we can use to connect to a MySQL process
// and access its databases.
const mysql = require('mysql');
const config = require('./config.js');

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

    create(description, isCompleted, userId, callback) {
        // Write code and query to create a new TODO item
        const createTodoItem = `INSERT INTO todo_items (text, is_completed, user_id) VALUES (${description}, ${isCompleted}, ${userId});`
        this.dbConnection.query(createTodoItem, function(err, results, fields){
            if(err){
                callback(err);
                return;
            }
            callback(null, results);
        });
    }

    update(id, description, callback) {
        // Write code and query to update and existing TODO item
        const updateDescription = `UPDATE todo_items SET text = ${description} WHERE id = ${id};`
        this.dbConnection.query(updateDescription, function(err, results, fields){
            if(err){
                callback(err);
                return;
            }
            callback(null, results);
        });
    }

    delete(id, callback) {
        // Write code and query to delete an existing TODO item
        const deleteTodoItem = `DELETE FROM todo_items WHERE id = ${id};`
        this.dbConnection.query(deleteTodoItem, function(err, results, fields){
            if(err){
                callback(err);
                return;
            }
            callback(null, results);
        });
    }

    tagTodoItem(todoItemId, tagId, callback) {
        // Write code and query add a tag to a TODO item
        const tagTodoItem = `INSERT INTO todo_item_tag (todo_item_id, tag_id) VALUES (${todoItemId}, ${tagId});`
        this.dbConnection.query(tagTodoItem, function(err, results, fields){
            if(err){
                callback(err);
                return;
            }
            callback(null, results);
        });

    }
        
    untagTodoItem(todoItemId, tagId, callback) {
        // Write code and query remove a tag from a TODO item
        const untagTodoItem = `DELETE FROM todo_item_tag WHERE todo_item_id = ${todoItemId} AND tag_id = ${tagId};`
        this.dbConnection.query(untagTodoItem, function(err, results, fields){
            if(err){
                callback(err);
                return;
            }
            callback(null, results);
        });
    }

    markCompleted(todoItemId, callback) {
        // Write code to mark a TODO item as completed
        const markTodoCompleted = `UPDATE todo_items SET is_completed = 1 WHERE id = ${todoItemId};`
        this.dbConnection.query(markTodoCompleted, function(err, results, fields){
            if(err){
                callback(err);
                return;
            }
            callback(null, results);
        });
    }
}

const dbConnection = mysql.createConnection({
    host     : 'localhost',
    user     : 'config.db.user',
    password : 'config.db.password',
    database : 'todo_app'
});

const cmd = process.argv[2];

dbConnection.connect(function(err) {
    if (err != null) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + dbConnection.threadId);

    const todoModel = new TodoModel(dbConnection);

    switch(cmd){
        case 'list':{
            todoModel.load(function(err, todoItems) {
                if(err) {
                    console.log("error loading TODO items:", err);
                }
        
                console.log("existing todo items:", todoItems);
            });
        }
        break;

        case 'add':{
            todoModel.create(process.argv[3], process.argv[4], process.argv[5], function(err, todoItem){
                if(err){
                    console.log("error adding the new TODO item:", err);
                }
                console.log(`The following TODO added: ${todoItem}`);
            });
        }
        break;

        case 'update':{
            todoModel.update(process.argv[3], process.argv[4], function(err, updateDescription){
                if(err){
                    console.log('error updating the TODO item:', err);
                }
                console.log(`The following update completed: ${updateDescription}`);
            });
        }
        break;

        case 'delete':{
            todoModel.delete(process.argv[3], function(err, deleteTodoItem){
                if(err){
                    console.log('error deleting the TODO item:', err);
                }
                console.log(`The following item id deleted: ${deleteTodoItem}`);
            });
        }
        break;

        case 'tagTodo':{
            todoModel.tagTodoItem(process.argv[3], process.argv[4], function (err, tagTodoItem){
                if(err){
                    console.log('error tag the todo item:', err);
                }
                console.log(`The following todo item tagged: ${tagTodoItem}`);
            });
        }
        break;

        case 'untagTodo':{
            todoModel.untagTodoItem(process.argv[3], process.argv[4], function(err, untagTodoItem){
                if(err){
                    console.log('error untagging the item:', err);
                }
                console.log(`The following todo item got untagged: ${untagTodoItem}`);
            });
        }
        break;

        case 'markCompleted':{
            todoModel.markCompleted(process.argv[3], function(err, markTodoCompleted){
                if(err){
                    console.log('error to mark the todo item:', err);
                }
                console.log(`The following todo item marked completed: ${markTodoCompleted}`);
            });
        }
        break;
    }
    
dbConnection.end();

});

