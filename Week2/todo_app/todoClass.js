//jshint esnext: true
//use strict

class TodoModel {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }

    // Loads all the TODOs in the database
    load(callback) {
        const selectTodoItemsQuery = "SELECT * FROM todo_items;";
        this.dbConnection.query(selectTodoItemsQuery, function(err, results, fields) {
            if(err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
    }

    create(description, callback) {
        const createTodoItemQuery = 'INSERT INTO todo_items (text, user_id) VALUES(?, ?);';
        
        this.dbConnection.query(createTodoItemQuery, [description, 1], (err, results, fields) => {
            if (err){
                callback(err);
                return;
            }
            console.log('Result', results);
            console.log('fields', fields);
            callback(null, `item '${description} created succesfully!'`);
        });
    }

    update(id, description, callback) {
       const updateItemQuery = 'UPDATE todo_items SET text = ? WHERE id = ?;';
       this.dbConnection.query(updateItemQuery, [description, id], (err, results, fields) => {
           if (err) {
               callback(err);
               return;
           }
           callback(null, `Item with id '${id}' was changed to '${description}' succesfully!`);
       });
    }

    delete(id, callback) {
        const deleteItemQuery = 'DELETE FROM todo_items WHERE id = ?;';
        this.dbConnection.query(deleteItemQuery, [id], (err, results, fields) => {
            if (err){
                callback(err);
                return;
            }
            callback(null, `Item with the id '${id}' was deleted succesfully!`);
        });
    }

    tagTodoItem(todoItemId, tagId, callback) {
        const tagTodoItemQuery = 'INSERT INTO todo_item_tag (todo_item_id, tag_id) VALUES (?, ?);';

        this.dbConnection.query(tagTodoItemQuery, [todoItemId, tagId], (err, result, fields) => {
            if (err){
                callback(err);
                return;
            }
            callback(null, `Item with the id '${todoItemId}' was tagged with the tag with Id '${tagId}' succesfully!`);
        })
    }
        
    untagTodoItem(todoItemId, tagId, callback) {
        const untagTodoItemQuery = 'DELETE FROM todo_item_tag WHERE todo_item_id = ? AND tag_id = ?;';

        this.dbConnection.query(untagTodoItemQuery, [todoItemId, tagId], (err, results, fields) => {
            if (err){
                callback(err);
                return;
            }
            callback(null, `The item with id '${todoItemId}' is not anymore tagged with tag with id '${tagId}!'`)

        });
    }

    markCompleted(todoItemId, callback) {
        // Write code to mark a TODO item as completed
        const markCompletedQuery = 'UPDATE todo_items SET is_completed = 1 WHERE id = ?;';

        this.dbConnection.query(markCompletedQuery, [todoItemId], (err, results, fields) => {
            if (err){
                callback(err);
                return;
            }

            callback(null, `Item with the Id '${todoItemId}' is marked completed`);
        });

    }

    markNotComplete(todoItemId, callback) {
        const markNotCompleteQuery = 'UPDATE todo_items SET is_completed = 0 WHERE id = ?;';

        this.dbConnection.query(markNotCompleteQuery, [todoItemId], (err, result, fields) => {
            if(err) {
                callback(err);
                return;
            }
            callback(null, `Item with Id '${todoItemId}' is now marked as Not completed!`);
        })
    }
}

module.exports = TodoModel;