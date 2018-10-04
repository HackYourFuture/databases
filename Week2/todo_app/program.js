const mysql = require('mysql');
const program = require('commander');

class TodoModel {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }

    _Query(args, callback) {
        this.dbConnection.query(...args, (err, results, fields) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
    }

    load(callback) {
        const selectTodo = 'SELECT * FROM todo_items';
        this._Query([selectTodo], callback);
    }

    create(description, userId, callback) {
        const todo = `INSERT INTO todo_items(text,is_completed,user_id) Values
      (${dbConnection.escape(description)},0,${dbConnection.escape(userId)})`;
        this._Query([todo], callback);
    }

    update(id, description, callback) {
        const updateTodo = 'UPDATE todo_items SET ? WHERE id = ?';
        this._Query([updateTodo, [description, id]], callback);
    }

    delete(id, callback) {
        const deleteTodo = 'DELETE FROM todo_items WHERE id = ?';
        this._Query([deleteTodo, id], callback);
    }

    tagTodoItem(id, tagId, callback) {
        const todoTag = 'INSERT INTO todo_item_tag SET ?';
        this._Query([todoTag, [id, tagId]], callback);
    }

    untagTodoItem(id, tagId, callback) {
        const deleteTag =
            'DELETE FROM todo_item_tag WHERE todo_item_id = ? AND tag_id = ?';
        this._Query([deleteTag, [id, tagId]], callback);
    }

    markCompleted(id, callback) {
        const completedTodo = `UPDATE todo_items SET is_completed=1 WHERE  id= ?`;
        this._Query([completedTodo, id], callback);
    }
    markIncomplete(id, callback) {
        const incompleteTodo = `UPDATE todo_items SET is_completed=0 WHERE  id= ?`;
        this._Query([incompleteTodo, id], callback);
    }
}

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'todo_app',
    password: 'password',
    database: 'todo_app'
});

function createCommand(command, description, action) {
    return program
        .command(command)
        .description(description)
        .action(action);
}

dbConnection.connect(err => {
    if (err != null) console.error(`Error connecting: ${err.stack}`);
    else {
        console.log(`Connected as id ${dbConnection.threadId}`);
        const todoModel = new TodoModel(dbConnection);

        createCommand('Load', 'Loads todo items', () => {
            todoModel.load((err, todoItems) => {
                err && console.log('Error loading TODO items:', err),
                    console.log('Existing todo items:', todoItems);
            });
        }),
            createCommand(
                'Create <description> <userID> ',
                'Creates todo item',
                (description, userId) => {
                    todoModel.create(description, userId, err => {
                        err && console.log('Error failed to create TODO item:', err),
                            console.log(
                                `Created a new todo item. Added todo:${description} -> User's id: ${userId}`
                            );
                    });
                }
            ),
            createCommand(
                'Update <todo-id> <new-description>',
                'Updates todo',
                (id, description) => {
                    todoModel.update(id, description, err => {
                        err && console.log('Error failed to update TODO item:', err),
                            console.log(
                                ` Successfully updated todo item. Todo id:${id}. New description:${description}`
                            );
                    });
                }
            ),
            createCommand('Delete <todo-id>', 'Deletes todo item', id => {
                todoModel.delete(id, err => {
                    err && console.log('Error failed to delete TODO items:', err),
                        console.log(`Deleted todo item  id:${id}.`);
                });
            }),
            createCommand(
                'Tag <todo-id> <tag-id>',
                'Adds tag to todo item',
                (id, tagId) => {
                    todoModel.tagTodoItem(id, tagId, err => {
                        err && console.log('error failed to add tag to TODO item:', err),
                            console.log(`Added tag  id:${tagId} to todo item id:${id}.`);
                    });
                }
            ),
            createCommand('Untag <todo id> <tag id>', 'Removes tags', (id, tagId) => {
                todoModel.untagTodoItem(id, tagId, err => {
                    err && console.log('error failed to remove tag from TODO item:', err),
                        console.log(`Removed tag from todo item  id:${id}.`);
                });
            }),
            createCommand('Complete <todo-id> ', 'Marks todo as done', id => {
                todoModel.markCompleted(id, err => {
                    err &&
                        console.log('error failed to mark TODO item as complete:', err),
                        console.log(` Updated todo item  id:${id} as done.`);
                });
            }),
            createCommand('Incomplete <todo-id> ', 'Marks todo as undone', id => {
                todoModel.markCompleted(id, err => {
                    err &&
                        console.log('error failed to mark TODO item as incomplete:', err),
                        console.log(`Updated todo item id:${id} as undone.`);
                });
            }),
            program.parse(process.argv),
            3 > process.argv.length && program.help();
    }
}),
    dbConnection.end();
