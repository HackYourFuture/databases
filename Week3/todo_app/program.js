'use strict';

// TODO: app will save in mysql database todo_app
// Express handels the requests
const Express = require('express');
const mysql = require('mysql');
class TodoModel {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }

    // Loads all the TODOs in the database
    load(callback, userId) {
        if (userId) {
            const selectTodoItems = `SELECT * FROM todo_items WHERE user_id = ?`;
            this.dbConnection.query(selectTodoItems, userId, function (err, results, fields) {
                if (err) {
                    callback(err);
                    return;
                }

                callback(null, results);
            });
        } else {
            const selectTodoItems = `SELECT * FROM todo_items`;
            this.dbConnection.query(selectTodoItems, function (err, results, fields) {
                if (err) {
                    callback(err);
                    return;
                }

                callback(null, results);
            });
        }
    }

    create(description, callback, userId) {
        //Query to create a new TODO item
        const createTodoItem = `INSERT INTO todo_items (text, user_id) VALUES (?, ?)`;
        this.dbConnection.query(createTodoItem, description, userId, function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
    }

    update(id, description, callback) {
        //query to update and existing TODO item
        const updateTodoItem = `UPDATE todo_items SET text = ${description} WHERE id = ?`;
        this.dbConnection.query(updateTodoItem, id, function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
    }

    delete(id, callback) {
        //query to delete an existing TODO item
        const deleteTodoItem = `DELETE FROM todo_items WHERE id = ?`;
        this.dbConnection.query(deleteTodoItem, id, function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
    }

    tagTodoItem(todoItemId, tagId, callback) {
        //query add a tag to a TODO item
        const tagTodo = `INSERT INTO todo_item_tag (todo_item_id, tag_id) VALUES (?, ?)`;
        this.dbConnection.query(tagTodo, todoItemId, tagId, function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
    }

    untagTodoItem(id, tagId, callback) {
        // query remove a tag from a TODO item
        const untagTodo = `Delete FROM todo_item_tag WHERE todo_item_id = ? AND tag_id = ?`;
        this.dbConnection.query(untagTodo, id, tagId, function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
    }

    markCompleted(id, userId, callback) {
        // Query to mark a TODO item as completed
        const markTodoItem = `UPDATE todo_items SET is_completed = True WHERE id = ? AND user_id = ?`;
        this.dbConnection.query(markTodoItem, id, userId, function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
    }
}

//establishing a connection to mysql   

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Nivo@Mysql',
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
        const PORT = 3000;

        const app = Express();

        // request body parser
        app.use(Express.json());

        // TODO: implement readTodo, clearTodos, markAsDone and markAsNotDone routes and actions

        // readTodos
        app.get('/todos/:userId', (req, res, next) => {
            const { userId } = req.param;
            const toDoList = readToDos(userId);
            res.send(toDoList)
                .catch(err => next(err));
        });

        // createTodo
        app.post('/todos/:userId', (req, res, next) => {
            const { todo } = req.body;
            const { userId } = req.params;

            createToDo(todo, userId);
            const toDoList = readToDos(userId);
            res.send(toDoList)
                .catch(err => next(err));
        });

        // updateTodo
        app.put('/todos/:userId/:id', (req, res, next) => {
            const newToDo = req.body;
            const { userId } = req.params;
            const { id } = req.params;

            updateToDo(id, newToDo);
            const toDoList = readToDos(userId);
            res.send(toDoList)
                .catch(err => next(err));
        });

        // clearTodo
        app.delete('/todos/:userId/:id', (req, res, next) => {
            const { id } = req.params;
            const { userId } = req.params;

            deleteToDo(id);
            const toDoList = readToDos(userId);
            res.send(toDoList)
                .catch(err => next(err));
        });

        // markAsDone
        app.post('/todos/:userId/:id/done', (req, res, next) => {
            const { id } = req.params;
            const { userId } = req.params;
            const state = 'done';

            markAsCompleted(id, state);
            const toDoList = readToDos(userId);
            res.send(toDoList)
                .catch(err => next(err));
        });

        // tag todo
        app.post('/todos/:userId/:id', (req, res, next) => {
            const { userId } = req.params;
            const { id } = req.params;
            const { tag } = req.body;

            tagToDo(id, tag);
            const toDoList = readToDos(userId);
            res.send(toDoList)
                .catch(err => next(err));
        });

        // untag todo
        app.delete('/todos/:userId/:id', (req, res, next) => {
            const { userId } = req.params;
            const { id } = req.params;
            const { tag } = req.body;

            untagToDo(id, tag);
            const toDoList = readToDos(userId);
            res.send(toDoList)
                .catch(err => next(err));
        });

        // markAsNotDone
        app.delete('/todos/:id/undone', (req, res, next) => {
            const { userId } = req.params;
            const { id } = req.params;
            const state = 'undone';

            markAsCompleted(id, state);
            const toDoList = readToDos(userId);
            res.send(toDoList)
                .catch(err => next(err));
        });

        // error handling
        app.use((error, req, res, next) => {
            res.status(500).send({ error });
        });

        app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));

    });
});

dbConnection.end();