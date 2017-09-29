> Please help us improve and share your feedback! If you find better tutorials or links, please share them by opening a Pull Request.

# HackYourFuture Databases - week 2

# Run
 start `mysql` server in terminal. Create a database for your **TODO** app.
 ```
 CREATE DATABASE hyf_todo;

 GRANT ALL PRIVILEGES ON hyf_todo.* TO <YOURNAME>@localhost IDENTIFIED BY "<YOURPASSWORD>";

 FLUSH PRIVILEGES;
 ```
mysql server does not need to be running on the background, but you can keep it up to help you debug.

Then simply run:
```
npm install
npm start
```

### Assignment for this weak:

- Read through the code, make sure you understand the flow of the program
- Add three more actions
    - `clear` (`DELETE /todos`) which will clear the list of todos
    - `markAsDone` (`POST /todos/:id/done`) which will set the `done` flag of a single todo to `true`
    - `markAsNotDone` (`DELETE /todos/:id/done`) which will set the `done` flag of a single todo to `false`
- Update your README to reflect your new actions!

Take care of the following:

- All requests that need a body should be in JSON, and follow the request structure of the other actions
- All responses should be in JSON, and follow the response structure of the other actions
- Follow the anatomy of the project
- Make your code DRY (see https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)
- Follow the REST design principles: use the proper method, response status codes, and consistent URL paths
- Test your API using Postman
