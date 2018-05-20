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
    const createTodoItem = `INSERT INTO todo_items(text, is_completed, user_id) 
    VALUES (${dbConnection.escape(description)}, 0, ${dbConnection.escape(arg2)} )`;
    this.dbConnection.query(createTodoItem, function (err, results, fields) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, results);
    });
  }

  update(id, description, callback) {
    // Write code and query to update and existing TODO item
    const updateTodoItem = `UPDATE todo_items 
    SET text = ${dbConnection.escape(description)} 
    WHERE id = ${dbConnection.escape(id)}`;
    this.dbConnection.query(updateTodoItem, function (err, results, fields) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, results);
    });
  }

  delete(id, callback) {
    // Write code and query to delete an existing TODO item
    const deleteTodoItem = `DELETE FROM todo_items 
    WHERE id = ${dbConnection.escape(id)}`;
    this.dbConnection.query(deleteTodoItem, function (err, results, fields) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, results);
    });
  }

  tagTodoItem(todoItemId, tagId, callback) {
    // Write code and query add a tag to a TODO item
    const addTagToTODOItem = `INSERT INTO todo_item_tag(todo_item_id, tag_id) 
    VALUES (${dbConnection.escape(todoItemId)}, ${dbConnection.escape(tagId)})`;
    this.dbConnection.query(addTagToTODOItem, function (err, results, fields) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, results);
    });
  }

  untagTodoItem(todoItemId, tagId, callback) {
    // Write code and query remove a tag from a TODO item
    const removeTagFromTODOItem = `DELETE FROM todo_item_tag 
    WHERE todoItemId = ${dbConnection.escape(todoItemId)} 
    AND tagId = ${dbConnection.escape(tagId)}`;
    this.dbConnection.query(removeTagFromTODOItem, function (err, results, fields) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, results);
    });
  }

  markCompleted(todoItemId, callback) {
    // Write code to mark a TODO item as completed
    const completeTODOItem = `UPDATE todo_items SET is_completed = TRUE 
    WHERE ${dbConnection.escape(todoItemId)} = id`;
    this.dbConnection.query(completeTODOItem, (err, results, fields) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null, results);
    });
  }
}

const command = process.argv[2];
const arg1 = process.argv[3];
const arg2 = process.argv[4];

const dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'aya',
  password: '123456',
  database: 'todo_app'
});

dbConnection.connect(function (err) {
  if (err != null) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + dbConnection.threadId);

  const todoModel = new TodoModel(dbConnection);
  switch (command) {
    case 'load': {
      todoModel.load(function (err, todoItems) {
        if (err) {
          console.log("error loading TODO items:", err);
        }
        console.log("existing todo items:", todoItems);
      });
      break;
    }

    case 'create': {
      todoModel.create(arg1, function (err) {
        if (err) {
          console.log("error creating TODO item:", err);
        }
        console.log('new todo created:', arg1);
      });
      break;
    }

    case 'update': {
      todoModel.update(arg1, arg2, function (err) {
        if (err) {
          console.log("error updating TODO item:", err);
        }
        console.log('TODO item:', arg1, 'has been updated to:', arg2);
      });
      break;
    }

    case 'delete': {
      todoModel.delete(arg1, function (err) {
        if (err) {
          console.log("error deleting TODO item:", err);
        }
        console.log('TODO item:', arg1, 'has been deleted!')
      });
      break;
    }

    case 'tag': {
      todoModel.tagTodoItem(arg1, arg2, function (err) {
        if (err) {
          console.log("error tagging TODO item:", err);
        }
        console.log('TODO item:', arg1, 'has been tagged to', arg2)
      });
    }

    case 'untag': {
      todoModel.untagTodoItem(arg1, arg2, function (err) {
        if (err) {
          console.log("error un_tagging TODO item:", err);
        }
        console.log('TODO item:', arg1, 'has been untagged')
      });
    }

    case 'mark': {
      todoModel.markCompleted(arg1, function (err) {
        if (err) {
          console.log("error marking TODO item as complete:", err);
        }
        console.log('TODO item:', arg1, 'has been marked as complete.')
      });
    }

    default:
      console.log("Please select what you want to do:");
      break;
  }

  dbConnection.end();
});
