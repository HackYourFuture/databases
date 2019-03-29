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

    - To create a new user (POST):
    `http://localhost:3001/ToDoApp/createNewUser`

    - To update a user (PUT):
    `http://localhost:3001/ToDoApp/updateUser/:userId`

    - To get all users (GET):
    `http://localhost:3001/ToDoApp/getAllUsers`

    To remove a user (DELETE):
    `http://localhost:3001/ToDoApp/removeUser/:userId`

**Todo Lists Part:**

    - To create a new todo list (POST):
    `http://localhost:3001/ToDoApp/:userId/createNewTodoList`

    - To update a todo list (PUT):
    `http://localhost:3001/ToDoApp/:userId/updateTodoList/:todoListId`

    - To retrieve todo lists belong to a certain user (GET):
    `http://localhost:3001/ToDoApp/:userId/getTodoLists`

    - To remove a todo list (DELETE):
    `http://localhost:3001/ToDoApp/removeTodoList/:todoListId`

**Todos Part:**

    - To create a new todo (POST):
    `http://localhost:3001/ToDoApp/:todoListId/createNewTodo`

    - To update a todo (PUT):
    `http://localhost:3001/ToDoApp/:todoListId/updateTodo/:todoId`

    - To retrieve todos belong to a certain todo list (GET):
    `http://localhost:3001/ToDoApp/:todoListId/getTodos`

    - To remove a todo (DELETE):
    `http://localhost:3001/ToDoApp/:todoListId/removeTodo/:todoId`

    - To mark a todo as done (PUT):
    `http://localhost:3001/ToDoApp/:todoListId/:todoId/done`
