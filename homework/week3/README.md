Welcome to TODO api

-First of All run todo_dump_file.sql to built database schema and add some records in it
-run npm install to install dependencies (dir: homework > week3)
-run project with node . command in the terminal
-you can use postman to test the api
-home folder is localhost:3000

-Add a new list:
to add new list use POST method and this URL: http://localhost:3000/ebrown/addList
ebrown is a user already added manually to test the api, for now api does not support add/delete use but you can add manually to database

Delete a list:
to delete a list use DELETE method with this url: /user/deleteList/id
id is the id of list i.e.: localhost/ebrown/deleteList/5

you can also soft delete a list, that is you can keep the list but mark it as DELETED
to soft delete use PUT method with this url: /user
supply id and status with a json file in the body i.e.: localhost/ebrown/
{
"id": 5,
"status":"DELETED"
}

Add a TODO:
to add a todo use POST method with this url: /user/list/addTodo
user is the user name list is the list id i.e ebrown/5
supply a json file in the body i.e :
{
"name": "get up",
"description":"get up at 7.00"
}

Delete a TODO:
to delete a TODO use DELETE method with this url: /user/list/id
id is the id of list i.e.: localhost/ebrown/delete/5

you can also soft delete a list, that is you can keep the list but mark it as DELETED
to soft delete use PUT method with this url: /user
supply id and status with a json file in the body i.e.: localhost/ebrown/
{
"id": 5,
"status":"DELETED"
}
