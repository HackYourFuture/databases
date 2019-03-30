# To-Do REST API Manual

You can create database with dump.sql file.

You can trigger server from Week3 folder by 'node .' command.

Then you must switch to localhost:3000 from POSTMAN

## Supported Functions

Each function must be tested by its own method and endpoint.

### Create User

- POST /username/password

### Create To-Do List

- POST /username/password/listDescription

### Add Remainder To List

Small Note: First remainder is fixed. Second one is variable that you want to put in.

- PATCH /username/password/listDescription/remainder/remainder

### Create To-DO Item

- POST /username/password/listDescription/toDoDescription

### Mark Item As Completed

- PATCH /username/password/listDescription/toDoDescription

### Delete User

- DELETE /username/password

### Delete To-Do List

- DELETE /username/password/listDescription

### Delete To-Do Item

- DELETE /username/password/listDescription/toDoDescription
