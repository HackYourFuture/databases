Instructions :
To be able to manipulate TODO, you have to create a USER and a TODO List.

CREATE USER (POST/user): send a json object with 'user_name' EX: {"user_name": "USER_1"}

CREATE TODO LIST (POST/todo_list): send a json object with 'list_name' 'name of the user' 'reminder date' EX: {"list_name": "weekend", "user_name": "USER_1","reminder":"2015-12-12 21:10" (reminder can be null)}

PRINT TODO LIST (GET/todo): send a json object with 'user_name' EX: {"user_name": "USER_1"}

ADD ITEM TO TODO LIST (POST/todo): send a json object with 'todo_desc', 'list_name', 'user_name' EX : { "todo_desc":"go to school", "list_name":"weekend","user_name" : "USER_1"}

DELETE ITEM FROM TODO LIST(DELETE/todo/:user_name/:list_name): send a json object with 'todo_desc' EX : { "todo_desc":"go to school"}

DELETE A TODO LIST (DELETE/todo_list/:user_name/:list_name)

SET ITEM AS DONE (PUT/todo/done/:user_name/:list_name): send a json object with 'todo_desc' EX: { "todo_desc":"go to school"}

ADD REMINDER(PUT/todo_list/reminder/:list_name): send a json object with 'date' EX: { "date":"2019-08-09 13:45"}
