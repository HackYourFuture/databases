// This is the connector (also known as driver)
// that we can use to connect to a MySQL process
// and access its databases.
const mysql = require('mysql');

function errorHandler(err, itemsToConsole) {
  if (err) {
    console.log("error loading TODO items:", err);
  }

  console.log("existing todo items:", itemsToConsole);
}
function errorResultsFieldsHandler(err, results, fields) {
  if (err) {
    errorHandler(err);
    return;
  }

  errorHandler(null, results);
}

class TodoModel {
  constructor(dbConnection) {
    this.dbConnection = dbConnection;
  }

  // Loads all the TODOs in the database
  load(callback = Function || errorHandler) {
    const selectTodoItems = "SELECT * FROM todo_items";
    this.dbConnection.query(selectTodoItems, errorResultsFieldsHandler);
  }

  create(description = { user_id: Number, text: String }, callback = Function || errorHandler) {
    // Write code and query to create a new TODO item

    let items = Object.values(description).map(item => { // mapping through the description making the (items = values) into an array
      return item;
    });

    if (typeof items[1] === "number") { // checking some of the order
      items.unshift(items.pop());
    }
    const creatingTodoItem = "INSERT INTO todo_items (user_id, text) VALUES (?)";

    this.dbConnection.query(creatingTodoItem, [items], errorResultsFieldsHandler);
  }

  update(id = Number, description = String, callback = Function || errorHandler) {
    // Write code and query to update and existing TODO item
    const updatingTodoItem = `UPDATE todo_items SET text = ? WHERE id = ${id}`;

    this.dbConnection.query(updatingTodoItem, description, errorResultsFieldsHandler);

  }

  delete(id = Number, callback = Function || errorHandler) {
    // Write code and query to delete an existing TODO item
    const deletingTodoItem = 'DELETE FROM todo_items WHERE id = ?';

    this.dbConnection.query(deletingTodoItem, id, theUsualFunction);
  }

  tagTodoItem(todoItemId = Number, tagId = Number, tagDescription = String, callback = Function || errorHandler) {
    // Write code and query add a tag to a TODO item
    //   inserting a new tag
    //   tagging a todo_item inside the (tag) table with the new tag id

    const insertingNewTag = 'INSERT INTO tags (description, id) VALUES (?)';
    
    this.dbConnection.query(insertingNewTag, [[tagDescription, tagId]], errorResultsFieldsHandler);
    
    const taggingTodoitem = 'INSERT INTO todo_item_tag (todo_item_id, tag_id) VALUES (?)';

    this.dbConnection.query(taggingTodoitem, [[todoItemId, tagId]], errorResultsFieldsHandler);

  }

  untagTodoItem(todoItemId = Number, tagId = Number, callback = Function || errorHandler) {
    // Write code and query remove a tag from a TODO item
    //   removing the tag from todo_item_tag
    
    const deletingTagTodoItem = `DELETE FROM todo_item_tag WHERE todo_item_id = ${todoItemId} AND tag_id = ${tagId}`;

    this.dbConnection.query(deletingTagTodoItem, errorResultsFieldsHandler);

  }

  markCompleted(todoItemId = Number, callback = Function || errorHandler) {
    // Write code to mark a TODO item as completed

    const updatingAsComplete = 'UPDATE todo_items SET is_completed = 1 WHERE id = ?';

    this.dbConnection.query(updatingAsComplete, [todoItemId], errorResultsFieldsHandler);
    
  }
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
  
  // todoModel.load(errorHandler);

  // todoModel.create({ text: "Banana", user_id: 2 }, errorHandler);

  // todoModel.tagTodoItem(43,6,"alot things", errorHandler);
  
  // todoModel.untagTodoItem(43,6, errorHandler);
  
  // todoModel.markCompleted(43, errorHandler);

});