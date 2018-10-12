// This is the connector (also known as driver)
// that we can use to connect to a MySQL process
// and access its databases.
const mysql = require('mysql');

let express = require('express');

let app = express();

class TodoModel {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }

    // Loads all the TODOs in the database
    load(callback) {
        const selectTodoItems = "select * FROM todo_items";
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
        const newItem = "INSERT INTO todo_items (text,user_id) VALUES (?,?)";
        this.dbConnection.query(newItem, [description, id], function (err, results) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
    }

    update(id, description, callback) {
        // Write code and query to update and existing TODO item
        const updateItem = "UPDATE todo_items SET text = ? WHERE id = ?";
        this.dbConnection.query(updateItem, [description, id], function (err, results) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        });

    }


    delete(id, callback) {
        // Write code and query to delete an existing TODO item
        const deletItem = "DELETE FROM todo_items WHERE id = ?";
        this.dbConnection.query(deletItem, [id], function (err, results) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
    }

    tagTodoItem(todoItemId, tagId, callback) {
        // Write code and query add a tag to a TODO item
        const taggedItem = "INSERT INTO todo_item_tag VALUES (?, ?)";
        this.dbConnection.query(taggedItem, [todoItemId, tagId], function (err, results) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        });

    }

    untagTodoItem(todoItemId, tagId, callback) {
        // Write code and query remove a tag from a TODO item
        const unTaggedItem = "DELETE FROM todo_item_tag WHERE todo_item_id = ? AND tag_id = ?";
        this.dbConnection.query(unTaggedItem, [todoItemId, tagId], function (err, results) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
    }

    markCompleted(todoItemId, callback) {
        // Write code to mark a TODO item as completed
        const markItem = "UPDATE todo_items SET is_completed = 1 WHERE id = ?";
        this.dbConnection.query(markItem, [todoItemId], function (err, results) {
            if (err) {
                callback(err);
                return;
            }
            callback(results);
        });
    }
}


const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
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
    app.get('/load', (req, res) => {
        todoModel.load(function (err, todoItems) {
            if (err) {
                res.json({ "error loading TODO items:": err });
            }
            res.json({ "this is TODO items": todoItems });

        });
    });

    app.post('/description', (req, res) => {
        const description = req.params.description;
        todoModel.create(description, function (err, todoItems) {
            if (err) {
                res.json({ "error creating TODO items:": err });
            }

            res.json({ "creating todo items is OK:": todoItems });
        });
    });
    app.put('/update:id/:description', (req, res) => {
        const id = req.params.id;
        const description = req.params.description;
        todoModel.update(id, description, function (err, update) {

            if (err) {
                res.json({ "error updating TODO items:": err });
            }

            res.json({ "updating todo items is OK:": update });
        });
    });
    app.put('/tag:id/:tagId', (req, res) => {
        const itemId = req.params.id;
        const tagId = req.params.id;
        todoModel.tagTodoItem(itemId, tagId, function (err, todoItems) {
            if (err) {
                res.json({ "error tagging TODO items:": err });
            }
            res.json({ "tagging todo items is OK:": todoItems });
        });
    });
    app.delete('/untag:id/:tagId', (req, res) => {
        const itemId = req.params.id;
        const tagId = request.params.tagId;
        todoModel.untagTodoItem(itemId, tagId, function (err, todoItems) {
            if (err) {
                res.json({ "error untagging TODO items:": err });
            }
            res.json({ "untagging todo items is OK:": todoItems });
        });
    });
    app.put('/comleted:id', (req, res) => {
        const itemId = req.params.id;
        todoModel.markCompleted(itemId, function (err, todoItems) {
            if (err) {
                res.json({ "error marking TODO items:": err });
            }
            res.json({ "marking todo items is OK:": todoItems });
        });
    });
    app.delete('/:id', (req, res) => {
        const itemId = req.params.id;
        todoModel.delete(itemId, function (err, todoItems) {
            if (err) {
                res.json({ "error deleting TODO items:": err });
            }
            res.json({ "deleting todo items is OK:": todoItems });
        });
    });
});
app.listen(3030, err => {
    if (err) {
        console.error(error);
    }
    console.log('server is listening on port');

});
