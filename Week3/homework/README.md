# Databases: Week3 Homework (Read Me File)

---

---

## Kindly follow the tips to RUN the app:

---

1 - Source the dump file:
`source path/to/the/dump/file/ToDoApp_dump.sql`.

2 - Install the npm & the dependencies.

3 - Run the application with the command `nodemon .`.

---

## Kindly follow the tips to TEST the app:

---

Using Postman:
-Set the headers in the body to JSON/application.
-Select the proper method with the proper url as per the following.

1. To add a new user:
   POST (http://localhost:3000/users/) AND in the body input {"new_user": "the user name desired"}

2. To add a new list:
   POST (http://localhost:3000/lists/) AND in the body input {"new_list": "the list name desired"}

3. To add a new todo:
   POST (http://localhost:3000/todos/) AND in the body input {"new_todo": "the todo name desired"}

4. To delete a user:
   DELETE (http://localhost:3000/users/:user_id).

5. To delete a list:
   DELETE (http://localhost:3000/lists/:list_id).

6. To delete a todo:
   DELETE (http://localhost:3000/todos/:todo_id).

7. To turn a todo to completed:
   PUT (http://localhost:3000/todos/:todo_id).

8. To add a reminder to a specific todo:
   PUT (http://localhost:3000/todos/:todo_id) AND in the body input {"new_reminder": "the reminder desired"}

THANKS FOR READING...
