const mysql = require('mysql'),
    express = require('express'),
    app = express(),
    TodoModel = function (dbConnection) {
        this.dbConnection = dbConnection;
    };

TodoModel.prototype.load = function (callback) {
    this.dbConnection.query("select * FROM tasks", function (err, results, fields) {
        err ? callback(err) : callback(null, results)
    })
};

TodoModel.prototype.create = function (description, callback) {
    this.dbConnection.query("INSERT INTO tasks (text,user_id) VALUES (?,?)", [description, id], function (err, results) {
        err ? callback(err) : callback(null, results)
    })
};

TodoModel.prototype.update = function (id, description, callback) {
    this.dbConnection.query("UPDATE tasks SET text = ? WHERE id = ?", [description, id], function (err, results) {
        err ? callback(err) : callback(null, results)
    })
};

TodoModel.prototype["delete"] = function (id, callback) {
    this.dbConnection.query("DELETE FROM tasks WHERE id = ?", [id], function (err, results) {
        err ? callback(err) : callback(null, results)
    })
};

TodoModel.prototype.tagTodoItem = function (taskId, tagId, callback) {
    this.dbConnection.query("INSERT INTO task_tag VALUES (?, ?)", [taskId, tagId], function (err, results) {
        err ? callback(err) : callback(null, results)
    })
};

TodoModel.prototype.untagTodoItem = function (taskId, tagId, callback) {
    this.dbConnection.query("DELETE FROM task_tag WHERE task_id = ? AND tag_id = ?", [taskId, tagId], function (err, results) {
        err ? callback(err) : callback(null, results)
    })
};

TodoModel.prototype.markCompleted = function (taskId, callback) {
    this.dbConnection.query("UPDATE tasks SET is_completed = 1 WHERE id = ?", [taskId], function (err, results) {
        err ? callback(err) : callback(results)
    })
};

const dbConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "todo_app"
});

dbConnection.connect(function (err) {
    if (err != null) console.error("error connecting: " + err.stack);
    else {
        console.log("connected as id " + dbConnection.threadId);
        const todoModel = new TodoModel(dbConnection);

        app.get("/load", function (request, response) {
            todoModel.load(function (err, tasks) {
                err && response.json({
                    "error loading Tasks:": err
                });
                response.json({
                    "this is the list of tasks": tasks
                })
            })
        });

        app.post("/description", function (request, response) {
            todoModel.create(request.params.description, function (err, tasks) {
                err && response.json({
                    "error creating task:": err
                });
                response.json({
                    "creating task is done!:": tasks
                })
            })
        });

        app.put("/update:id/:description", function (request, response) {
            todoModel.update(request.params.id, request.params.description, function (err, update) {
                err && response.json({
                    "cannot update the task:": err
                });
                response.json({
                    "update the task is done!:": update
                })
            })
        });

        app.put("/tag:id/:tagId", function (request, response) {
            todoModel.tagTodoItem(request.params.id, request.params.id, function (err, tasks) {
                err && response.json({
                    "error tagging tasks:": err
                });
                response.json({
                    "tagging tasks is done!:": tasks
                })
            })
        });


        app.delete("/untag:id/:tagId", function (request, response) {
            todoModel.untagTodoItem(request.params.id, request.params.tagId, function (err, tasks) {
                err && response.json({
                    "error untagging tasks:": err
                });
                response.json({
                    "untagging tasks is done!:": tasks
                })
            })
        });

        app.put("/completed:id", function (request, response) {
            todoModel.markCompleted(request.params.id, function (err, tasks) {
                err && response.json({
                    "error marking tasks :": err
                });
                response.json({
                    "marking tasks is done!:": tasks
                })
            })
        });

        app.delete("/:id", function (request, response) {
            todoModel.delete(request.params.id, function (err, tasks) {
                err && response.json({
                    "error deleting task:": err
                });
                response.json({
                    "deleting tasks is done!:": tasks
                })
            })
        })
    }
});

app.listen(3030, function (err) {
    err && console.log(err);
    console.log("server is listening on port 3030")
});
