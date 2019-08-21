## Homework Week3 Readme

---

### Please follow the instructions below to use the app with Postman:

#### Use Raw Body in Postman as JSON (application/json):

#### {

"id": x,

"name": "xxx",

"email": "xxx@gmail.com",

"date": "yy-mm-dd 00:00:00",

"tag": "xxx",

"done": "xxx",

"reminder": "yy-mm-dd 00:00:00",

}

1. Use the dump file to access database. The dump file can be accessed through its source.

2. Run the application with the 'node index.js' command.

- To create a new user:
  `(POST) http://localhost:5000/create/user`
  Accept: application/json
  {

      "id": x,

      "name": "xxx",

      "email": "xxx"

  }

- To get users:

  `(GET) http://localhost:5000/users`

- To get a single user:

  `(GET) http://localhost:5000/users/:id`

- To update a user:

  `(PUT) http://localhost:5000/users/:id`

  {

  "id": x,

  "name": "xxx"

  }

- To create a todo item:

  `(POST) http://localhost:5000/create/todo`

  {

  "id": x,

  "name": "xxx",

  "date": "yy-mm-dd 00:00:00",

  "tag": "xxx",

  "done": "xxx",

  "todolist_id": "x"

  }

- To delete a todo item:

  `(DELETE) http://localhost:5000/todo/:id`

- Mark a todo item as done:

  `(PUT) http://localhost:5000/todo/:id`

- To create a todolist:

  `(POST) http://localhost:5000/create/todolist`
  {
  "id": x,

  "name": "xxx",

  "reminder": "yy-mm-dd 00:00:00"

  "id": x

}

- To delete a todolist:

  `(DELETE) http://localhost:5000/todolist/:id`

- To add a reminder:

  `(PUT) http://localhost:5000/reminder/:id`
