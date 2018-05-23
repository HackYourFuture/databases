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

    create(description, userId, callback) {
        // Write code and query to create a new TODO item
        const createNewTodo = `INSERT INTO todo_items (text,user_id) 
             VALUES (${dbConnection.escape(description)},${dbConnection.escape(userId)})`;
        this.dbConnection.query(createNewTodo, function (err, results) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
    }

    update(id, description, callback) {
        // Write code and query to update and existing TODO item
        const updateTodoItem = `UPDATE todo_items 
        SET text= ${dbConnection.escape(description)}
        WHERE id = ${dbConnection.escape(id)}`;
        this.dbConnection.query(updateTodoItem, function (err, results) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
    }

    delete(id, callback) {
        // Write code and query to delete an existing TODO item
        const deleteTodoItem = `DELETE FROM todo_items 
            WHERE id = ${dbConnection.escape(id)}`;
        this.dbConnection.query(deleteTodoItem, function (err, results) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
    }

    tagTodoItem(todoItemId, tagId, callback) {
        // Write code and query add a tag to a TODO item
        const tagTodoItem = `INSERT INTO todo_item_tag(todo_item_id, tag_id)
        VALUES (${dbConnection.escape(todoItemId)},${dbConnection.escape(tagId)})`;
        this.dbConnection.query(tagTodoItem, function (err, results) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
    }

    untagTodoItem(todoItemId, tagId, callback) {
        // Write code and query remove a tag from a TODO item
        const untagFromTODOItem = `DELETE FROM todo_item_tag 
        WHERE todo_item_id=${dbConnection.escape(todoItemId)}
        AND tag_id=${dbConnection.escape(tagId)}`;
        this.dbConnection.query(untagFromTODOItem, function (err, results) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
    }


    markCompleted(todoItemId, callback) {
        // Write code to mark a TODO item as completed
        const markTodoItem = `UPDATE todo_items 
        SET is_completed = true
         where id= ${dbConnection.escape(todoItemId)}`;
        this.dbConnection.query(markTodoItem, function (err, results) {
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
    user: 'hadil11',
    password: '12341234',
    database: 'todo_app'
});

const cmd = process.argv[2];

dbConnection.connect(function (err) {
    if (err != null) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + dbConnection.threadId);

    const todoModel = new TodoModel(dbConnection);
    if (cmd == 'load') {
        todoModel.load(function (err, todoItems) {
            if (err) {
                console.log("error loading TODO items:", err);
            }

            console.log("existing todo items:", todoItems);
        });
    }

    else if (cmd == 'create') {
        todoModel.create('drinking coffee', 5, function (err, todoItems) {
            if (err) {
                console.log('error creating Todo item:', err)
            }
            console.log('Todo item is created ');
        });
    }

    else if (cmd == 'update') {
        todoModel.update(50, 'Shopping', function (err) {
            if (err) {
                console.log('error updating Todo items:', err)
            }
            console.log('Todo item is updated ');
        });
    }

    else if (cmd == 'delete') {
        todoModel.delete(49, function (err) {
            if (err) {
                console.log('error deleting Todo items:', err)
            }
            console.log('Todo item is deleted');

        });
    }

    else if (cmd == 'tag') {
        todoModel.tagTodoItem(51, 2, function (err) {
            if (err) {
                console.log('error tagging Todo items:', err)
            }
            console.log('Todo item is tagged');
        });
    }

    else if (cmd == 'untag') {
        todoModel.untagTodoItem(51, 2, function (err) {
            if (err) {
                console.log('error untagging Todo items:', err)
            }
            console.log('Todo item is untagged ');
        });
    }

    else if (cmd == 'mark') {
        todoModel.markCompleted(46, function (err) {
            if (err) {
                console.log('error marking Todo items:', err)
            }
            console.log('Todo item is marked');
        });
    }
    dbConnection.end();
});
