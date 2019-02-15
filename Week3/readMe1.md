# sql.js

it is the file that connect to the database server ,
and logically it has to be run first to ensure the existence of the tables
so you would be able to add information to it .

# query.js

this file content the proper sql syntax to interact with database.
I require the function from sql.js to create function in the query.js that can be used in server.js

# server.js

The name of the file suggest his functionality ,the file run on express module (node);

# how to oprate the todo app:

1- connect the sql.js to database by your choice then run the file in node to create the tables.
2- then run the server.js in terminal (node server.js) the server is listening on port 3000.
3- use post to addUser (`/addUser/:id`) and the id will be the user id also in the user table.
4- use post to addTodos (`/addTodos/:id`) to add todos like (studying)or (send email).
5- use post to addItem (`/addItem/:id`)
6- use post to addReminder (`/addReminder/:id`);
7- use put to updateItem (`/updateItem/:id`) no need to do anything just add the id of the item and will be updated automatically to done.
8- use delete to deleteTodos(`/deleteTodos/:id`) .
9-use delete to deleteItem(`/deleteItem/:id`).
