# Todo App

_Homework_

Design and finalize the ToDo App database. Be creative. Support multiple users.

- [ ] Create a node server to make Web APIs for ToDo app
- [ ] Support following functions:
- [ ] Insert item(s) in ToDo list
- [ ] Delete item(s) in ToDo list
- [ ] Create a new ToDo list
- [ ] Delete a ToDo list
- [ ] Mark an item as completed
- [ ] Add a reminder for the list (not for the itegetm)
- [ ] Write the necessary SQL statements/commands to maintain the state of the database.
- [ ] Use PostMan to test the APIs.

###** Modules:**

---

- express
- express-session
- express-validator
- cookie-parser

###** Todo App Routes:**

---

- [ ] /
- [ ]/user
  - [ ] /register
  - [ ] /login
  - [ ] /logout
- [ ]/list
  - [ ] /create
  - [ ] /delete
- [ ]/item
  - [ ] /create
  - [ ] /delete
  - [ ] /complete (uncomplete)

** Note:** In order to test by using Postman, Headers Content Type should be activated..

[========]

### http://localhost:3000/ `get`

"Please, login or register!"

### http://localhost:3000/user/register `post`

```json
{
  "name": "salih",
  "email": "salih@gmail.com",
  "password": "test123pass"
}
```

### http://localhost:3000/user/login `post`

```json
{
  "email": "salih@gmail.com",
  "password": "test123pass"
}
```

###http://localhost:3000/user/logout `get`

### http://localhost:3000/list/create `post`

```json
{
  "listName": "test list",
  "reminderDate": "2019-06-15 15:00:05"
}
```

### http://localhost:3000/list/delete `post`

```json
{
  "listId": 112,
  "listName": "test list"
}
```

###http://localhost:3000/item/create `post`

```json
{
  "listId": 112,
  "itemName": "this is my todo",
  "dueDate": "2019-06-15 16:00:00"
}
```

###http://localhost:3000/item/delete `post`

```json
{
  "itemId": 125,
  "listId": 112
}
```

###http://localhost:3000/item/complete `post`

```json
{
  "itemId": 125,
  "listId": 112
}
```
