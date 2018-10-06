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

    create(description, callback) {
        // Write code and query to create a new TODO item
        const insertTodoitem = 'INSERT INTO todo_items SET ?';
        this.dbConnection.query(insertTodoitem,
            { text: description, user_id: 1 }, function (err, results, fields) {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null, results);
            });
    }

    update(id, description, callback) {
        // Write code and query to update and existing TODO item
        const updateTodoitem = 'UPDATE todo_items SET text = ? WHERE id = ?';
        this.dbConnection.query(updateTodoitem,
            [description, id], function (err, results, fields) {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null, results);
            });
    }

    deleteRow(id, callback) {
        // Write code and query to delete an existing TODO item
        const deleteTodoItem = 'DELETE FROM todo_items WHERE id = ?';
        this.dbConnection.query(deleteTodoItem,
            [id], function (err, results, fields) {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null, results);
            })
    }

    tagTodoItem(todoItemId, tagId, callback) {
        // Write code and query add a tag to a TODO item
        const tagTodoItem = 'INSERT INTO todo_item_tag SET ?';
        this.dbConnection.query(tagTodoItem,
            { todo_item_id: todoItemId, tag_id: tagId }, function (err, results, fields) {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null, results);
            });
    }

    untagTodoItem(todoItemId, tagId, callback) {
        // Write code and query remove a tag from a TODO item
        const deleteTagFromTodo = 'DELETE FROM todo_item_tag WHERE todo_item_id = ? AND tag_id = ?';
        this.dbConnection.query(deleteTagFromTodo,
            [todoItemId, tagId], function (err, results, fields) {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null, results);
            });
    }

    markCompleted(todoItemId, callback) {
        // Write code to mark a TODO item as completed
        updateTodoItemStatus = 'UPDATE todo_items SET is_completed = ? WHERE id = ?'
        this.dbConnection.query(updateTodoItemStatus,
            [1, todoItemId], function (err, results, fields) {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null, results);
            });
    }
}

module.exports = TodoModel;