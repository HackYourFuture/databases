// This is the connector (also known as driver)
// that we can use to connect to a MySQL process
// and access its databases.
const mysql = require('mysql');
const config = require('./config');
class TodoModel {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }

    // Loads all the TODOs in the database
    load(callback) {
        const selectTodoItems = "SELECT * FROM todo_items;";
        this.dbConnection.query(selectTodoItems, function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
    }

    create(description, user_id, callback) {
        // Write code and query to create a new TODO item
        let sqlQuery = "INSERT INTO  todo_items(text,is_completed,user_id) VALUES ('" + description + "'," + 0 + "," + user_id + ");"
        this.dbConnection.query(sqlQuery, function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            } else {
                callback(null, results);
            }
        });
    }

    update(id, description, callback) {
        // Write code and query to update and existing TODO item
        let sqlQuery = "UPDATE todo_items SET text = '" + description + "' WHERE id =" + id + ";";
        this.dbConnection.query(sqlQuery, function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            } else {
                callback(null, results);
            }
        });

    }

    delete(id, callback) {
        // Write code and query to delete an existing TODO item
        let sqlQuery = "DELETE FROM todo_items where id =" + id + ";";
        this.dbConnection.query(sqlQuery, function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            } else {
                callback(null, results);
            }
        });
    }

    tagTodoItem(todoItemId, tagId, callback) {
        // Write code and query add a tag to a TODO item
        let sqlQuery = "INSERT INTO todo_item_tag(todo_Item_Id,tag_Id) VALUES (" + todoItemId + "," + tagId + ");"
        this.dbConnection.query(sqlQuery, function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            } else {
                callback(null, results);
            }
        });

    }

    untagTodoItem(todoItemId, tagId, callback) {
        // Write code and query remove a tag from a TODO item
        let sqlQuery = "DELETE FROM todo_item_tag where todo_item_id = " + todoItemId + " AND tag_id=" + tagId + ";"
        this.dbConnection.query(sqlQuery, function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            } else {
                callback(null, results);
            }
        });
    }

    markCompleted(todoItemId, callback) {
        // Write code to mark a TODO item as completed
        let sqlQuery = "UPDATE todo_items set is_completed = " + 1 + " WHERE id =" + todoItemId + ";"
        this.dbConnection.query(sqlQuery, function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            } else {
                callback(null, results);
            }
        });
    }
}
let cmd = process.argv[2];
let args = process.argv.slice(3);

let args2 = process.argv.slice(4);

const dbConnection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});


dbConnection.connect(function (err) {
    if (err != null) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + dbConnection.threadId);

    const todoModel = new TodoModel(dbConnection);
    switch (cmd) {
        case 'load': {
            todoModel.load((err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result);

                }
            })
            break;
        }
        case "create": {
            if (isNaN(args2[0]) || args2[0] < 0) {
                console.log('You have a error please use -h or help to show the right commands');

            } else {
                todoModel.create(args[0], args2, (err => {
                    if (err) {
                        console.log('You have a Error in your Query : ' + err);
                    } else {
                        console.log('data added : text ,&' + args[0] + "to user id Number : " + args2);

                    }

                }))
            }
            break;
        }
        case 'update': {
            if (isNaN(args[0]) || args[0] < 0) {
                console.log('You have a error please use -h or help to show the right commands');

            } else {
                todoModel.update(parseInt(args), args2, (err) => {
                    if (err) {
                        console.log('You have a Error in your Query : ' + err + "/n please use -h or help for help");
                    } else {

                        console.log('data updated : New Value :' + args2 + " & to user id Number : " + args[0]);
                    }
                });
            }
            break;
        }
        case 'delete': {
            if (isNaN(args[0]) || args[0] < 0) {
                console.log('You have a error please use -h or help to show the right commands');

            } else {
                todoModel.delete(parseInt(args[0]), (err) => {
                    if (err) {
                        console.log('You have a Error in your Query : ' + err + "/n please use -h or help for help");


                    } else {
                        console.log(`Deleted one Row id : ${args[0]}`)
                    }
                })
            }
            break;
        }
        case 'add_tag': {
            if (isNaN(args[0]) || args[0] < 0 || isNaN(args2[0]) || args2[0] < 0) {
                console.log('You have a error please use -h or help to show the right commands');

            } else {
                todoModel.tagTodoItem(parseInt(args[0]), parseInt(args2[0]), (err) => {
                    if (err) {
                        console.log('You have a Error in your Query : ' + err + "/n please use -h or help for help");
                    } else {
                        console.log(`You new tag is added ToDo_Id : ${args[0]} , User_Id is ${args2[0]}`)

                    }

                })

            }
            break;
        }
        case 'remove_tag': {
            if (isNaN(args[0]) || args[0] < 0 || isNaN(args2[0]) || args2[0] < 0) {
                console.log('You have a error please use -h or help to show the right commands');

            } else {
                todoModel.untagTodoItem(parseInt(args[0]), parseInt(args2[0]), (err) => {
                    if (err) {
                        console.log('You have a Error in your Query : ' + err + "/n please use -h or help for help");
                    } else {
                        console.log(`You had  remove on tag , ToDo_Id : ${args[0]} , User_Id is ${args2[0]}`)

                    }


                })

            }
            break;
        }
        case 'completed': {
            if (isNaN(args[0]) || args[0] < 0) {
                console.log('You have a error please use -h or help to show the right commands');
            } else {

                todoModel.markCompleted(parseInt(args[0]), (err) => {
                    if (err) {
                        console.log('You have a Error in your Query : ' + err + "/n please use -h or help for help");
                    } else {
                        console.log('mark it is Completed  , Id Number ' + args[0]);

                    }

                })
            }
        }
            break;
        case 'help': {
            console.log(` 
                  load                      to get the tasks 
                  create 'text' id           to add a new task 
                  update id 'New text'      to update a task that already exist 
                  delete id                 to delete a task that already exist 
                  completed  task_id        to mark task as completed ;
                  add_tag todo_item_id  id  to add  a new tag 
                  remove_tag todo_id    id  to delete a tag that already exist 
               
 `)

            break;
        }
        case '-h': {
            console.log(` 
                          load                      to get the tasks 
                          create 'text' id          to add a new task 
                          update id 'New text'      to update a task that already exist 
                          delete id                 to delete a task that already exist 
                          completed  task_id        to mark task as completed ;
                          add_tag todo_item_id  id  to add  a new tag 
                          remove_tag todo_id    id  to delete a tag that already exist 
                       
         `)

            break;
        }
        default: {

            console.log('Not Found Please use -h or help ')
            break;
        }
    }

    dbConnection.end();
});
