# To-Do API

### The server listens on the local port: 3000

### For these actions, the client must add the following header:

Content-Type: application/json

## Create a user (method: POST, route path: /users)

The request body must look like this:

{
"user": {
"firstName": "firstName",
"lastName": "lastName"
}
}
A unique Id will be automatically assigned to every new user.

## Create a list (method: POST, route path: /users/:userId)

The Id of the user is to be passed in the route path as indicated above

The request body must look like this:

{
"list": {
"name": "list's name"
}
}

A unique Id will be automatically assigned to every new list.

## Create a to-do item (method: POST, route path: /users/lists/:listId)

The Id of the list is to be passed in the route path as indicated above

The request body must look like this:

{
"item": {
"description": "Item's description"
}
}

A unique Id will be automatically assigned to every new item.

## Show all lists of a certain user (method: GET, route path: /users/:user_id)

The Id of the user is to be passed in the route path as indicated above

This request has no body needed

## Show all items of a certain list (method: GET, route path: /users/lists/:list_id)

The Id of the list is to be passed in the route path as indicated above

This request has no body needed

## Delete a list (method: DELETE, route path: /users/:user_id/:list_id)

The Id of the user and the Id of the list are to be passed in the route path as indicated above

This request has no body needed

## Delete an Item (method: DELETE, route path: /users/lists/:list_id/:item_id)

The Id of the list and the Id of the item are to be passed in the route path as indicated above

This request has no body needed

## Mark an item as completed (method: PUT, route path: /users/lists/items/:item_id)

The Id of the item is to be passed in the route path as indicated above

This request has no body needed

## Activate the reminder for a list (method: PUT, route path: /users/lists/:list_id/:time)

The list Id and the reminder time setting in milliseconds are to be passed in the route path as indicated above

This request has no body needed
