# Databases Week3 Homework - Ammar Vehbi Merakli

## Raw body to be used in postman as JSON (application/json):

```
{
"user": "xxx",
"email": "xxx@gmail.com",
"todoListName": "xxx",
"reminder": "dd/mm/yyyy",
"todo": "xxx",
"done": "false",
"dueDate": "dd/mm/yyyy",
"tag": "xxx"
}
```

## Follow the steps to use functions properly:

1 - Use the dump file as source from mysql prompt to make your entire database ready to be used:
`source path/to/the/dump/file/ToDoApp_dump.sql`

2 - Run the application with the command `node index.js`

3 - You should run the functions by

    - selecting proper method

    - using proper url

    - inputting necessary information if needed at body in postman

## Functions:

**Users Part:**

    - To create a new user:
    `(POST) http://localhost:3001/ToDoApp/newUser`
    Accept: application/json
      {
        "user": "xxx", (varchar(50))
        "email": "xxx@gmail.com", (varchar(254))
      }

    - To update a user:
    `(PUT) http://localhost:3001/ToDoApp/user/:userId`
    Accept: application/json
      {
        "user": "xxx", (varchar(50))
        "email": "xxx@gmail.com", (varchar(254))
      }

    - To get all users:
    `(GET) http://localhost:3001/ToDoApp/allUsers`
    Accept: application/json

    To remove a user:
    `(DELETE) http://localhost:3001/ToDoApp/user/:userId`
    Accept: application/json

**Todo Lists Part:**

    - To create a new todo list:
    `(POST) http://localhost:3001/ToDoApp/:userId/newTodoList`
    Accept: application/json
      {
        "todoListName": "xxx", (varchar(50))
        "reminder": "dd/mm/yyyy", (datetime)
        "tag": "xxx" (varchar(50))
      }

    - To update a todo list:
    `(PUT) http://localhost:3001/ToDoApp/:userId/todoList/:todoListId`
    Accept: application/json
      {
        "todoListName": "xxx", (varchar(50))
        "reminder": "dd/mm/yyyy", (datetime)
        "tag": "xxx" (varchar(50))
      }

    - To retrieve todo lists belong to a certain user:
    `(GET) http://localhost:3001/ToDoApp/:userId/todoLists`
    Accept: application/json

    - To remove a todo list:
    `(DELETE) http://localhost:3001/ToDoApp/todoList/:todoListId`
    Accept: application/json

**Todos Part:**

    - To create a new todo:
    `(POST) http://localhost:3001/ToDoApp/:todoListId/newTodo`
    Accept: application/json
      {
        "todo": "xxx", (varchar(100))
        "dueDate": "dd/mm/yyyy", (datetime)
      }

    - To update a todo:
    `(PUT) http://localhost:3001/ToDoApp/:todoListId/todo/:todoId`
    Accept: application/json
      {
        "todo": "xxx", (varchar(100))
        "dueDate": "dd/mm/yyyy", (datetime)
      }

    - To retrieve todos belong to a certain todo list:
    `(GET) http://localhost:3001/ToDoApp/:todoListId/todos`
    Accept: application/json

    - To remove a todo:
    `(DELETE) http://localhost:3001/ToDoApp/:todoListId/todo/:todoId`
    Accept: application/json

    - To mark a todo as done:
    `(PUT) http://localhost:3001/ToDoApp/:todoListId/:todoId/done`
    Accept: application/json
