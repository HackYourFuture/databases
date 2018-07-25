// This is the connector (also known as driver)
// that we can use to connect to a MySQL process
// and access its databases.
const mysql = require('mysql');
const program = require('commander');

function createCommand(cmd, desc, func) {
    return program
        .command(cmd)
        .description(desc)
        .action(func)
};

function writeQuery(connection, args, callback) {
    return connection.query(...args, function (err, results, fields) {
        if (err) {
            callback(err);
            return;
        }
        callback(null, results);
    });
};

class TodoModel {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }

    // Loads all the TODOs in the database
    load(callback) {
        const selectTodoItems = "SELECT * FROM todo_items";
        writeQuery(this.dbConnection, [selectTodoItems], callback);
    }

    create(description, callback) {
        // Write code and query to create a new TODO item
        const todo = `INSERT INTO todo_items(text,is_completed,user_id) Values
      (${dbConnection.escape(description)},0,${dbConnection.escape(userId)})`;
        writeQuery(this.dbConnection, [todo], callback);
    }

    update(id, description, callback) {
        // Write code and query to update and existing TODO item
        const updateTodo = `UPDATE todo_items SET text=? WHERE  id= ?`;
        writeQuery(this.dbConnection, [updateTodo, [description, id]], callback);
    }

    delete(id, callback) {
        // Write code and query to delete an existing TODO item
        const deleteTodo = `DELETE FROM todo_items WHERE id=?`;
        writeQuery(this.dbConnection, [deleteTodo, id], callback);
    }

    tagTodoItem(todoItemId, tagId, callback) {
        // Write code and query add a tag to a TODO item
        const todoTag = 'INSERT INTO todo_item_tag VALUES (?,?)';
        writeQuery(this.dbConnection, [todoTag, [todoItemId, tagId]], callback);
    }

    untagTodoItem(todoItemId, tagId, callback) {
        // Write code and query remove a tag from a TODO item
        const deleteTag = 'DELETE FROM todo_item_tag WHERE todo_item_id=? AND tag_id=?';
        writeQuery(this.dbConnection, [deleteTag, [todoItemId, tagId]], callback);
    }

    markCompleted(todoItemId, callback) {
        // Write code to mark a TODO item as completed
        const completedTodo = `UPDATE todo_items SET is_completed=1 WHERE  id= ?`;
        writeQuery(this.dbConnection, [completedTodo, todoItemId], callback);
    }

    markIncomplete(todoItemId, callback) {
        // Write code to mark a TODO item as completed
        const incompleteTodo = `UPDATE todo_items SET is_completed=0 WHERE  id= ?`;
        writeQuery(this.dbConnection, [incompleteTodo, todoItemId], callback);
    }
}

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'newuser',
    password: 'newuserpassword',
    database: 'todo_app'
});

dbConnection.connect(function (err) {
    if (err != null) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + dbConnection.threadId);

    const todoModel = new TodoModel(dbConnection);

    createCommand('load', 'Loads todo items', () => {
        todoModel.load(function (err, todoItems) {
            if (err) {
                console.log("error loading TODO items:", err);
            }
            console.log("existing todo items:", todoItems);
        });
    });

    createCommand('create <description> <userID> ', 'Creates todo item', (description, userId) => {
        todoModel.create(description, userId, (err) => {
            if (err) {
                console.log("error failed to create TODO item:", err);
            }
            console.log(`Created a new todo item. Added todo:${description} -> User's id: ${userId}`)
        });
    });

    createCommand('update <todo-id> <new-description>', 'Updates todo', (id, description) => {
        todoModel.update(id, description, (err) => {
            if (err) {
                console.log("error failed to update TODO item:", err);
            }
            console.log(` Successfully updated todo item. Todo id:${id}. New description:${description}`)
        });
    });


    createCommand('delete <todo-id>', 'Deletes todo item', (id) => {
        todoModel.delete(id, (err) => {
            if (err) {
                console.log("error failed to delete TODO items:", err);
            }
            console.log(`Deleted todo item  id:${id}.`)
        });
    });

    createCommand('complete <todo-id> ', 'Marks todo as done', (todoItemId) => {
        todoModel.markCompleted(todoItemId, (err) => {
            if (err) {
                console.log("error failed to mark TODO item as complete:", err);
            }
            console.log(` Updated todo item  id:${todoItemId} as done.`)
        });
    });


    createCommand('incomplete <todo-id> ', 'Marks todo as undone', (todoItemId) => {
        todoModel.markIncomplete(todoItemId, (err) => {
            if (err) {
                console.log("error failed to mark TODO item as incomplete:", err);
            }
            console.log(`Updated todo item id:${todoItemId} as undone.`)
        });
    });

    createCommand('tag <todo-id> <tag-id>', 'Adds tag to todo item', (todoItemId, tagId) => {
        todoModel.tagTodoItem(todoItemId, tagId, (err) => {
            if (err) {
                console.log("error failed to add tag to TODO item:", err);
            }
            console.log(`Added tag  id:${tagId} to todo item id:${todoItemId}.`)
        });
    });

    createCommand('untag <todo id> <tag id>', 'Removes tags', (todoItemId, tagId) => {
        todoModel.untagTodoItem(todoItemId, tagId, (err) => {
            if (err) {
                console.log("error failed to remove tag from TODO item:", err);
            }

            console.log(`Removed tag from todo item  id:${todoItemId}.`)
        });
    });

    program.parse(process.argv);
    if (process.argv.length < 3) {
        program.help()
    };

});
dbConnection.end();