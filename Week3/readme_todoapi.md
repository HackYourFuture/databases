TODO API

General Information
-Run todoapp_dump_file.sql to built database named todoapp
-Run npm install to install dependencies which are listed in package.json file
-Run project with "node ." command in the terminal
-You can use postman to test the api

Functions of API

1- Add a new list:
To add a new list use POST method with this address: localhost:3000/addList
Send a json file in a request body as in example,
"name" as name of the list, "user" as userid of the user:
{
"name": 'firstlist',
"user": 1
}

2- Delete a list:
To delete a list use DELETE method with this address: localhost:3000/deleteList/:id
id is the id of list i.e.: localhost:3000/deleteList/6

3- Show todo list:
To get the contents of a todo list use GET method with this address: localhost:3000/todoLists/:id
id is the id of list i.e.: localhost:3000/todoLists/2

4- Add a todo item:
To add a todo use POST method with this address: localhost:3000/:listId/addTodo
listId is the id of the list i.e.: localhost:3000/3/addTodo
Send a json file in a request body as in example,
"name" as name of the todo item, "iscompleted" as 'true' or 'false':

{
"name": 'firsttodoitem',
"iscompleted": 'false',
}

5- Delete a todo item:
To delete a todo item use DELETE method with this address: localhost:3000/:listId/deleteTodo/:id
listId is the id of the list and :id is the id of the todo item to be deleted 
i.e.: localhost:3000/1/deleteTodo/3

6- Show todo items of a todo list:
To get todo items of a todo list use GET method with this address: localhost:3000/:listId/getTodo
listId is the id of list i.e.: localhost:3000/2/getTodo

7- Mark a todo item as completed:
To mark a todo item as completed use PUT method with this address: http://localhost:3000/:listId/markAs/:id
listId is the id of the list and :id is the id of the todo item to be marked as completed

8- Add reminder to a list:
To add reminder to a list use POST method with this url: http://localhost:3000/:listId/reminder
listId is the id of the list
Send a json file in a request body as in example,
"date" as reminder date in datetime format:

{
"date": '2019-06-26 12:00:00',
}
