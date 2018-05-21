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

    create(description, callback) {
        // Write code and query to create a new TODO item

        this.dbConnection.query('INSERT INTO todo_items (text, user_id) VALUES(?,?)', [description, 4], function (err, results, fields) {

            if (err) {
                callback(err);
                return;
            }

            callback(null, results);
        });

    }

    update(id, description, callback) {
        // Write code and query to update and existing TODO item
        this.dbConnection.query('UPDATE todo_items SET text=?  WHERE id=?', [description, id], function (err, results, fields) {

            if (err) {
                callback(err);
                return;
            }

            callback(null, results);
        });


    }

    delete(id, callback) {
        // Write code and query to delete an existing TODO item
        this.dbConnection.query('DELETE  FROM todo_items WHERE id=?', [id], function (err, results, fields) {

            if (err) {
                callback(err);
                return;
            }

            callback(null, results);
        });


    }

    tagTodoItem(todoItemId, tagId, callback) {
        // Write code and query add a tag to a TODO item
        this.dbConnection.query('INSERT INTO todo_item_tag(todo_item_id, tag_id) VALUES(?,?) ', [todoItemId, tagId], function (err, results, fields) {

            if (err) {
                callback(err);
                return;
            }

            callback(null, results);
        });

    }

    untagTodoItem(todoItemId, tagId, callback) {
        // Write code and query remove a tag from a TODO item
        this.dbConnection.query('DELETE FROM todo_item_tag WHERE todo_item_id=? and tag_id=? ', [todoItemId, tagId], function (err, results, fields) {

            if (err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
    }

    markCompleted(todoItemId, callback) {
        // Write code to mark a TODO item as complete
        this.dbConnection.query('UPDATE todo_items SET is_completed=1  WHERE id=?', [todoItemId], function (err, results, fields) {

            if (err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
    }
}

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'muratSQL',
    password: 'Muratweb@4156',
    database: 'todo_app'
});

dbConnection.connect(function (err) {
    if (err != null) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + dbConnection.threadId);

    const todoModel = new TodoModel(dbConnection);
    // todoModel.load(function (err, todoItems) {
    //     if (err) {
    //         console.log("error loading TODO items:", err);
    //     }

    //     console.log("existing todo items:", todoItems);
    // });

    todoModel.delete(46, function (err, todoItems) {
        if (err) {
            console.log("error on delete item:", err);
        }


    });

});
