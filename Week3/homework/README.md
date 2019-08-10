## **TODO API**

> < table > => users | todos | todo_lists | categories

#### **Basic Crud Operations**

| Request      | Endpoints          | Description        |
| ------------ | ------------------ | :----------------- |
| **`GET`**    | `/api/<table>`     | Get all items      |
| **`GET`**    | `/api/<table>/:id` | Get item by id     |
| **`POST`**   | `/api/<table>`     | Create single item |
| **`PUT`**    | `/api/<table>/:id` | Update item        |
| **`DELETE`** | `/api/<table>/:id` | Delete item by id  |

#### **Multiple Crud Operations**

| Request      | Endpoints                   | Description                                                                                                                     |
| ------------ | --------------------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| **`POST`**   | `/api/<table>/multiple`     | Create multiple users array<br>You must provide array with objects which contain custom properties                              |
| **`DELETE`** | `/api/<table>/multiple/:id` | Delete users by multiple ids<br>Id numbers must be seperated by `|`<br>For example: `DELETE` => `/api/todos/multiple/1 | 2 | 4` |


#### **Custom Operations**

| Request   | Endpoints                  | Description                       |
| --------- | -------------------------- | :-------------------------------- |
| **`GET`** | `/api/user/:id/todos`      | Get all todos of a user           |
| **`GET`** | `/api/user/:id/details`    | Get user detailed info by id      |
| **`GET`** | `/api/user/all/details`    | Get users detailed list           |
| **`PUT`** | `/api/todo-lists/:id/done` | Set todo item in the list as done |

#### **Seed Table With Fake Data**

| Request    | Endpoints              | Description           |
| ---------- | ---------------------- | :-------------------- |
| **`POST`** | `/api/users/fake`      | Create fake user      |
| **`POST`** | `/api/todos/fake`      | Create fake todo item |
| **`POST`** | `/api/categories/fake` | Create fake category  |

#### **Tables Post/Put Request Body**

| Table          | Request Body Model (application/json)                                               |
| -------------- | ----------------------------------------------------------------------------------- |
| **TODOS**      | ```{ "title", "description", "tag" }```                                             |
| **USERS**      | ```{ "name", "surname", "email" }```                                                |
| **CATEGORIES** | ```{ "title"}```                                                                    |
| **TODO_LISTS** | ```{ "user_id", "todo_id", "category_id", "is_done", "deadline", "remind_date" }``` |
