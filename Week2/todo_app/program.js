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

        this.dbConnection.query(
            selectTodoItems,
            function (err, results, fields) {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null, results);
            });
    }

    create(description, callback) {
        const createTodoItems = "INSERT INTO todo_items SET ?";
        const newTodo = {
            id: null,
            text: `${description}`,
            is_completed: false,
            user_id: `${id}`
        }

        this.dbConnection.query(
            createTodoItems,
            newTodo,
            function (err, results, fields) {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null, results);
            });
    }

    update(description, id, callback) {
        // Write code and query to update and existing TODO item
        const updateTodoItems = "UPDATE todo_items SET text = ? WHERE id = ?";

        this.dbConnection.query(
            updateTodoItems,
            [description, id],
            function (err, results, fields) {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null, results);
            });
    }

    delete(description, id, callback) {
        // Write code and query to delete an existing TODO item
        const deleteTodoItems = "DELETE FROM todo_items WHERE text = ? AND id = ?";

        this.dbConnection.query(
            deleteTodoItems,
            [description, id],
            function (err, results, fields) {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null, results);
            });
    }

    tagTodoItem(description, id, callback) {
        // Write code and query add a tag to a TODO item
        const tagTodoItems = "UPDATE todo_item_tag SET tag_id = ? WHERE todo_id = ?";

        this.dbConnection.query(
            tagTodoItems,
            [description, id],
            function (err, results, fields) {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null, results);
            });
    }

    untagTodoItem(description, id, callback) {
        // Write code and query remove a tag from a TODO item
        const untagTodoItems = "DELETE FROM todo_item_tag WHERE todo_item_id = ? OR todo_id = ?";

        this.dbConnection.query(
            untagTodoItems,
            [description, id],
            function (err, results, fields) {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null, results);
            });
    }

    markCompleted(id, callback) {
        // Write code to mark a TODO item as completed
        const markTodoItems = "UPDATE todo_items SET is_completed = true WHERE id = ?";

        this.dbConnection.query(
            markTodoItems,
            [id],
            function (err, results, fields) {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null, results);
            });
    }
}
const command = process.argv[2];
const description = process.argv[3];
const id = process.argv[4];
const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'userjusttodo',
    password: '000000',
    database: 'todo_app'
});

dbConnection.connect(function (err) {
    if (err != null) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + dbConnection.threadId);

    const todoModel = new TodoModel(dbConnection);

    switch (command) {
        case 'load':
            todoModel.load(function (err, todoItems) {
                if (err) {
                    console.log("error loading TODO items:", err);
                }
                console.log("existing todo items:", todoItems);
            });

        case 'create':
            todoModel.create(function (description, err) {
                if (err) {
                    console.log("error loading TODO items:", err);
                }
                console.log("Succesfully created new task: " + description + " for user:" + id);
            });

        case 'update':
            todoModel.update(function (id, description, err) {
                if (err) {
                    console.log("error loading TODO items:", err);
                }
                console.log("Succesfully updated the task of id:" + id + " as " + description);
            });

        case 'delete':
            todoModel.delete(function (id, description, err) {
                if (err) {
                    console.log("error loading TODO items:", err);
                }
                console.log("Succesfully deleted the task: " + description + " from id: " + id);
            });

        case 'tag':
            todoModel.tag(function (id, description, err) {
                if (err) {
                    console.log("error loading TODO items:", err);
                }
                console.log("Succesfully created tag: " + description + " for the task of id:" + id);
            });

        case 'untug':
            todoModel.untug(function (id, description, err) {
                if (err) {
                    console.log("error loading TODO items:", err);
                }
                console.log("Succesfully deleted tag: " + description + " for the task of id:" + id);
            });

        case 'mark':
            todoModel.mark(function (id, err) {
                if (err) {
                    console.log("error loading TODO items:", err);
                }
                console.log("Succesfully marked as completed for the task of id:" + id);
            });
    }
});