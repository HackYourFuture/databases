Homework Week3 Readme

Please follow the instructions below to use the app with Postman:

Use Raw Body in Postman as JSON (application/json):

To create a new user:

(POST) http://localhost:5000/create/user => application/json

{
"name": "xxx"
}

To get users:

(GET) http://localhost:5000/users

To get a single user:

(GET) http://localhost:5000/users/:id

To update a user:

(PUT) http://localhost:5000/users/:id

{
"name": "xxx"
}

To create a todolist:

(POST) http://localhost:5000/create/todolist

{
"todolist_id": "x"
"name": "xxx",
"tag": "xxx",
"reminder": "yy-mm-dd 00:00:00",
"done": "xxx",
}

To delete a todolist:

(DELETE) http://localhost:5000/todolist/:id

To create a todo item:

(POST) http://localhost:5000/create/todo

{
"todolist_id": "x",
"name": "xxx",
"tag": "xxx",
"reminder": "yy-mm-dd 00:00:00",
"done": "xxx"
}

To delete a todo item:

(DELETE) http://localhost:5000/todo/:id

Mark a todo item as done:

(PUT) http://localhost:5000/todo/:id
