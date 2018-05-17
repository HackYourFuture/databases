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
        const sqlInsert = {
            text: description,
            is_completed: 0,
            user_id: 1
        };
        this.dbConnection.query('INSERT INTO todo_items SET ?', sqlInsert, (err, result) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, result);
        });
    }

    update(id, description, callback) {
        const sqlUpdate = [description, id];
        const sql = 'UPDATE todo_items SET text=? where id=?';

        this.dbConnection.query(sql, sqlUpdate, (err, result) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, result);
        })
    }

    delete(id, callback) {
        const sql = `DELETE FROM todo_items where id = ${id}`;
        this.dbConnection.query(sql, (err, result) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, result);
        });
    }

    tagTodoItem(todoItemId, tagId, callback) {
        const sql = `INSERT INTO todo_item_tag VALUES(${todoItemId}, ${tagId})`
        this.dbConnection.query(sql, (err, result) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, result);
        });
    }

    untagTodoItem(todoItemId, tagId, callback) {
        const sql = `DELETE FROM todo_item_tag where tag_id = ${tagId}`
        this.dbConnection.query(sql, (err, result) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, result);
        });
    }

    markCompleted(todoItemId, callback) {
        const sql = `UPDATE todo_items SET is_completed = 1 where id= ${todoItemId}`;

        this.dbConnection.query(sql, (err, result) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, result);
        })

    }
}

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'edris',
    password: 'newuser',
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

    //create a todo example
    // todoModel.create("Doing shopping", (err, result) => {
    //     if (err) {
    //         console.error(err.stack);
    //         return;
    //     }
    //     console.log("Todo is successfully created");
    // });

    //Update a todo example
    // todoModel.update(49, "training", (err, result) => {
    //     if (err) {
    //         console.error("Couldn't update the todo " + err.stack);
    //         return;
    //     }
    //     console.log("Todo successfully updated");
    // })

    //Delete a todo example
    // todoModel.delete(49, (err, result) => {
    //     if (err) {
    //         console.error("Couldn't delete the todo " + err.stack);
    //         return;
    //     }
    //     console.log("Todo is successfully deleted");
    // })

    //Tag a todo example
    // todoModel.tagTodoItem(30, 25, (err, result) => {
    //     if (err) {
    //         console.error("Couldn't tag the todo" + err.stack);
    //         return;
    //     }
    //     console.log("The todo is tagged" + result);
    // })

    //Tag a todo example
    // todoModel.untagTodoItem(30, 25, (err, result) => {
    //     if (err) {
    //         console.error("Couldn't untag the todo" + err.stack);
    //         return;
    //     }
    //     console.log("The todo is untagged" + result);
    // })

    //Mark a todo example
    // todoModel.markCompleted(42, (err, result) => {
    //     if (err) {
    //         console.error("Couldn't mark the todo as completed" + err.stack);
    //         return;
    //     }

    //     console.log("The todo is marked as completed");
    // })

});