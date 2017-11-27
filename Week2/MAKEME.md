# Homework week 2

## Writing a model to communicate with the TODO database

Look at [todo_app/db.sql](./todo_app/db.sql) and use it to create a database. In
the [todo_app/program.js](./todo_app/program.js) file there's a little program
that should be able to extract TODOs from the database, update them, and delete
them. The `load` function already extracts all TODOs from the database. 

Run `npm install` inside the `todo_app` directory to download and install the MySQL
connector.

Try to understand what happens in this program. How is the database connection
created? How do we use the connection to query the database?

You'll find the following empty functions in the `program.js` file, please
implement them:

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

Until now we've always connected to the database as `root`. We don't want to
allow our TODO app access to other databases than the TODO app itself:

- Figure out how to create a new user in MySQL.
- Restrict the access for that user to only the `todo_app` database.
- Use the newly created user credentials (username, password) in the connector of
  the `program.js` file.