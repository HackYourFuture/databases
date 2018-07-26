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
        const addTodoSqlQue = `INSERT INTO todo_items (text, is_completed, user_id) 
    VALUES (${dbConnection.escape(description)}, 0, ${dbConnection.escape(argument2)} )`;
        this.dbConnection.query(addTodoSqlQue, function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
    }


    update(id, description, callback) {
        // Write code and query to update and existing TODO item
        const updateSqlQue = `UPDATE todo_items SET text = ${this.dbConnection.escape(description)} 
        WHERE id = ${this.dbConnection.escape(id)}`;
        this.dbConnection.query(updateSqlQue, function (err, results, field) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
    }

    delete(id, callback) {
        // Write code and query to delete an existing TODO item
        const deleteSqlQue = `DELETE FROM todo_items WHERE id = ${dbConnection.escape(id)}`
        this.dbConnection.query(deleteSqlQue, function (err, results, fields) {

            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
    }

    tagTodoItem(todoItemId, tagId, callback) {
        // Write code and query add a tag to a TODO item
        const tagSqlQue = `INSERT INTO todo_item_tag (todo_item_id,tag_id) 
        VALUES(${dbConnection.escape(todoItemId)},${dbConnection.escape(tagId)})`
        this.dbConnection.query(tagSqlQue, function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
    }

    untagTodoItem(todoItemId, tagId, callback) {
        // Write code and query remove a tag from a TODO item
        const unTagSqlQue = `DELETE FROM todo_item_tag 
    WHERE todo_item_id = ${dbConnection.escape(todoItemId)} 
    AND tag_id = ${dbConnection.escape(tagId)}`;
        this.dbConnection.query(unTagSqlQue, function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
    }

    markCompleted(todoItemId, callback) {
        // Write code to mark a TODO item as completed
        const markComSqlQue = `UPDATE todo_items SET is_completed = true
        WHERE id = ${this.dbConnection.escape(todoItemId)}`;
        this.dbConnection.query(markComSqlQue, function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
    }
}

const command = process.argv[2];
const argument1 = process.argv[3];
const argument2 = process.argv[4];

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'allouh',
    password: '1980',
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
        case 'load': {
            todoModel.load(function (err, todoItems) {
                if (err) {
                    console.log("error loading TODO items:", err);
                }

                console.log("existing todo items:", todoItems);
            });
            break;
        }
        case 'create': {
            todoModel.create(argument1, function (err, todoItems) {
                if (err) {
                    console.log("error loading TODO items:", err);
                }

                console.log("existing todo items:", todoItems);
            });
            break;
        }
        case 'update': {
            todoModel.update(argument1, argument2, function (err, todoItems) {

                if (isNaN(argument1) || typeof argument2 === 'undefined') {
                    console.info(`You have entered wrong input. Use help command for
                     more information on update`);
                }
                if (err) {
                    console.log("error loading TODO items:", err);
                }


                console.log("existing todo items:", todoItems);
            });
            break;
        }
        case 'delete': {
            todoModel.delete(argument1, function (err, todoItems) {
                if (isNaN(argument1)) {
                    console.info(`You have entered wrong input. Use help command for
                     more information on update`)
                }
                if (err) {
                    console.log("error loading TODO items:", err);
                }


                console.log("existing todo items:", todoItems);
            });
            break;
        }
        case 'tag': {
            todoModel.tagTodoItem(argument1, argument2, function (err, todoItems) {
                if (isNaN(argument1) || isNaN(argument2)) {
                    console.info(`You have entered wrong input. Use help command for
                     more information on tagging id`)
                }
                if (err) {
                    console.log("error loading TODO items:", err);
                }


                console.log("existing todo items:", todoItems);
            });
            break;
        }
        case 'untag': {
            todoModel.untagTodoItem(argument1, argument2, function (err, todoItems) {
                if (isNaN(argument1) || isNaN(argument2)) {
                    console.info(`You have entered wrong input. Use help command for
                     more information on removing tag for id`)
                }
                if (err) {

                    console.log("error loading TODO items:", err);
                }


                console.log("existing todo items:", todoItems);
            });
            break;
        }
        case 'complete': {
            todoModel.markCompleted(argument1, function (err, todoItems) {
                if (typeof argument1 === 'undefined' || isNaN(argument1)) {
                    console.info(`No or wrong input detected. Use help command for
                     more information about marking todo as complete`)
                }
                if (err) {

                    console.log("error loading TODO items:", err);
                }


                console.log("existing todo items:", todoItems);
            });
            break;
        }
        case 'help':
        default:
            {
                console.info(
                    ` 
                  (command)                          (function)  

                  load                           to get all existed tasks 
                  create 'text' user_id          to add a new task to the list 
                  update todo_id 'New text'      to update a task that already exist 
                  delete todo_id                 to delete a task that already exist 
                  complete  todo_id              to mark task as completed ;
                  tag todo_id tag_id             add tag to the todo 
                  untag todo_id  tag_id          id  to delete a tag that already exist `
                )
            }

            break;
    }

    dbConnection.end();
});

