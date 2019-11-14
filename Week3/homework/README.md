# Web APIs for ToDo app

This is my homework for database week3.

## INTRO

By using this app you will be able to:

- Create / update / get user or users.
- Create / update / delete Todo lists.
- Create / update / delete Todo item.
- Add a reminder for the list.
- Mark an item as completed.

## Tech

Todo app uses the following:

- [Node.js](https://nodejs.org/)
- [Postman](https://www.getpostman.com/) for testing and updating.
- MySQL locale server.

## Testing

Assuming that you have cloned the repository of this project and installed the dump file: **rabie_todo_app.sql** to your database and you are ready to the next step.

**Run Postman program on your computer to test the app.**

### 1 - Users:

**Create user:**

- HTTP method: `POST`.
- Endpoint: `localhost:3000/create/user`
- Request body RAW / JSON :
  ```
  {
    "user_id": 1,
    "user_name": "My Name"
  }
  ```

**Update user:**

- HTTP method: `PUT`.
- Endpoint: `localhost:3000/users/:id`
- Request body RAW / JSON:
  ```
  {
    "user_id": 1,
    "user_name": "My NEW Name"
  }
  ```

**Get user/users:**

- HTTP method: `GET`.
- Endpoint for single user: `localhost:3000/users/:id`
- Endpoint for all users: `localhost:3000/users`

### 2 - Todo list:

**Create Todo list:**

- HTTP method: `POST`.
- Endpoint: `localhost:3000/create/todolist`
- Request body RAW / JSON:
  ```
  {
    "todolist_id": 3,
    "name": "Name",
    "reminder": "2019-11-17 00:00.0.0",
    "user_id": 1
  }
  ```

**Update Todo list:**

- HTTP method: `PUT`.
- Endpoint: `localhost:3000/todolist/:id`
- Request body RAW / JSON:
  ```
  {
    "todolist_id": 3,
    "name": " Another name",
    "reminder": "2019-11-20 00:00.0.0",
    "user_id": 1
  }
  ```

**Delete Todo list:**

- HTTP method: `DELETE`.
- Endpoint: `localhost:3000/todolist/:id`

**Get Todo list:**

- HTTP method: `GET`.
- Endpoint for single todo list: `localhost:3000/todolist/:id`
- Endpoint for all todo list: `localhost:3000/todolist`

### 3 - Todo Item:

**Create Todo item:**

- HTTP method: `POST`.
- Endpoint: `localhost:3000/create/todo`
- Request body RAW / JSON:
  ```
  {
    "todo_id": 1,
    "todo_name": "Todo name",
    "end_date": "2019-10-17 00:00.0.0",
    "tag": "React",
    "done": false,
    "todolist_id": 1
  }
  ```

**Update Todo item:**

- HTTP method: `PUT`.
- Endpoint: `localhost:3000/todo/:id`
- Request body RAW / JSON:
  ```
  {
    "todo_id": 1,
    "todo_name": "Another todo name",
    "end_date": "2019-11-20 00:00.0.0",
    "tag": "React",
    "done": false,
    "todolist_id": 1
  }
  ```

**Delete Todo item:**

- HTTP method: `DELETE`.
- Endpoint: `localhost:3000/todo/:id`

**Get Todos:**

- HTTP method: `GET`.
- Endpoint: `localhost:3000/todo/:id`

**MArk as done:**

- HTTP method: `PUT`.
- Endpoint: `localhost:3000/todo/:id`
- Request body RAW / JSON:
  ```
  {"todo_id": 1 }
  ```

**Add reminder:**

- HTTP method: `PATCH`.
- Endpoint: `localhost:3000/reminder/:id`
- Request body RAW / JSON:
  ```
  { "reminder": "2019-10-17 00:00.0.0" }
  ```

That's all. I hope this app passes the test successfully
