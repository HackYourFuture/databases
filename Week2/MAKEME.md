# Homework week 2

## Writing a model to communicate with the TODO database

Look at [todo_app/db.sql](./todo_app/db.sql) and use it to create a database. In
the [todo_app/program.js](./todo_app/program.js) file there's a little program
that should be able to extract TODOs from the database, update them, and delete
them. The `load` function already extracts all TODOs from the database. 

Run `npm install` inside the `todo_app` directory to download and install the MySQL
connector.

Try to understand what happens in this program. How is the database connection
created? How do we use the connection to query the database?

You'll find the following empty functions in the `program.js` file, please
implement them:

*Read how to [use and escape query values](https://github.com/mysqljs/mysql#escaping-query-values)*

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




    function create(id, description, callback) {
    // Write code and query to create a new TODO item
    var query = dbConnection.query('INSERT INTO todo_items (text, user_id) VALUES ( ' + description + ' , ' + id + ' )');
    query.on('Result', function (row) {
        callback(null, row.id)
    });
}



function update(id, description, callback) {
    // Write code and query to update and existing TODO item
    var query = dbConnection.query('UPDATE todo_items SET text = ' + description + 'Where user_id = ' + id);
    query.on('Result', function (row) {
        callback(null, row.id)
    });
}



function delete (id, callback) {
    // Write code and query to delete an existing TODO item
    var query = dbConnection.query('DELETE FROM todo_items WHERE user_id = ' + id);
    query.on('Result', function (row) {
        callback(null, row.id)
    });
}

function tagTodoItem(todoItemId, tagId, callback) {
    // Write code and query add a tag to a TODO item
    var query = dbConnection.query('INSERT INTO  todo_item_tag(todoItemId, tagId) VALUES ( ' + todoItemId + ' , ' + tagId + ' )');
    query.on('Result', function (row) {
        callback(null, row.todoItemId)
    });
}


function untagTodoItem(todoItemId, tagId, callback) {
    // Write code and query remove a tag from a TODO item
    var query = dbConnection.query('DELETE FROM todo_item_tag WHERE todoItemId = ' + todoItemId + 'AND tagId = ' + tagId);
    query.on('Result', function (row) {
        callback(null, row.todoItemId)
    });
}

function markCompleted(todoItemId, callback) {
    // Write code to mark a TODO item as completed
    var query = dbConnection.query('UPDATE todo_items SET is_completed = TRUE WHERE id = ' + todoItemId);
    query.on('Result', function (row) {
        callback(null, row.todoItemId)
    });
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


# Adding a new database user

Until now we've always connected to the database as `root`. We don't want to
allow our TODO app access to other databases than the TODO app itself:

- Figure out how to create a new user in MySQL.
- Restrict the access for that user to only the `todo_app` database.
- Use the newly created user credentials (username, password) in the connector of
  the `program.js` file.
