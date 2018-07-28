// This is the connector (also known as driver)
// that we can use to connect to a MySQL process
// and access its databases.
const mysql = require('mysql');
const express = require('express');
const app = express();

// const cmd = process.argv[2];
// const input1 = process.argv[3];
// const input2 = process.argv[4];

class TodoModel {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }

    // Loads all the TODOs in the database
    load(callback) {
        const selectTodoItems = "SELECT * FROM todo_items";
        this.dbConnection.query(selectTodoItems, function(err, results, fields) {
            if(err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
    }

    create(description, callback) {
        // Write code and query to create a new TODO item
        dbConnection.query('INSERT INTO todo_items (text, is_completed) VALUES = ?', [description], function (error, results, fields) {
                if (error) {
                    callback(err);
                    return;
                }
                callback(null, results);
        })
    }

    update(id, description, callback) {
        // Write code and query to update and existing TODO item
        dbConnection.query('UPDATE todo_items SET text = ? WHERE id = ?'[description], [id], function (error, results, fields) {
            if (error) {
                callback(err);
                return;
            }
            callback(null, results);
        })
    }

    delete(id, callback) {
        // Write code and query to delete an existing TODO item
        dbConnection.query('DELETE FROM todo_items WHERE id = ?', [id], function (error, results, fields) {
            if (error) {
                callback(error);
                return;
            }
            callback(null, results);
        })
    }

    tagTodoItem(todoItemId, tagId, callback) {
        // Write code and query add a tag to a TODO item
        dbConnection.query('INSERT INTO todo_item_tag VALUES = ?,?', [todoItemId], [tagId], function (error, results, fields) {
            if (error) {
                callback(err);
                return;
            }
            callback(null, results)
        })
    }

    untagTodoItem(todoItemId, tagId, callback) {
        // Write code and query remove a tag from a TODO item
        dbConnection.query('DELETE FROM todo_item_tag WHERE todo_item_id = ? AND tagId = ?', [todoItemId], [tagId], function (error, results, fields) {
            if (error) {
                callback(err);
                return;
            }
            callback(null, results);
        })
    }

    markCompleted(todoItemId, callback) {
        // Write code to mark a TODO item as completed
        dbConnection.query('UPDATE todo_items SET is_completed = true WHERE id = ?', [todoItemId],function (error, results, fields) {
            if (error) {
                callback(err);
                return;
            }
            callback(null, results);
    })
}

    }

const dbConnection = mysql.createConnection({
    host     : 'localhost',
    user     : 'dumie',
    password : '1234',
    database : 'todo_app'
});

dbConnection.connect(function(err) {
    if (err != null) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + dbConnection.threadId);

    const todoModel = new TodoModel(dbConnection);
    todoModel.load(function(err, todoItems) {
        if(err) {
            console.log("error loading TODO items:", err);
        }

        console.log("existing todo items:", todoItems);
    });
});

dbConnection.end();

// === BELOW ARE STEPS AND COMMANDS I USED TO CREATE A NEW USER IN MYSQL.===

/*
1. MariaDB [(none)]> use todo_app;

2. MariaDB [todo_app]> CREATE USER 'dumie'@'localhost' IDENTIFIED BY '1234';

3. MariaDB [todo_app]> GRANT ALL ON todo_app. * TO 'dumie'@'localhost';

4. MariaDB [todo_app]> FLUSH PRIVILEGES;

5. MariaDB [todo_app]> exit

6. hackyourfuture@hackyourfuture-Latitude-E5430-non-vPro:~/HackYourFuture/databases/Week2/todo_app$ mysql -u dumie -p1234

7. MariaDB [(none)]> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| todo_app           |
+--------------------+
2 rows in set (0.00 sec)
*/