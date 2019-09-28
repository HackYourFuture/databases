# Web API for ToDo app
This is my homework for database week 3.
The folder with name (**homework**) is the root directory for this app.
## Indroduction
This app is web interface for the databese `adham_database_hw3` .
Through this app it is possible to :
- Create a new ToDo list.
- Delete a ToDo list.
- Add a reminder for a list.
- Insert task(s) in ToDo list.
- Delete task(s) in ToDo list.
- Mark an item as completed.
## requirements
-  Node js  on your computer.
- MySQL server on your computer.
- PostMan program: to test the app.
## Get started
- Clone or download the repository on your local machine.
- Be sure that the Node js and MySQL server are runing on your computer.
- Import the database from the file ` adham_mysql_hw3b.sql` in the root folder: `homework\adham_mysql_hw3b.sql`.
- Adjust the the connection setting to the MySQL server:  by editing the file  `database.js`, the file directory is  `homework\api\db\database.js`.
- Install all the dependencies: open `homework\package.json` in the terminal and run the command `npm install`.
- Run the file `homework\server.js`.

Now in the terminal  you have to see somthing like this:
 `The server is listening to http://localhost:3000`
`connected as id 515` (Sure with different id number)
If you are seeing that then everything is good and you can go ahead.
# Testing the app
Run the PostMan program on your computer, so you can test the app by sending HTTP requests to the endpoints/URLs
#### ## 1- Create a new ToDo list:
**Insert the folowing in PostMan then send the request:**
- HTTP method: POST.
- Endpoint: `http://localhost:3000/lists`
- Request body: raw.
- Request body conent type: `JSON`.
- Request body: `{"listName":"test 1","userIdReference":5}`
- Send the request.
- You will get response likie this:
 `{ "message": "Trying to add new list to the database.",
    "info": "Added successfully, The list name is: test 1, for the user with ID: 1"}`
- In the database you can see that one list is added, and it has ID 10.
#### ## 2- Delete a ToDo list:
**Insert the folowing in PostMan then send the request:**
- HTTP method: DELETE.
- Endpoint syntax:`http://localhost:3000/lists/{id}`
- Endpoint: `http://localhost:3000/lists/10`. The number 10 references to the list ID.
- Send the request.
- You will get response likie this:
 `{ "message": "Trying to delete list with ID: 10.",
    "info": "The list is deleted successfully, with all it's related tasks "}`
- In the database you can see that the list is deleted.
#### ## 3- Add a reminder for a list:
The reminder is a new date after few days from now. in the body request you will send the number of days.
**Insert the folowing in PostMan then send the request:**
- HTTP method: PATCH.
- Endpoint syntax:`http://localhost:3000/lists/{id}`
- Endpoint: `http://localhost:3000/lists/1` The number 1 references to the list ID.
- Request body: raw.
- Request body conent type: `JSON`.
- Request body: `{"listReminder":10}`
- Send the request.
- You will get response likie this:
 `{"message": "Trying to add reminder to the list with ID 1",
    "reminderSetting": "Remind after 10 days, then it will be Tue Oct 08 2019 06:41:22 GMT+0200 (GMT+02:00)",
    "info": "The reminder is added successfully"}`
- In the database you can see that the list with id 1 has a reminder.
#### ## 4- Insert task(s) in ToDo list:
**Insert the folowing in PostMan then send the request:**
- HTTP method: POST.
- Endpoint: `http://localhost:3000/tasks`
- Request body: raw.
- Request body conent type: `JSON`.
- Request body:
`[ {"taskDescription": "new task 1", "listIdReference": 1  },{"taskDescription": "new task 2", "listIdReference": 1  },{"taskDescription": "new task 3", "listIdReference": 1  }]`
- Send the request.
- You will get response likie this:
 `{    "message": "Adding task or tasks done successfully",
    "info": " 3 task or tasks added"}`
- In the database you can see that 3 tasks are added into the list with id 1.
-  You can also add a single task by sending Request body like this:
`[{"taskDescription": "new single task","listIdReference": 1}]`
#### ## 5- Delete task(s) in ToDo list:
**Insert the folowing in PostMan then send the request:**
- HTTP method: DELETE.
- Endpoint: `http://localhost:3000/tasks`
- Request body: raw.
- Request body conent type: `JSON`.
- Request body: `[1,2,3]` ,every number references to a task ID.
- Send the request.
- You will get response likie this:
 `{    "message": "Trying to delete the task or tasks",
    "askedToBeDeleted": 3,
    "Deleted": 3,
    "alreadyNotExist": 0}`
- In the database you can see that 3 tasks are deleted.
-  You can also delete a single task by sending Request body like this:
`[4]`.
#### ## 6- Mark an item as completed:
**Insert the folowing in PostMan then send the request:**
- HTTP method: PATCH.
- Endpoint syntax:`http://localhost:3000/tasks/{id}`
- Endpoint: `http://localhost:3000/tasks/5` The number 1 references to the task ID.
- Send the request.
- You will get response likie this:
 `{    "message": "Trying to mark the task with id 5 as completed.",
    "info": "The Task is marked successfully as completed."}`
- In the database you can see that the task is markd as completed.


###### *This app has a good validation on the request body , so you can try and send request body in another form than the description above, or you can send values, numbers not exist in the database.*

- Thanks for your time on testing this app.


