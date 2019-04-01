Welcome to TODO api

-First of All run todo_dump_file.sql to built database schema and add some records in it
-run npm install to install dependencies (dir: homework > week3)
-run project with node . command in the terminal
-you can use postman to test the api
-home folder is localhost:3000

-Add a new list:
to add new list use POST method and this URL: http://localhost:3000/ebrown/addList
ebrown is a user already added manually to test the api, for now api does not support add/delete user but you can add manually to database

Delete a list:
to delete a list use DELETE method with this url: http://localhost:3000/user/deleteList/id
id is the id of list i.e.: localhost:3000/ebrown/deleteList/5

you can also soft delete a list, that is you can keep the list but mark it as DELETED
to soft delete use PUT method with this url: http://localhost:3000/user and
supply id and status within a json file int the request body i.e.: http://localhost:3000/ebrown/
{
"id": 5,
"status":"DELETED"
}

Add a TODO:
to add a todo use POST method with this url: http://localhost:3000/user/list_id/addTodo
user is the user name list is the list id i.e http://localhost:3000/ebrown/7/addTodo
supply name and description within a json file in the request body i.e :

{
"name": "get up",
"description":"get up at 7.00"
}

Delete a TODO:
To delete a TODO use DELETE method with this url: http://localhost:3000/user/list_id/id
list is the list id and id is the id of the TODO to be deleted.i.e.: http://localhost:3000/ebrown/7/3

You can also soft delete a TODO, that is you can keep the list but mark it as DELETED
To do so, use PUT method with this url: http://localhost:3000/user/list_id
supply TODO id and status within a json file in the request body i.e.: ttp://localhost:3000/ebrown/7
{
"id": 5,
"status":"DELETED"
}

Mark as DONE a TODO:

TO mark a TODO as done use PUT method with this url: http://localhost:3000/user/list_id
Supply TODO id and status within a json file in the request body i.e.: http://localhost:3000/ebrown/7
{
"id": 5,
"status":"DELETED"
}

Add reminder to a list:

To add reminder to a list use POST method with this url: http://localhost:3000/user/list_id
Supply a date time (if not exist default value is one week after the creation date)
and alert_before (time if not exist default value is 0 for on time alert ) i.e:
http://localhost:3000/eborwn/7
{
"alert_before": "05:00",
"date_time","2019-04-08 23:54:02"
}
