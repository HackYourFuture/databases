This is the help of ToDo-App:

At first, kindly go to the the homework folder and run this command:
node todo-app.js

If you want to get access to the data, kindly use POSTMAN to handle the following available requests:

1. To get all data from a table of the database, you can use this GET request:
   localhost:4000/:table (:table => you can type instead the name of the table). Available table names are:
   user
   todo_list
   user_todo_list
   category
   todo_item
   todo_list_item

2. To add a new todo_item to the database, you can use this POST request:
   localhost:4000/todo_item/add
   Then you can add the following example as (application/json) in the body of POSTMAN to add the new todo_item:
   {
   "item_name": "pan",
   "isTagged": 0,
   "Description": "kitchen"
   }

3. To delete a todo_item from the database, you can use this DELETE request:
   localhost:4000/todo_item/:id/delete (:id => is the ID of the todo_item you want to delete).
   example: localhost:4000/todo_item/3/delete

   Caution: When you delete a todo_item you are also deleting the relating information in other tables.

4. To add a new todo_list to the database, you can use this POST request:
   localhost:4000/todo_list/add
   Then you can add the following example as (application/json) in the body of POSTMAN to add the new todo_list:
   {
   "list_name": "visiting friends",
   "category_cid": 0
   }

5. To delete a todo_list from the database, you can use this DELETE request:
   localhost:4000/todo_list/:id/delete (:id => is the ID of the todo_list you want to delete).
   example: localhost:4000/todo_list/5/delete

   Caution: When you delete a todo_list you are also deleting the relating information in other tables.

6. To mark a todo_item as COMPLETED, you can use the PUT request:
   localhost:4000/todo_list_item/:id/complete (:id => is the ID of the todo_item you want to mark as COMPLETED).
   example: localhost:4000/todo_list_item/3/complete

   Note: If the todo_item is already completed you will get a message of that.

7. To add a REMINDER to todo_list, you can use the PUT request:
   localhost:4000/user_todo_list/:id/reminder (:id => is the ID of the todo_list you want to add a reminder to it).
   example: localhost:4000/user_todo_list/9/reminder
   Then you can add the following example in the body of POSTMAN as (application/json) to add the reminder to the todo_list:
   {
   "Reminder": "2019-06-23 00:00:00"  
   }

   This date and time as: "yyyy-mm-dd hh:mm:ss"

Thanks for your patience.
