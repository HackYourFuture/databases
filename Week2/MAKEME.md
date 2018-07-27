# Homework week 2

## Writing a model to communicate with the TODO database

1. Open [todo_app/db.sql](./todo_app/db.sql) and look at it. 
 
2. In the [todo_app/program.js](./todo_app/program.js) file there's a little program
that should be able to extract TODOs from the database, update them, and delete
them. The `load` function already extracts all TODOs from the database.  
Use [todo_app/db.sql](./todo_app/db.sql) to create the database.

3. Run `npm install` inside the `todo_app` directory to download and install the MySQL
connector.

4. Investigate what happens in this program. How is the database connection
created? How do we use the connection to query the database?

5. Implement the usage of the database in your JavaScript program. 
In the `program.js` file you will find the following empty functions, please implement them:

*Read how to [use and escape query values](https://github.com/mysqljs/mysql#escaping-query-values)*

```js
class TodoModel {

    // ...

    create(description, callback) {
        // Write code and query to create a new TODO item
    }

    update(id, description, callback) {
        // Write code and query to update and existing TODO item
    }

    delete(id, callback) {
        // Write code and query to delete an existing TODO item
    }

    tagTodoItem(todoItemId, tagId, callback) {
        // Write code and query add a tag to a TODO item
    }
        
    untagTodoItem(todoItemId, tagId, callback) {
        // Write code and query remove a tag from a TODO item
    }

    markCompleted(todoItemId, callback) {
        // Write code to mark a TODO item as completed
    }
}
```

# Adding a new database user

Until now we've always connected to the database as `root` (make sure you know what a `root` user is for a database). 
We don't want to allow our TODO app access to other databases than the TODO app itself:

1. Figure out how to create a new user in MySQL.
2. Restrict the access for that user to only the `todo_app` database.
3. Use the newly created user credentials (username, password) in the connector of
  the `program.js` file.
