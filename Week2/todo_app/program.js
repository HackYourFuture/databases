const mysql = require('mysql');
const config = require('./config.json');
var program = require('commander');

class TodoModel {
    constructor(connection) {
        this.connection = connection;
    }

    load(callback) {
        const selectTodoItems = "SELECT * FROM todo_items";
        this.connection.query(selectTodoItems, (err, results, fields) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
    }

    create(description, user_id, callback) {
        const insertItem =
            `INSERT INTO todo_items(text,is_completed,user_id)
            VALUES(${connection.escape(description)} ,0 ,${connection.escape(user_id)} );
            `;
        this.connection.query(insertItem, (err, results, fields) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
    }

    update(id, description, callback) {
        const updateItem =
            `
            UPDATE todo_items SET text = ${connection.escape(description)}
              WHERE id = ${connection.escape(id)}
             ;`;
        this.connection.query(updateItem, (err, results, fields) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
    }

    delete(id, callback) {
        const deleteItem =
            `
            DELETE FROM todo_items 
            WHERE id = ${connection.escape(id)}
            ;`;
        this.connection.query(deleteItem, (err, results, fields) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
    }

    tagTodoItem(todoItemId, tagId, callback) {
        const tagItem =
            `
            INSERT INTO todo_item_tag(todo_item_id,tag_id)
            VALUES (${connection.escape(todoItemId)} , ${connection.escape(tagId)});
            `;
        this.connection.query(tagItem, (err, results, fields) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
    }

    unTagTodoItem(todoItemId, tagId, callback) {
        const unTagItem =
            `
            DELETE FROM todo_item_tag
            WHERE todo_item_id= ${todoItemId}
            AND tag_Id = ${connection.escape(tagId)}
            ;`;

        this.connection.query(unTagItem, (err, results, fields) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
    }

    markCompleted(todoItemId, callback) {
        const markItem =
            `UPDATE todo_items SET is_completed = 1
             WHERE id=${connection.escape(todoItemId)}
            `;

        this.connection.query(markItem, (err, results, fields) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
    }

}

const connection = mysql.createConnection({
    host: config.host,
    user: config.username,
    password: config.password,
    database: 'todo_app'
});

const cmd = process.argv[2];
const input = process.argv[3];
const secondInput = process.argv[4];


connection.connect((err) => {
    if (err != null) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('');
    console.log('        connected as id ' + connection.threadId);
    console.log('');
    console.log('type ==> --help OR -h <== for more information');
    console.log('');


    const todoModel = new TodoModel(connection);
    switch (cmd) {
        case '-L':
        case '--load':
            todoModel.load((err, todoItems) => {
                err ? console.log("error loading TODO items:", err) :
                    console.log("existing todo items:", todoItems);
            });
            break;
        case '-C':
        case 'create':
            todoModel.create(input, secondInput, (err) => {
                err ? console.log('there was an error , type ==> --help OR -h <== for more information') :
                    console.log('Created Successfully');
            });
            break;
        case '-U':
        case 'update':
            todoModel.update(input, secondInput, (err) => {
                err ? console.log('there was an error , type ==> --help OR -h <== for more information') :
                    console.log('Updated Successfully');
            });
            break;
        case '-D':
        case 'delete':
            todoModel.delete(input, (err) => {
                err ? console.log('there was an error , type ==> --help OR -h <== for more information') :
                    console.log('Deleted Successfully');
            });
            break;
        case '-T':
        case 'tagTodoItem':
            todoModel.tagTodoItem(input, secondInput, (err) => {
                err ? console.log('there was an error , type ==> --help OR -h <== for more information') :
                    console.log('Tagged Successfully');
            });
            break;
        case '-UT':
        case 'unTagTodoItem':
            todoModel.unTagTodoItem(input, secondInput, (err) => {
                err ? console.log('there was an error , type ==> --help OR -h <== for more information') :
                    console.log('UnTagged Successfully');
            });
            break;
        case '-M':
        case 'markCompleted':
            todoModel.markCompleted(input, (err) => {
                err ? console.log('there was an error , type ==> --help OR -h <== for more information') :
                    console.log('Marked Successfully');
            });
            break;
    }
    connection.end();
});

program
    .version('0.1.0')
    .option('-L, --load', 'Loads All The Items In Todo ')
    .option('-C, --create', 'Creat New Item')
    .option('-U, --update', 'Update New Item')
    .option('-D, --delete', 'Delete Item')
    .option('-T, --tagTodoItem', 'Tag Item ')
    .option('-UT, --unTagTodoItem', 'Un Tag Item')
    .option('-M, --markCompleted', 'Mark Item As Complete');

program.parse(process.argv);