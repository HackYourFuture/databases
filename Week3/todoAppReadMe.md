### todoApp Application

### How to run it

1. You need to dump todo.sql file to create database , tables and insert values to the tables
2. run that node index.js on terminal
3. Use Postman to provide information from postman
4. Content type needs to be <application/json>. using POST

### Usage of todoApp

1. Get Users

path : /user
method: GET

2. Get todolists

path : /todolist
method: GET

3. Get todoitems

path : /todoitem
method: GET

4. Get Reminders

path : /reminder
method: GET

5. Get Tags

path : /tag
method: GET

6. Get a User By Id

path : /user/:id
method: GET

7. Get a todolist By Id

path : /todolist/:id
method: GET

8. Get a todoitem By Id

path : /todoitem/:id
method: GET

9. Get a Reminder By Id

path : /reminder/:id
method: GET

10. Get a Tag By Id

path : /tag/:id
method: GET

11. Create a User Or Users

path : /user
method: POST
Input Format:

{
"user": [
{ "Name": "", "Email": "" }
]
}

-You can add more than one item of user array as an object

12. Create a todolist Or todolists

path : /todolist
method: POST
Input Format:

{
"todolist": [
{ "Name": "", "User_ID": "", "Reminder_ID": "" }
]
}

-You can add more than one item of todolist array as an object

13. Create a todoitem Or todoitems

path : /todoitem
method: POST
Input Format:

{
"todoitem": [
{ "Description": "", "List_ID": "" }
]
}

-You can add more than one item of todoitem array as an object

14. Create a Reminder Or Reminders

path : /reminder
method: POST
Input Format:

{
"reminder": [
{ "Date": "", "Notification": "", "List_ID": "" }
]
}

-You can add more than one item of reminder array as an object

15. Create a Tag Or Tags

path : /tag
method: POST
Input Format:

{
"tag": [
{ "Name": "", "Item_ID": "" }
]
}

-You can add more than one item of tag array as an object

16. Mark todoitem As Completed

path : /todoitem/completed
method: POST
Input Format:

{
"listitem": [
{ "List_ID": "", "Item_ID": "", "IsCompleted": "" }
]
}

-You can add more than one item of listitem array as an object

17. Mark todoitem As Completed By Id

path : /todoitem/:id/completed
method: PUT

18. Delete a User By Id

path : /user/:id
method: DELETE

19. Delete a todolist By Id

path : /todolist/:id
method: DELETE

20. Delete a todoitem By Id

path : /todoitem/:id
method: DELETE

21. Delete a Reminder By Id

path : /reminder/:id
method: DELETE

22. Delete a Tag By Id

path : /tag/:id
method: DELETE
