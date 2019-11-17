# Simplified API Usages

## User

### POST: /signup

Headers:
Content-Type: application/json

Request Body:
`{ "user": { "username" : "Adam" } }`

Success Response:
`{ "state": "Success", "operation": "signup", "message": "Successfully signed up.", "userId": 8 }`

### POST: /login

Headers:
Content-Type: application/json

Request Body:
`{ "user": { "username" : "Adam", "id": 8 } }`

Success Response:
`{ "state": "Success", "operation": "login", "message": "Successfully logged in." }`

### GET: /list

Headers:
username: "Adam"
userId: "8"

Success Response:
`{ "state": "Success", "operation": "getTodoLists", "message": "Successfully fetched the todo lists.", "data": [] }`

### POST: /list

Headers:
Content-Type: application/json

Request Body:
`{ "user": { "username" : "Adam", "id": 8 }, "todoList": { "name": "HYF", "description":"HYF related Todos" } }`

Success Response:
`{ "state": "Success", "operation": "createTodoList", "message": "Successfully created the list.", "listId": 1 }`

### DELETE: /list/:id

Headers:
Content-Type: application/json

Request Body:
`{ "user": { "username" : "Adam", "id": 8 } }`

Success Response:
`{ "state": "Success", "operation": "deleteTodoList", "message": "Successfully deleted the list." }`

### GET: /list/remind

Headers:
username: "Adam"
userId: "8"

Success Response:
`{ "state": "Success", "operation": "getReminders", "message": "Successfully fetched the todo lists with reminders.", "data": [] }`

### POST: /list/remind

Headers:
Content-Type: application/json

Request Body:
`{ "user": { "username": "Adam", "id": 8 }, "reminder": { "description": "HYF reminder", "remindingTime": "2019-12-17T03:51:40.411Z" }, "todoListId": 1 }`

Success Response:
`{ "state": "Success", "operation": "createReminder", "message": "Successfully added reminder to the list.", "reminderId": 1 }`

### DELETE: /list/remind/:id

Headers:
Content-Type: application/json

Request Body:
`{ "user": { "username": "Adam", "id": 8 } }`

Success Response:
`{ "state": "Success", "operation": "deleteReminder", "message": "Successfully deleted the reminder." }`

### GET: /list/:id

Headers:
username: "Adam"
userId: "8"

Success Response:
`{ "state": "Success", "operation": "getTodoItems", "message": "Successfully fetched the todo lists.", "data": [] }`

### POST: /list/item

Headers:
Content-Type: application/json

Request Body:
`{ "user": { "username": "Adam", "id": 8 }, "todoItem": { "description": "HYF todo item" }, "todoListId": 1 }`

Success Response:
`{ "state": "Success", "operation": "createTodoItem", "message": "Successfully added item to the list.", "itemId": 1 }`

### DELETE: /list/item/:id

Headers:
Content-Type: application/json

Request Body:
`{ "user": { "username": "Adam", "id": 8 } }`

Success Response:
`{ "state": "Success", "operation": "deleteTodoItem", "message": "Successfully deleted the item." }`

### GET: /tag

Headers:
username: "Adam"
userId: "8"

Success Response:
`{ "state": "Success", "operation": "getTags", "message": "Successfully fetched the tags.", "data": [ { "id": 1, "name": "urgent", "description": "Needs to be done in at most a week", "color": "ff0000" }, { "id": 2, "name": "course", "description": "Item is related to a course", "color": "222222" }, { "id": 3, "name": "longrunner", "description": "Item is not a short time doing. It takes time to done it.", "color": "ffddaa" }, { "id": 4, "name": "shopping", "description": "Item needs to be bought from a seller.", "color": "99aa22" } ] }`

### POST: /tag

Headers:
Content-Type: application/json

Request Body:
`{ "user": { "username": "Adam", "id": 8 }, "tag": { "name": "HYF 1", "description": "HYF tag 1", "color" : "445566" } }`

Success Response:
`{ "state": "Success", "operation": "createTag", "message": "Successfully created a new tag.", "tagId": 5 }`

### POST: /list/item/:todoItemId/tag/:tagId

Headers:
Content-Type: application/json

Request Body:
`{ "user": { "username": "Adam", "id": 8 } }`

Success Response:
`{ "state": "Success", "operation": "attachTagToTodoItem", "message": "Successfully added tag to the todo item." }`

### DELETE: /list/item/:todoItemId/tag/:tagId

Headers:
Content-Type: application/json

Request Body:
`{ "user": { "username": "Adam", "id": 8 } }`

Success Response:
`{ "state": "Success", "operation": "removeTagFromTodoItem", "message": "Successfully removed tag from the todo item." }`

### POST: /list/item/:id/complete

Headers:
Content-Type: application/json

Request Body:
`{ "user": { "username": "Adam", "id": 8 } }`

Success Response:
`{ "state": "Success", "operation": "markAsCompleted", "message": "Successfully updated todo item as completed.", "updatedItemId": 1 }`

### DELETE: /list/item/:id/complete

Headers:
Content-Type: application/json

Request Body:
`{ "user": { "username": "Adam", "id": 8 } }`

Success Response:
`{ "state": "Success", "operation": "markAsNotCompleted", "message": "Successfully updated todo item as not completed.", "updatedItemId": 1 }`
