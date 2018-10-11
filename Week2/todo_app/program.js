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
    const selectTodoItems = 'SELECT * FROM todo_items';
    this.dbConnection.query(selectTodoItems, function (err, results, fields) {
      if (err) {
        callback(err);
        return;
      }

      callback(null, results);
    });
  }

  create(description, user_id, callback) {

    const taskData = {
      text: description,
      is_completed,
      user_id: user_id

    }
    const sql = 'INSERT INTO todo_items SET ?';
    this.dbConnection.query(sql, taskData, function (err, results, fields) {
      if (err) {
        callback(err);
        return;
      }

      callback(null, results);
    });
  }


  update(id, description, callback) {
    // Write code and query to update and existing TODO item
    const sql = 'UPDATE todo_items SET text = ? WHERE id =?';
    this.dbConnection.query(sql, [description, id], function (err, results, field) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, results);
    })
  }

  delete(id, callback) {
    // Write code and query to delete an existing TODO item
    const sql = 'DELETE FROM todo_items WHERE id = ?';
    this.dbConnection.query(sql, [id], function (err, results, fields) {

      if (err) {
        callback(err);
        return;
      }
      callback(null, results);
    });
  }

  tagTodoItem(todoItemId, tagId, callback) {
    // Write code and query add a tag to a TODO item
    const Data = {
      todo_item_id: todoItemId,
      tag_id: tagId
    }
    const sql = 'INSERT INTO todo_item_tag SET ?';
    this.dbConnection.query(sql, Data, function (err, results, fields) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, results);
    });
  }

  untagTodoItem(todoItemId, tagId, callback) {
    // Write code and query remove a tag from a TODO item
    const sql = 'DELETE FROM todo_item_tag WHERE todo_item_id = ? AND tag_id = ?'
    this.dbConnection.query(sql, [todoItemId, tagId], function (err, results, fields) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, results);
    });
  }

  markCompleted(todoItemId, callback) {
    // Write code to mark a TODO item as completed
    const sql = 'UPDATE todo_items SET is_completed = true WHERE id = ?'
    this.dbConnection.query(sql, [todoItemId], function (err, results, fields) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, results);
    });
  }
}

const command = process.argv[2];
const argument1 = process.argv[3];
const argument2 = process.argv[4];

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
      todoModel.create(argument1, argument2, function (err, todoItems) {
        if (err) {
          console.log('error creating a new todo-item', err);
        }

        console.log('existing todo items:', todoItems);
      });
      break;
    }
    case 'update': {
      todoModel.update(argument1, argument2, function (err, todoItems) {

        if (isNaN(argument1) || typeof argument2 === 'undefined') {
          console.log('Wrong input, check requirements by using command help');
        }
        if (err) {
          console.log('error updating todo-item', err);
        }


        console.log('existing todo items:', todoItems);
      });
      break;
    }
    case 'delete': {
      todoModel.delete(argument1, function (err, todoItems) {
        if (isNaN(argument1)) {
          console.log('Wrong input, check requirements by using command help')
        }
        if (err) {
          console.log('error deleting todo-item:', err);
        }


        console.log('existing todo items:', todoItems);
      });
      break;
    }
    case 'tag': {
      todoModel.tagTodoItem(argument1, argument2, function (err, todoItems) {
        if (isNaN(argument1) || isNaN(argument2)) {
          console.log('Wrong input, check requirements by using command help')
        }
        if (err) {
          console.log('error loading TODO items:', err);
        }


        console.log('existing todo items:', todoItems);
      });
      break;
    }
    case 'untag': {
      todoModel.untagTodoItem(argument1, argument2, function (err, todoItems) {
        if (isNaN(argument1) || isNaN(argument2)) {
          console.log('Wrong input, check requirements by using command help')
        }
        if (err) {

          console.log('error untaging todo-item', err);
        }


        console.log('existing todo items:', todoItems)
      });
      break;
    }
    case 'complete': {
      todoModel.markCompleted(argument1, function (err, todoItems) {
        if (typeof argument1 === 'undefined' || isNaN(argument1)) {
          console.log('Wrong input, check requirements by using command help')
        }
        if (err) {

          console.log('error loading TODO items:', err);
        }


        console.log('existing todo items:', todoItems);
      });
      break;
    }
    case 'help':
    default:
      {
        console.info(
          ` 
                  (command)                          (explanation)  
                  load                           shows the kist of existing tasks from database;
                  create 'text' user_id          to add a new task-item to the list, the first argument type is string, the second
                                                  is integer;
                  update todo_id 'New text'      to update a task-item that already exist in database. The argument type is string
                  delete todo_id                 to delete a task-item that already exist in database, the argument is integer
                  complete  todo_id              to mark task as completed ;
                  tag todo_id tag_id             add tag to the todo-item, the both arguments are integer;
                  untag todo_id  tag_id          to delete a tag from existing todo-item. Both arguments are integer`
        )
      }

  }

  dbConnection.end();
});
