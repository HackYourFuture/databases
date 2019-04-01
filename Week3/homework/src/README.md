# To-Do REST API Manual

You can create database with dump.sql file.

You can trigger server from Week3 folder by 'node .' command.

Then you must switch to localhost:3000 from POSTMAN

## Supported Functions

Each function must be tested by its own method and endpoint.

### Create User

- POST /username/password

- username must be string(max. 20 char)
- password must be string(max. 20 char)

### Create To-Do List

- POST /username/password/listDescription

- listDescription must be string(max. 50 char).

### Add Remainder To List

Small Note: First remainder is fixed. Second one is variable that you want to put in.

- PATCH /username/password/listDescription/remainder/remainder

- remainder must be in 'CCYY-MM-DD hh:mm:ss' format.

### Create To-DO Item

- POST /username/password/listDescription/toDoDescription

- toDoDescription must be a string(max. 50 char).

### Mark Item As Completed

- PATCH /username/password/listDescription/toDoDescription

- toDoDescription must be a string(max. 50 char).

### Delete User

- DELETE /username/password

- username must be string(max. 20 char)
- password must be string(max. 20 char)

### Delete To-Do List

- DELETE /username/password/listDescription

- listDescription must be string(max. 50 char).

### Delete To-Do Item

- DELETE /username/password/listDescription/toDoDescription

- toDoDescription must be a string(max. 50 char).
