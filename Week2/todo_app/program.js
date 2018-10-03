// This is the connector (also known as driver)
// that we can use to connect to a MySQL process
// and access its databases.
const mysql = require('mysql');
const express = require('express');

const app = express();

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
        this.dbConnection.query('INSERT INTO todo_items SET ?', { text: description, user_id: 1 }, function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
    }

    update(id, description, callback) {
        // Write code and query to update and existing TODO item
        this.dbConnection.query('UPDATE todo_items SET text = ? WHERE id = ?', [description, id], function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
    }

    deleteRow(id, callback) {
        // Write code and query to delete an existing TODO item
        this.dbConnection.query('DELETE FROM todo_items WHERE id = ?', [id], function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        })
    }

    tagTodoItem(todoItemId, tagId, callback) {
        // Write code and query add a tag to a TODO item
        this.dbConnection.query('INSERT INTO todo_item_tag SET ?', { todo_item_id: todoItemId, tag_id: tagId }, function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
    }

    untagTodoItem(todoItemId, tagId, callback) {
        // Write code and query remove a tag from a TODO item
        this.dbConnection.query('DELETE FROM todo_item_tag WHERE todo_item_id = ? AND tag_id = ?', [todoItemId, tagId], function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
    }

    markCompleted(todoItemId, callback) {
        // Write code to mark a TODO item as completed
        this.dbConnection.query('UPDATE todo_items SET is_completed = ? WHERE id = ?', [1, todoItemId], function (err, results, fields) {
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
    user: 'todouser',
    password: 'password',
    database: 'todo_app',
});

dbConnection.connect(function (err) {
    if (err != null) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + dbConnection.threadId);

    const todoModel = new TodoModel(dbConnection);
    app.get('/load', (request, response) => {
        todoModel.load(function (err, todoItems) {
            if (err) {
                response.json({ "Error": err });
            }
            response.json({ "Existing todo items": todoItems });
        });
    });
    // insert the text of the item in postman url
    app.post('/:description', (request, response) => {
        const description = request.params.description;
        todoModel.create(description, (err, todoItem) => {
            if (err) {
                response.json({ "Error": err });
            }
            response.json({ "item inserted with the id": todoItem.insertId });
        });
    });
    // insert the text of the item in postman url
    app.put('/update:id/:description', (request, response) => {
        const id = request.params.id;
        const description = request.params.description;
        todoModel.update(id, description, (err, updatedItem) => {
            if (err) {
                response.json({ "Error": err });
            }
            response.json({ "rows updated ": updatedItem.affectedRows });
        });
    });
    app.delete('/:id', (request, response) => {
        const id = request.params.id;
        todoModel.deleteRow(id, (err, results) => {
            if (err) {
                response.json({ "Error": err });
            }
            response.json({ "rows deleted ": results.affectedRows });
        });
    });
    app.put('/tag:id/:tagId', (request, response) => {
        const todoItemId = request.params.id;
        const tagId = request.params.tagId;
        todoModel.tagTodoItem(todoItemId, tagId, (err, results) => {
            if (err) {
                response.json({ "Error": err });
            }
            response.json({ "inserted rows ": results.affectedRows });
        });
    });
    app.delete('/untag:id/:tagId', (request, response) => {
        const todoItemId = request.params.id;
        const tagId = request.params.tagId;
        todoModel.untagTodoItem(todoItemId, tagId, (err, results) => {
            if (err) {
                response.json({ "Error": err });
            }
            response.json({ "number of deleted rows ": results.affectedRows });
        });
    });
    app.put('/completed:id', (request, response) => {
        const todoItemId = request.params.id;
        todoModel.markCompleted(todoItemId, (err, results) => {
            if (err) {
                response.json({ "Error": err });
            }
            response.json({ "number of updated rows ": results.affectedRows });
        });
    });
});

app.listen(3050, error => {
    if (error)
        return console.error(error);

    console.log('Server started on http://localhost: 3050');
});