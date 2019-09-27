# Todo App - NodeJs & MySql (Async CRUD Operations)

## 1- Open the "Command Prompt" terminal.

```
- Run the "git clone [https://github.com/Mehmet-Ergorgec/database/week3]" command.
- Run the "cd try" and then the "npm install" commands.
- Run the "npm start" command.
```

### Database Dump

- Applying the dump from mysql command prompt `source /path/to/the/dump/file`
- Applying the dump from the terminal `mysql -uroot -p [database] < /path/to/the/dump/file`

## 2- Project structure

```
  root
  |
  |__Helpers
  |    |__error.js
  |
  |___Routes
  |    |__list.js
  |    |__listItem.js
  |    |__users.js
  |
  |__connection.js
  |__queries.js
  |__server.js
  |__todoapp.sql

```

- **Helpers** : includes handling errors.
- **Routes** : includes all endpoints data.
- **connection.js** : includes MySql connection details.
- **queries.js**: includes all queries used in Routes folder.
- **server.js**: includes NodeJs server details.
- **todoapp.sql** : includes dump file.

## 3 - Testing

### Using POSTMAN

#### a- Users

- **GET** `localhost:3000/users`

  Get all users.

- **GET** `localhost:3000/users/:id`

  Get specific user by user`s id.

- **POST** `localhost:3000/users`
  Insert user into the users.

  ```
  [
      {
  	"username":"example",
  	"email":"example@example.com"
      }
  ]
  ```

- **DELETE** `localhost:3000/users/:id`

  Delete specific user by user`s id.

- **PUT** `localhost:3000/users/:id`


    Change user`s details by user ids.

     ```
    [
        {
    	"username":"example",
    	"email":"example@example.com"
        }
    ]
    ```

#### b- List

- **GET** `localhost:3000/list`

  Get all lists.

- **POST** `localhost:3000/list/:id`

  Insert a list with user id into the lists.

  ```
  [
      {
  	"listname":"example"
      }
  ]
  ```

- **DELETE** `localhost:3000/list/:id`

  Delete specific list by it`s id.

- **PUT** `localhost:3000/list/:id`


    Update a specific list`s reminder by its id.(which is default NULL)

     ```
    [
        {
    	"reminder":"2019-12-30"
        }
    ]
    ```

    #### c-Items

- **GET** `localhost:3000/listItem`

  Get all items.

- **POST** `localhost:3000/listItem/:id`

  Insert an item with list id into the specific list.

  ```
  [{
  "item_header":"Lesson Preparation List",
  "item_body":"Read curriculum"
    }
  ]
  ```

- **DELETE** `localhost:3000/listItem/:id`

  Delete specific listItem(s) by listItem_id.
  If You want to to delete more than one item: `localhost:3000/list/id,id,id...`

- **PUT** `localhost:3000/listItem/:id`


    Update done flag to the spesific item. (default False)

    [{
    "done": "T"
       }
    ]
