
const mysql = require('mysql');
const config = require('./config.json');

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
        const createNewTodo = "INSERT INTO todo_items SET ?";
        this.dbConnection.query(createNewTodo, description, function(err, result, fields){
            if(err){
                callback(err);
            }else{
                callback(null, result);
            }
        });
    }

    update(id, description, callback) {
        const updateTodo = "UPDATE todo_items SET ? WHERE id = ?";
        this.dbConnection.query(updateTodo, [description, id], function(err, result, fields){
            if(err){
                callback(err);
            }else{
                callback(null, result);
            }
        });
    }

    delete(id, callback) {
        const deleteTodo = "DELETE FROM todo_items WHERE id = ?";
        this.dbConnection.query(deleteTodo, [id], function(err, result, fields){
            if(err){
                callback(err);
            }else{
                callback(null, result);
            }
        });
    }

    tagTodoItem(todoItemId, tagId, callback) {
        const insertTodoTag = "INSERT INTO todo_item_tag SET ?";
        this.dbConnection.query(insertTodoTag, {todo_item_id:todoItemId, tag_id:tagId}, function(err, result, fields){
            if(err){
                callback(err);
            }else{
                callback(null, result);
            }
        });
    }
        
    untagTodoItem(todoItemId, tagId, callback) {
        const untagTodoItemQuery = "DELETE FROM todo_item_tag WHERE todo_item_id = ? AND tag_id = ?";
        this.dbConnection.query(untagTodoItemQuery, [todoItemId, tagId], function(err, result, fields){
            if(err){
                callback(err);
            }else{
                callback(null, result);
            }
        });
    }

    markCompleted(todoItemId, callback) {
        const updateCompleted = "UPDATE todo_items SET ? WHERE id = ?";
        this.dbConnection.query(updateCompleted, [{is_completed: true}, todoItemId], function(err, result, fields){
            if(err){
                callback(err);
            }else{
                callback(null, result);
            }
        });
    }
}

const dbConnection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
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

    const description = {text:"create again", is_completed:0, user_id:1};
    todoModel.markCompleted(47, function(err, todoItems) {
        if(err) {
            console.log("error loading TODO items:", err);
        }

        console.log("existing todo items:", todoItems);
    });
    dbConnection.end();
});