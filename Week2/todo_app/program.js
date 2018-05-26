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
        // Write code and query to create a new TODO item
        const sqlInsert = {
            text: description,
            is_completed: 0,
            user_id: 1
        };
        this.dbConnection.query('INSERT INTO todo_items SET ?', sqlInsert, (err, result) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, result);
        });
    }

    update(id, description, callback) {
        // Write code and query to update and existing TODO item
        const sql = 'UPDATE todo_items SET text=? where id=?';
        this.dbConnection.query(sql, [description, id], (err, result) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, result);
        })
    }

    delete(id, callback) {
        // Write code and query to delete an existing TODO item
        const sql = `DELETE FROM todo_items where id = ?`;
        this.dbConnection.query(sql, id, (err, result) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, result);
        });
    }

    tagTodoItem(todoItemId, tagId, callback) {
        // Write code and query add a tag to a TODO item
        const sql = `INSERT INTO todo_item_tag VALUES(? , ?)`
        this.dbConnection.query(sql, [todoItemId, tagId], (err, result) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, result);
        });
    }

    untagTodoItem(todoItemId, tagId, callback) {
        // Write code and query remove a tag from a TODO item
        const sql = `DELETE FROM todo_item_tag where tag_id = ? AND todo_item_id = ?`;
        this.dbConnection.query(sql, [tagId, todoItemId], (err, result) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, result);
        });
    }

    markCompleted(todoItemId, callback) {
        // Write code to mark a TODO item as completed
        const sql = `UPDATE todo_items SET is_completed = 1 where id= ? `;
        this.dbConnection.query(sql, todoItemId, (err, result) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, result);
        })
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
    todoModel.load(function (err, todoItems) {
        if (err) {
            console.log("error loading TODO items:", err);
        }

        console.log("existing todo items:", todoItems);
    });
});