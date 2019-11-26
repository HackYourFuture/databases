**_HOW WORKS APP_**

1- You have to use index.js file with the "npm run start" code.
2- You have to use Postman app.

- TABLES

users - todoList - todoItems

- TABLES REQUEST BODY

You have to use this columns in the Postman app.

- users -------: { user_name, email, gender }
- todoList ----: { todo_name, start_date, expire_date, user_id }
- todoItems ---: { description, is_done, user_id, todo_id }

- OPERATIONS

| request | endpoint         | description                           |
| ------- | ---------------- | ------------------------------------- |
| POST    | /user            | Creates a new user.                   |
| GET     | /user            | Shows all users.                      |
| GET     | /user/:id        | Shows specific user by id.            |
| PUT     | /user/:id        | Updates specific user by id.          |
| DELETE  | /user/:id        | Deletes specific user by id.          |
| POST    | /todos           | Creates a new todo.                   |
| GET     | /todos           | Shows all todo list.                  |
| GET     | /todos/:id       | Shows specific todo by id.            |
| GET     | /todos/items/:id | Shows items from specific todo by id. |
| PUT     | /todos/:id       | Updates specific user by id.          |
| DELETE  | /todos/:id       | Deletes specific user by id.          |
| POST    | /items           | Creates a new item in todo list.      |
| GET     | /items           | Shows all items.                      |
| GET     | /items/:id       | Shows specific item by id.            |
| PUT     | /items/:id       | Updates specific item by id.          |
| DELETE  | /items/:id       | Deletes specific item by id.          |
