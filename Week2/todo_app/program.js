'use strict';

class TodoModel {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }
   
    setDbConnection(dbConnection){
        this.dbConnection = dbConnection;
    }

    load(id, callback) {
        const selectTodoItems = "SELECT * FROM todo_items " + (id ? "WHERE id = ?" : "");
        this.dbConnection.query(selectTodoItems, id, function(err, results, fields) {
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

    deleteAll(callback){
        const deleteTodo = "DELETE FROM todo_items";
        this.dbConnection.query(deleteTodo, function(err, result, fields){
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

module.exports = TodoModel;