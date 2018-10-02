// This is the connector (also known as driver)
// that we can use to connect to a MySQL process
// and access its databases.
const mysql = require('mysql');
const inputAll = process.argv[2];
let description = process.argv[3];
let id = process.argv[4];


// if (inputAll === 'load') {
//     TodoModel.load(callback);
// }

class TodoModel {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }

    load(callback) {
        const selectTodoItems = `SELECT * FROM users`;
        this.dbConnection.query(selectTodoItems, function(err, results) {
            if (err) {
                callback(err);
                return;
            }
            // console.log(results);
            callback(null, results);
        });
    }



    update(callback) {
        const updateTodoItems = `UPDATE todo_items SET text = '${description}' WHERE id = ${id}`;

        this.dbConnection.query(updateTodoItems, function(err, results) {
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
    user: 'test_user',
    password: '',
    database: 'todo_app'
});

dbConnection.connect(function(err) {
    if (err != null) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + dbConnection.threadId);

    const todoModel = new TodoModel(dbConnection);
    if (inputAll == 'load') {
        todoModel.load(function(err, todoItems) {
            if (err) {
                console.log('error loading TODO items:', err);
            }
            console.log('loading TODO items: ', todoItems);
        })
    } else if (inputAll === 'update') {
        todoModel.update(function(err, clor) {
            if (err) {
                console.log("error loading TODO items:", err);
            }
            console.log('Task with ID: ', clor);
        })
    }
});