1- To add a new user to user table:
post on http://localhost:5555/users/newUser
and on the body write:
{
"user_name": "what ever the name is"
}

2- To delete a user from user table:
delete on http://localhost:5555/users/deleteUser
and on the body write:
{
"user_id": just a number
}

3- To create a new list:
post on http://localhost:5555/todolist/createone
and on the body write:
{
"user_id": just a number ,
"list_name": "the name of the list"
}

4- To delete a list:
delete on http://localhost:5555/todolist/deleteone
and on the body write:
{
"list_id": just a number
}

5- To add a reminder for a list:
put on http://localhost:5555/todolist/addreminder
and on the body write:
{
"item_id": just a number
}

6-To add an item:
post on http://localhost:5555/todoitem/createone
and on the body write:
{
"user_id":just a number,
"list_id": just a number,
"title": "a title",
"description":"more information over the item"
}

7-To delete an item:
delete on http://localhost:5555/todoItem/deleteone
and on the body write:
{
"item_id": just a number
}

8-To mark an item as done
put on http://localhost:5555/todoItem/markDone
and on the body write:
{
"item_id": 2
}
