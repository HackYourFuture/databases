# TODO API using Node.js Express Mysql and Knex

## Installation

Clone repository

`git clone https://github.com/oguzhanturgut/todo-api.git`

In repository folder seed the database using admin credentials

`mysql -u <username> -p < todo.sql`

Start server: Server will be listening on port 3000

`npm start`

**! Do not forget to change database login credentials in `helpers.js` !**

## Usage

### *`/user` endpoint*

| **Request**               | **Description**                 | **Body**                                                                            | **Details**                  |
| ------------------------- | ------------------------------- | ----------------------------------------------------------------------------------- | ---------------------------- |
| `GET /user`               | Get all user information        |                                                                                     |                              |
| `GET /user/:userid`       | Get user information by user id |                                                                                     |                              |
| `POST /user`              | Create new user                 | `{`<br/>`"username": "John Doe",`<br/>`"email": "johndoe@example.com"`<br/>`}`      | username, email(required)    |
| `DELETE /user/:userid`    | Delete user by user id          |                                                                                     |                              |
| `GET /user/:userid/list`  | Get lists of a user by user id  |                                                                                     |                              |
| `POST /user/:userid/list` | Create new list for a user      | `{`<br/>`"listname": "Shopping List",`<br/>`"alert": "2019-10-01 12:00:00"`<br/>`}` | Set reminder alert(optional) |

---------------

### *`/list` endpoint*

| **Request**                              | **Description**                      | **Body**                                                         | **Details**                             |
| ---------------------------------------- | ------------------------------------ | ---------------------------------------------------------------- | --------------------------------------- |
| `GET /list/:listid`                      | Get a list by list id                |                                                                  |                                         |
| `DELETE /list/:listid`                   | Delete a list by listid              |                                                                  |                                         |
| `GET /list/:listid/todo`                 | Get all Todos of a list by listid    |                                                                  |                                         |
| `GET /list/:listid/todo/:todoid`         | Get Todo by todoid                   |                                                                  |                                         |
| `POST /list/:listid/todo`                | Add new Todo to a list by list id    | `{`<br/>`"note": "Buy milk",`<br/>`"tags": "food,daily"`<br/>`}` | add multiple tags using comma(optional) |
| `DELETE /list/:listid/todo/:todoid`      | Delete a Todo by todo id             |                                                                  |                                         |
| `POST /list/:listid/todo/:todoid/done`   | Mark Todo as done by todo id         |                                                                  |                                         |
| `DELETE /list/:listid/todo/:todoid/done` | Mark Todo as **not** done by todo id |                                                                  |                                         |

---------------

### *`/tag` endpoint*

| **Request**         | **Description**      | **Body** | **Details** |
| ------------------- | -------------------- | -------- | ----------- |
| `GET /tag/:tagname` | Get all Todos by tag |          |             |