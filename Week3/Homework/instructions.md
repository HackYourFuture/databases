# Databases Week3 Homework

## The instructions to use todo list app:

### 1- Add a new user (method: POST, path: localhost:3001/users)

Example of input data:

{

"firstName": "new user",

"lastName": "new user"

}

### 2- Add a new list for user (method: POST, path: localhost:3001/users/:userId)

You have to enter user id in the route path.

Example of input data:

{

"name": "new list"

}

### 3- Add an item to the list (method: POST, path: localhost:3001/users/lists/:listId)

You have to enter list id in the route path.

Example of input data:

{

"item": "new item"

}


### 4- Mark an item as completed (method: PUT, path: localhost:3001/users/lists/items/:item_id)

You have to enter item id in the route path.


### 5- Add a reminder for a list (method: PUT, path: localhost:3001/users/lists/:list_id/:time)

You have to enter list id and the time in the route path.

Example of input data:  localhost:3001/users/lists/1/5000

{{ note: 5000 = 5 seconds }}


### 6- Delete an Item (method: DELETE, path: localhost:3001/users/lists/:list_id/:item_id)

You have to enter list id and item id in the route path.


### 7- Display all information of a user (method: GET, path: localhost:3001/users/:user_id)

You have to enter user id in the route path.
