# Databases Week3 Homework Mohammad Naef Al Darwesh

## Raw body to be used in postman as JSON (application/json):

```
{
"user": "string",
"email": "valid email",
"todoListName": "string",
"reminder": "dd/mm/yyyy",
"todo": "string",
"done": "false",
"dueDate": "dd/mm/yyyy",
"tag": "word word"
}
```

## Follow the steps to use functions properly:

1 - Use the dump file as source from mysql prompt to make your entire database ready to be used:
`source path/to/the/dump/file/todoApp.sql`

2 - Run the application with the command `node index.js`

3 - You should run the functions by

    - selecting proper method

    - using proper url

    - inputting necessary information if needed at body in postman

## Functions:

**Users Part:**

    - To create a new user:
    `(POST) http://localhost:3010/todo/app/new/user/`

    Accept: application/json

{
"user": "string", (required)
"email": "valid email" (required)
}

    - To update a user:
    `(PUT) http://localhost:3010/todo/app/user/:userId`

Accept: application/json
{
"user": "string", (required)
"email": "valid email" (required)
}

    - To get all users:
    `(GET) http://localhost:3010/todo/app/all/users`


    To remove a user:
    `(DELETE) http://localhost:3010/todo/app/user/:userId`

**Todo Lists Part:**

    - To create a new todo list:
    `(POST) http://localhost:3010/todo/app/:userId/new/todo/list`
    Accept: application/json

{
"todoListName": "string", (required)
"reminder": "dd/mm/yyyy",
}

    - To update a todo list:
    `(PUT) http://localhost:3010/todo/app/:userId/todo/list/:todoListId`

Accept: application/json
{
"todoListName": "string", (required)
"reminder": "dd/mm/yyyy",
}

    - To retrieve todo lists belong to a certain user:
    `(GET) http://localhost:3010/todo/app/:userId/todo/lists`

    - To get all todo lists :
    `(GET) http://localhost:3010/todo/app/todo/lists`


    - To remove a todo list:
    `(DELETE) http://localhost:3010/todo/app/todo/list/:todoListId`

**Todos Part:**

    - To create a new todo:
    `(POST) http://localhost:3010/todo/app/:todoListId/new/todo`

Accept: application/json
{
"todo": "string", (required)
"done": "false or true",
"dueDate": "dd/mm/yyyy",
"tag": "word word"
}

    - To update a todo:
    `(PUT) http://localhost:3010/todo/app/:todoListId/todo/:todoId`

Accept: application/json
{
"todo": "string", (required)
"dueDate": "dd/mm/yyyy",
"tag": "word word"
}

    - To retrieve todos belong to a certain todo list:
    `(GET) http://localhost:3010/todo/app/:todoListId/todos`

    - To remove a todo:
    `(DELETE) http://localhost:3010/todo/app/:todoListId/todo/:todoId`

    - To mark a todo as Completed:
    `(PUT) http://localhost:3010/todo/app/:todoListId/:todoId/Completed`

```

```
