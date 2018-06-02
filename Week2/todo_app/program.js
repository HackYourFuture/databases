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
        const createTodoItem = `INSERT INTO todo_items(text, is_completed, user_id) 
                                VALUES (${dbConnection.escape(description)}, "0", ${dbConnection.escape(userId)})`;
        this.dbConnection.query(createTodoItem, (err, results) => {
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
    SET text = ${dbConnection.escape(description)} 
    WHERE id = ${dbConnection.escape(id)}`;
        this.dbConnection.query(updateTodoItem, function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
    }

}

delete(id, callback) {
    // Write code and query to delete an existing TODO item
    const deleteTodoItem = `DELETE FROM todo_items 
    WHERE id = ${dbConnection.escape(id)}`;
    this.dbConnection.query(deleteTodoItem, function (err, results, fields) {
        if (err) {
            callback(err);
            return;
        }
        callback(null, results);
    });

}

tagTodoItem(todoItemId, tagId, callback) {
    // Write code and query add a tag to a TODO item
    const addTagToTODOItem = `INSERT INTO todo_item_tag(todo_item_id, tag_id) 
    VALUES (${dbConnection.escape(todoItemId)}, ${dbConnection.escape(tagId)})`;
    this.dbConnection.query(addTagToTODOItem, function (err, results, fields) {
        if (err) {
            callback(err);
            return;
        }
        callback(null, results);
    });
}


untagTodoItem(todoItemId, tagId, callback) {
    // Write code and query remove a tag from a TODO item
    const removeTagFromTODOItem = `DELETE FROM todo_item_tag 
    WHERE todoItemId = ${dbConnection.escape(todoItemId)} 
    AND tagId = ${dbConnection.escape(tagId)}`;
    this.dbConnection.query(removeTagFromTODOItem, function (err, results, fields) {
        if (err) {
            callback(err);
            return;
        }
        callback(null, results);
    });

}

markCompleted(todoItemId, callback) {
    // Write code to mark a TODO item as completed
    const completeTODOItem = `UPDATE todo_items SET is_completed = TRUE 
    WHERE ${dbConnection.escape(todoItemId)} = id`;
    this.dbConnection.query(completeTODOItem, (err, results, fields) => {
        if (err) {
            callback(err);
            return;
        }
        callback(null, results);
    });

}

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'Sobhi',
    password: '77777',
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

    switch (command) {

        case 'load':
            {
                todoModel.load(function (err, todoItems) {

                    if (err) {
                        console.log("error loading TODO items:", err);
                    }
                    console.log("existing todo items:", todoItems);
                });
                break;
            }

        case 'create':
            {
                todoModel.create(param1, param2, function (err) {

                    if (err) {
                        console.log("Error: todo item has been not created:", err);
                    }
                    console.log('The new todo item has been created successfully:', param1);
                });
                break;
            }

        case 'update':
            {
                todoModel.update(param1, param2, function (err) {
                    if (err) {
                        console.log("Error: todo item has been not updated:", err);
                    }
                    console.log('The todo item has been updated successfully:', param1);
                });
                break;
            }

        case 'delete':
            {
                todoModel.delete(param1, function (err) {
                    if (err) {
                        console.log("Error: todo item has been not deleted:", err);
                    }
                    console.log('The todo item has been deleted successfully:', param1);
                });
                break;
            }

        case 'tagTodoItem':
            {
                todoModel.tagTodoItem(param1, param2, function (err) {
                    if (err) {
                        console.log("Error: tag has been not added:", err);
                    }
                    console.log('The tag has been added successfully:', param1);
                });
                break;
            }
        case 'untagTodoItem':
            {
                todoModel.untagTodoItem(param1, param2, function (err) {
                    if (err) {
                        console.log("Error: tag has been not removed:", err);
                    }
                    console.log('The tag has been removed successfully:', param1);
                });
                break;
            }
        case 'markCompleted':
            {
                todoModel.markCompleted(param1, function (err) {
                    if (err) {
                        console.log("Error: todo item has been not completed:", err);
                    }
                    console.log('Todo item has been completed successfully')
                });
            }

        default:
            console.log("404 error: commend Not found!");
            break;
    }
});






// Week 3 Homeworks

// part 1 : 

employee | CREATE TABLE `employee` (
        `id`
        int(11) NOT NULL AUTO_INCREMENT,
        `username`
        varchar(50) NOT NULL,
        `password`
        varchar(50) DEFAULT NULL,
        PRIMARY KEY(`id`),
        UNIQUE KEY `username` (`username`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci |



    members | CREATE TABLE `members` (
        `id`
        int(11) NOT NULL AUTO_INCREMENT,
        `firstName`
        varchar(50) NOT NULL,
        `lastName`
        varchar(50) NOT NULL,
        `date_of_birth`
        date NOT NULL,
        `phone_number`
        int(11) DEFAULT NULL,
        `email_address`
        varchar(100) DEFAULT NULL,
        `country`
        varchar(50) DEFAULT NULL,
        `city`
        varchar(50) DEFAULT NULL,
        `address`
        varchar(100) DEFAULT NULL,
        PRIMARY KEY(`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci |



    books | CREATE TABLE `books` (
        `id`
        int(11) NOT NULL AUTO_INCREMENT,
        `isbn`
        varchar(50) DEFAULT NULL,
        `title`
        varchar(100) NOT NULL,
        `description`
        text,
        `author`
        varchar(75) NOT NULL,
        `borrowed`
        tinyint(1) DEFAULT NULL,
        PRIMARY KEY(`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci |