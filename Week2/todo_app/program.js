// This is the connector (also known as driver)
// that we can use to connect to a MySQL process
// and access its databases.
const mysql = require('mysql');
const config = require('./db-secret.json');
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

    create(description, user_id, callback) {
        // Write code and query to create a new TODO item
        const createQuery = `
        INSERT INTO todo_items(text, is_completed, user_id) VALUES("${description}" , 0 , ${user_id})
        `;
        this.dbConnection.query(createQuery, (err,results, fields) => {
            if(err) {
                callback(err);
                return;
            } else {
                callback(null, results);
            }
        })

    }

    update(id, description, callback) {
        // Write code and query to update and existing TODO item
        const updateQuery = `
        UPDATE todo_items SET text = "${description}" 
        WHERE id = ${id}
        `
        ;
        this.dbConnection.query(updateQuery, (err,results, fields) => {
            if(err) {
                callback(err);
                return;
            } else {
                callback(null, results);
            }
        })

    }

    delete(id, callback) {
        // Write code and query to delete an existing TODO item
        const deleteQuery = `
        DELETE FROM todo_items WHERE id = ${id}
        `
        ;
        this.dbConnection.query(deleteQuery, (err,results, fields) => {
            if(err) {
                callback(err);
                return;
            } else {
                callback(null, results);
            }
        })

    }

    tagTodoItem(todoItemId, tagId, callback) {
        // Write code and query add a tag to a TODO item
        const tagTodoItemQuery = `
        INSERT INTO todo_item_tag(todo_item_id, tag_id)
        VALUES (${todoItemId},${tagId})
        `
        ;
        this.dbConnection.query(tagTodoItemQuery, (err,results, fields) => {
            if(err) {
                callback(err);
                return;
            } else {
                callback(null, results);
            }
        })
    }
        
    untagTodoItem(todoItemId, tagId, callback) {
        // Write code and query remove a tag from a TODO item
        const untagTodoItemQuery = `
        DELETE FROM todo_item_tag
        WHERE todo_item_id = ${todoItemId}
        AND tag_id = ${tagId}
        `
        ;
        this.dbConnection.query(untagTodoItemQuery, (err,results, fields) => {
            if(err) {
                callback(err);
                return;
            } else {
                callback(null, results);
            }
        })
    }

    markCompleted(todoItemId, callback) {
        // Write code to mark a TODO item as completed
        const markCompletedQuery = `
        UPDATE todo_items 
        SET is_completed = 1 
        WHERE id = ${todoItemId}
        `
        ;
        this.dbConnection.query(markCompletedQuery, (err,results, fields) => {
            if(err) {
                callback(err);
                return;
            } else {
                callback(null, results);
            }
        })
    }
    help(callback) {
        console.log(`
            Hi! Please check the details and try again!

            load                         ======>>>>> shows current todo list
            create 'text' id             ======>>>>> creates a new todo item
            update 'text' todo_id        ======>>>>> updates an existing todo item
            delete todo_id               ======>>>>> deletes an existing todo item
            tag    todo_item_id tag_id   ======>>>>> tags with an existing tag
            untag  todo_item_id tag_id   ======>>>>> untags todo item
            completed todo_item_id       ======>>>>> marks todo item item as 'done'
            `
        );
    };
}

const dbConnection = mysql.createConnection({
    host     : 'localhost',
    user     : config.user,
    password : config.password,
    database : 'todo_app'
});

const method = process.argv[2];
const thirdInput = dbConnection.escape(process.argv[3]);
const fourthInput = dbConnection.escape(process.argv[4]);

dbConnection.connect(function(err) {
    if (err != null) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + dbConnection.threadId);

    const todoModel = new TodoModel(dbConnection);

    switch (method) {
        case 'create':
            todoModel.create(thirdInput, fourthInput, () => {
                    console.log(`This element added: "${thirdInput}" to the id : "${fourthInput}"`);
            });
            break;
        case 'update':
            todoModel.update(fourthInput,thirdInput, () => {
                console.log(`Desciption has changed as ${thirdInput}`);
            });
            break;
        case 'delete':
            todoModel.delete(thirdInput, () => {
                console.log(`id: ${thirdInput} deleted`);
            });
            break;
        case 'load':
            todoModel.load(function(err, todoItems) {
                if(err) {
                    console.log("error loading TODO items:", err);
                }
        
                console.log("existing todo items:", todoItems);
            });
            break;
        case 'tag':
            todoModel.tagTodoItem(thirdInput,fourthInput, () => {
                console.log(`${thirdInput} tagged!`);
            });
            break;
        case 'untag':
            todoModel.untagTodoItem(thirdInput,fourthInput, () => {
                console.log(`${thirdInput} untagged!`);
            });
            break;
        case 'completed':
            todoModel.markCompleted(thirdInput, () => {
                console.log(`Congratulations! ${thirdInput} is done!`);
            });
        break;
        case 'help':
            todoModel.help();
            break;
        default:
            console.log(`
            load                         ======>>>>> shows current todo list
            create 'text' id             ======>>>>> creates a new todo item
            update 'text' todo_id        ======>>>>> updates an existing todo item
            delete todo_id               ======>>>>> deletes an existing todo item
            tag    todo_item_id tag_id   ======>>>>> tags with an existing tag
            untag  todo_item_id tag_id   ======>>>>> untags todo item
            completed todo_item_id       ======>>>>> marks todo item item as 'done'
            `
        )
    }
    dbConnection.end();
});