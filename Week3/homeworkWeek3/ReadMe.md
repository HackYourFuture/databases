* async_create_tables.js:

This file is created to set up the cofiguration of (mysql)
 to start the connection, include create tables and the required packages.

* queries.js:

Here where the second part comes of (mysql) to start inserting values
and executing queries.

* server.js:

This file making use of node module & express package and connect to the server.

* How it works?

1_ Make sure that the database is created.
2_ Run server.js file in terminal (node server.js/ node .).
3_ Run (Postman) on your PC and use the following steps:
   _To show the tables: use get ('/tables').
   _To create a user: use Post ('/createuser').
   _To create a todo: use post ('/createtodo').
   _To create an item: use Post ('/createitem').
   _To delete an item: use Delete ('/deleteitem/:id').
   _To delete a todo: use Delete ('/deletetodo/:id').
   _To create a reminder: use post ('/createreminder').

###  ###   ###   ###   ###   ###   ###   ###    ###