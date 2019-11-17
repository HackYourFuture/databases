## Todo_app GUID

# Postman: 
- This app was designed to work on postman with http://localhost:3000/
- With todo_app you can do the following:

# Show table:
 - HTTP request: Get: 
    http://localhost:3000/<name of table>

# Add new user: 
 - HTTP request: Post
 - request URL: http://localhost:3000/user
 - switch to the Body tab
 - click raw
 - select JSON
 - post body format:  
        {
         "user_name": "type name",
         "email": "type email"
         }
 - click send

# Delete user
 - HTTP request: Delete
 - request URL: http://localhost:3000/user/<type id of user>
 - click send

# Add new task: 
 - HTTP request: Post
 - request URL: http://localhost:3000/task
 - switch to the Body tab
 - click raw
 - select JSON
 - post body format:  
        {
         "task_name": "type name of the task",
         "description": "type description"
         }
 - click send

# Delete task
 - HTTP request: Delete
 - request URL: http://localhost:3000/task/<type id of task>
 - click send  

 # Add new todo list: 
 - HTTP request: Post
 - request URL: http://localhost:3000/todo_list
 - switch to the Body tab
 - click raw
 - select JSON
 - post body format:  
        {
         "list_name": "type name of the list",
         "category_ID": "type ID of category"
         }
 - click send

 # Delete todo list
 - HTTP request: Delete
 - request URL: http://localhost:3000/todo_list/<type id of list>
 - click send  

 # Mark as done 
 - HTTP request: PUT
 - request URL: http://localhost:3000/complete/<type id of list>

 # Set reminder

 - HTTP request: PUT
 - request URL: http://localhost:3000/reminder/<type id of list>
 - switch to the Body tab
 - click raw
 - select JSON
 - post body format:  
        {
         "reminder": "yyyy-mm-dd"
         }
 - click send
