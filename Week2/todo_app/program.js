// This is the connector (also known as driver)
// that we can use to connect to a MySQL process
// and access its databases.
const mysql = require('mysql');

class TodoModel {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
        this.sqlSelectQuery = "SELECT * FROM todo_items";
    }

    availableIds(sqlQuery) {
        return new Promise ((resolve, reject) => {
            this.dbConnection.query(sqlQuery, function(err, results, fields) {
                if(!err) {
                    let temp = results.map(result => result.id);
                    resolve(temp);
                }else {
                    reject(err);
                }
            });
        });
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
        const addTodoItem = "INSERT INTO todo_items VALUES(NULL, ?, ?, ?)";
        this.dbConnection.query(addTodoItem, description, (err, results, fields) => {
            if(err) return callback(err);
            callback(null, results);
        });
    }

    update(id, description, callback) {
        // Write code and query to update and existing TODO item
        const updatePromise = this.availableIds(this.sqlSelectQuery);
        updatePromise
            .then(data => {
                const temp = data.includes(id);
                if(temp) {
                    const updateItem = `UPDATE todo_items SET text = ? WHERE id = ?`;
                    this.dbConnection.query(updateItem, [description, id], (err, results, fields) => {
                    if(err) return callback(err);
                    callback(null, results);
                    });
                }else {
                    console.log(`The id ${id} you added is not found in database! enter a valid id!`);
                }
            })
            .catch(err => console.log(err));
    }

    delete(id, callback) {
        // Write code and query to delete an existing TODO item
        const deletePromise = this.availableIds(this.sqlSelectQuery);
        deletePromise
            .then(data => {
                const temp = data.includes(id);
                if(temp) {
                    const deleteItem = `DELETE FROM todo_items WHERE id =` + dbConnection.escape(id);
                    this.dbConnection.query(deleteItem, (err, results, fields) => {
                    if(err) return callback(err);
                    callback(null, results);
        });
                }else {
                    console.log(`The id ${id} you added is not found in database! enter a valid id!`);
                }
            })
            .catch(err => console.log(err));
    }

    tagTodoItem(todoItemId, tagId, callback) {
        // Write code and query add a tag to a TODO item
        const allItemsId = this.availableIds(this.sqlSelectQuery);
        allItemsId
            .then(data => {
                const todoIdIsFound = data.includes(todoItemId);
                if(todoIdIsFound) {
                    const checkTagId = this.availableIds("SELECT * FROM tags");
                    checkTagId
                        .then(tagData => {
                            const tagIdIsFound = tagData.includes(tagId);
                            if(tagIdIsFound) {
                                const addTodoItemTag = "INSERT INTO todo_item_tag VALUES(?, ?)";
                                this.dbConnection.query(addTodoItemTag, [todoItemId, tagId], (err, results, fields) => {
                                    if(err) return callback(err);
                                    callback(null, results);
                                });
                            }else {
                                console.log(`The tag id ${tagId} you added is not found in database!`);
                            }
                        })
                        .catch(error => console.log(error));
                }else {
                    console.log(`The id ${todoItemId} you added is not found in database! enter a valid id!`);
                }
            })
            .catch(err => console.log(err));
    }
        
    untagTodoItem(todoItemId, tagId, callback) {
        // Write code and query remove a tag from a TODO item
        const allItemsId = this.availableIds(this.sqlSelectQuery);
        allItemsId
            .then(data => {
                const todoIdIsFound = data.includes(todoItemId);
                if(todoIdIsFound) {
                    const checkTagId = this.availableIds("SELECT * FROM tags");
                    checkTagId
                        .then(tagData => {
                            const tagIdIsFound = tagData.includes(tagId);
                            if(tagIdIsFound) {
                                const addTodoItemTag = "DELETE FROM todo_item_tag WHERE todo_item_id = ? AND tag_id = ?";
                                this.dbConnection.query(addTodoItemTag, [todoItemId, tagId], (err, results, fields) => {
                                    if(err) return callback(err);
                                    callback(null, results);
                                });
                            }else {
                                console.log(`The tag id ${tagId} you added is not found in database!`);
                            }
                        })
                        .catch(error => console.log(error));
                }else {
                    console.log(`The id ${todoItemId} you added is not found in database! enter a valid id!`);
                }
            })
            .catch(err => console.log(err));
    }

    markCompleted(todoItemId, callback) {
        // Write code to mark a TODO item as completed
        const updatePromise = this.availableIds(this.sqlSelectQuery);
        updatePromise
            .then(data => {
                const temp = data.includes(todoItemId);
                if(temp) {
                    const updateItem = `UPDATE todo_items SET is_completed = ? WHERE id = ?`;
                    this.dbConnection.query(updateItem, [true, todoItemId], (err, results, fields) => {
                    if(err) return callback(err);
                    callback(null, results);
                    });
                }else {
                    console.log(`The id ${todoItemId} you added is not found in database! enter a valid id!`);
                }
            })
            .catch(err => console.log(err));
    }

}


const dbConnection = mysql.createConnection({
    host     : 'localhost',
    user     : 'shadi',
    password : '',
    database : 'todo_app',
    port: 3307
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
    
    

    // Create new todo item :
    const newItemText = 'Going to Utrecht';
    const newItem = [newItemText, true, 4];
    todoModel.create(newItem, (err) => {
        err ? console.log("Error by adding new item", err) : console.log("New todo-item added!");
    });
   
    const toUpdateId = 44;
    const toUpdateText = "Beginning with ReactJS week1 + homework";
    todoModel.update(toUpdateId, toUpdateText, (err) => {
        err ? console.log("Error by updating item", err) : console.log("todo-item updated!");
    });
    
    const toDeleteId = 51;
    todoModel.delete(toDeleteId, (err) => {
        err ? console.log("Error by deleting item", err) : console.log("todo-item deleted!");
    });

    todoModel.tagTodoItem(44, 2, (err) => {
        err ? console.log("Error by adding new tag", err) : console.log("New todo-item tag added!");
    });

    todoModel.untagTodoItem(44, 2, (err) => {
        err ? console.log("Error by deleting the tag", err) : console.log("tag deleted !");
    });
    
    todoModel.markCompleted(43, (err) => {
        err ? console.log("Error by updating item", err) : console.log("todo-item updated as completed!");
    });
 
});