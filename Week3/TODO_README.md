1 - To retrieve all todolist and user name information, enter '/todos/lists' extension in POSTMAN.

2 - To retrieve todo items information, enter '/todos/todoitems/:listname' extension and specify the list name in POSTMAN.

3 - To insert a new todo list please use json structure below and '/todos/addnewlist' extension in POSTMAN:
{
"List Name": "",
"User Name": "",
"Category Name": "",
"Deadline":"YYYY-MM-DD"
}

4 - To insert a new todo item please use json structure below and '/todos/addnewitem' extension in POSTMAN:
{
"Item Name": "",
"List Name": ""
}

5 - To delete a todoitem, use '/todos/removeitem/:name' extention and specify the todo item name you want to delete.

6 - To delete a todolist, use '/todos/removelist/:name' extention and specify the list item name you want to delete.
--- Attention: Deleting a list causes to delete all todo items on the list.

7 - To mark a todoitem as 'completed', use '/todos/done/:name' specify the todo item name you want to mark.

8 - To look at outdated todolists, use '/todos/reminder'.
