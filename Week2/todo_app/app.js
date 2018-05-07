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

    create(userId, description, callback) {
        // Write code and query to create a new TODO item
        const createTodoItem = `insert into todo_items (text,user_id) values(` + mysql.escape(description) + `,` + mysql.escape(userId) + `);`;
        this.dbConnection.query(createTodoItem, (err, rows) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, rows);
        });
    }

    update(id, description, callback) {
        // Write code and query to update and existing TODO item
        const updateTodoItem = `UPDATE todo_items SET text =` + mysql.escape(description) + ` Where ID =` + mysql.escape(id) + `;`;
        this.dbConnection.query(updateTodoItem, (err, rows) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, rows);
        });

    }

    delete(id, callback) {
        // Write code and query to delete an existing TODO item
        const deleteTodoItem = `delete from todo_items where id=` + mysql.escape(id) + `;`;
        this.dbConnection.query(deleteTodoItem, (err, rows) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, rows);
        });

    }

    tagTodoItem(todoItemId, tagId, callback) {
        // Write code and query add a tag to a TODO item
        const addTag = `insert into todo_item_tag values(` + mysql.escape(todoItemId) + `,` + mysql.escape(tagId) + `);`;
        this.dbConnection.query(addTag, (err, rows) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, rows);
        });
    }

    untagTodoItem(todoItemId, tagId, callback) {
        // Write code and query remove a tag from a TODO item
        const unTag = `delete from todo_item_tag where todo_item_id=` + mysql.escape(todoItemId) + ` and tag_id=` + mysql.escape(tagId) + `;`;
        this.dbConnection.query(unTag, (err, rows) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, rows);
        });
    }

    markCompleted(todoItemId, callback) {
        // Write code to mark a TODO item as completed
        const markCompleted = `UPDATE todo_items SET is_completed=1 Where ID = ` + mysql.escape(todoItemId) + `;`;
        this.dbConnection.query(markCompleted, (err, rows) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, rows);
        });

    }

    markUnCompleted(todoItemId, callback) {
        // Write code to mark a TODO item as uncompleted
        const markUnCompleted = `UPDATE todo_items SET is_completed=0 Where ID = ` + mysql.escape(todoItemId) + `;`;
        this.dbConnection.query(markUnCompleted, (err, rows) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, rows);
        });

    }
}

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'nativeuser',
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

    //Load all TODOs
    todoModel.load(function (err, todoItems) {
        if (err) {
            console.log("error loading TODO items:", err);
        }
        console.log("existing todo items:", todoItems);
    });

    // //create new TODO
    todoModel.create(1, "ESCAPE NEW", function (err, todoItems) {
        if (err) {
            console.log("error loading TODO items:", err);
        }
        console.log("existing todo items:", todoItems);
    });

    // //update Todo by ID
    todoModel.update(52, "Gaorieh NEW Todo ITEM", function (err, todoItems) {
        if (err) {
            console.log("error loading TODO items:", err);
        }
        console.log("existing todo items:", todoItems);
    });

    // //delete existing Todo by ID
    todoModel.delete(42, function (err, todoItems) {
        if (err) {
            console.log("error loading TODO items:", err);
        }
        console.log("existing todo items:", todoItems);
    });

    // //tag Todo Item
    todoModel.tagTodoItem(52, 1, function (err, todoItems) {
        if (err) {
            console.log("error loading TODO items:", err);
        }
        console.log("existing todo items:", todoItems);
    });

    // //unTag Todo Item
    todoModel.untagTodoItem(52, 1, function (err, todoItems) {
        if (err) {
            console.log("error loading TODO items:", err);
        }
        console.log("existing todo items:", todoItems);
    });

    // //mark TODO as completed
    todoModel.markCompleted(52, function (err, todoItems) {
        if (err) {
            console.log("error loading TODO items:", err);
        }
        console.log("existing todo items:", todoItems);
    });

    // //mark TODO as Uncompleted
    todoModel.markUnCompleted(52, function (err, todoItems) {
        if (err) {
            console.log("error loading TODO items:", err);
        }
        console.log("existing todo items:", todoItems);
    });

});