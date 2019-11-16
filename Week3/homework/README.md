# HackYourFuture Databases Week 3 Homework: Full ToDo App

This app supports following functions:
• create user(s)
• create todoList(s) for user
• create todoListItem(s) for todoList
• create reminder(s) for todoList
• delete user
• delete todoList of user
• delete todoListItem of todoList
• delete reminder of todoList
• mark todoListItem as completed
• list specific user or all users
• list specific todoList or all todoLists
• list specific todoListItem or all todoListItems
• list specific reminder or all reminders

## Testing

• Prepare database-import dump file:

- From command line:
  mysql -u root -p toDos < /path/to/toDos_EZ.sql
- From within mysql:
  mysql> source toDos_EZ.sql

• After running `node path/to/index.js` on command line, test the app using POSTMAN :
(You can use values in ** test.json ** for testing)

### User ###

# Create user(s)

•HTTP method: `POST`.
•Endpoint: `localhost:3000/todos/user`
•Request body RAW / JSON :

- Multiple users
  {
  "user": [
      {
      "name": "Natsu"
      },
      {
      "name": "Haru"
      }
    ]
  }

- Single User
  {
  "user": [
      {
      "name": "Natsu"
      }
    ]
  }

# Delete User

•HTTP method: `DELETE`.
•Endpoint: `localhost:3000/todos/user/:id`

** If you delete a user, all the lists(also listItems and reminders belonging to that list) of that user is also deleted automatically. 

# List User(s)

•HTTP method: `GET`.
•Endpoint: `localhost:3000/todos/user/:id`
(Enter id as `all` to list all users)

### ToDoList ###

# create ToDoList(s)

•HTTP method: `POST`.
•Endpoint: `localhost:3000/todos/todoList`
•Request body RAW / JSON :

- multiple todoLists
  {
    "todoList": [
      {
        "title": "Party",
        "userId": 1
      },
      {
        "title": "Shopping",
        "userId": 1
      },
      {
        "title": "School",
        "userId": 2
      }
    ]
  }
- single todoList
  {
    "todoList": [
      {
        "title": "Work",
        "userId": 1
      }
    ]  
  }

# delete toDoList

•HTTP method: `DELETE`.
•Endpoint: `localhost:3000/todos/todoList/:id`

** If you delete a toDoList, all the listItems and reminders belonging to that list is also deleted automatically. 

# list todoList(s)

•HTTP method: `GET`.
•Endpoint: `localhost:3000/todos/todoList/:id`
(enter id as `all` to list all todoLists)

### ToDoListItem ###

# create toDoListItem(s)

•HTTP method: `POST`.
•Endpoint: `localhost:3000/todos/todoListItem`
•Request body RAW / JSON :

- multiple todoListItems
  {
    "todoListItem": [
      {
        "description": "prepare invitation",
        "isCompleted": "F",
        "dueDate": "2019-12-01 14:00:00",
        "toDoListId": 1
      },
      {
        "description": "decorate house",
        "isCompleted": "F",
        "dueDate": "2019-12-01 14:00:00",
        "toDoListId": 1
      }
    ]
  }

- single todoListItem for a todoList
  {
  "todoListItem": [
      {
        "description": "order cake",
        "isCompleted": "F",
        "dueDate": "2019-12-01 14:00:00",
        "toDoListId": 2
      }
    ]
  }

# delete toDoListItem

•HTTP method: `DELETE`.
•Endpoint: `localhost:3000/todos/todoListItem/:id`

# list todoListItem(s)

•HTTP method: `GET`.
•Endpoint: `localhost:3000/todos/todoListItem/:id`
(enter id as `all` to list all todoListItems)

# mark as completed a todoListItem

•HTTP method: `Post`.
•Endpoint: `localhost:3000/todos/todoListItem/:id/:isCompleted`

** you can mark a listItem as either completed with value `T` or not completed with value `F` 

### Reminder ###

# create reminder(s)

•HTTP method: `POST`.
•Endpoint: `localhost:3000/todos/reminder`
•Request body RAW / JSON :

- multiple reminders
  {
    "reminder": [
      {
        "title": "party",
        "alarmFrom": "2019-11-29 18:00:00",
        "alarmTo": "2019-11-29 19:30:00",
        "alarmTone": "rainy ray",
        "toDoListId": 1
      },
      {
        "title": "a week before party",
        "alarmFrom": "2019-11-22 18:00:00",
        "alarmTo": "2019-11-22 19:30:00",
        "alarmTone": "rainy ray",
        "toDoListId": 1
      }
    ]
  }

- single reminder
  {
  "reminder": [
      {
        "title": "deadline",
        "alarmFrom": "2019-11-20 18:00:00",
        "alarmTo": "2019-11-20 19:30:00",
        "alarmTone": "rainy ray",
        "toDoListId": 3
      }
    ]
  }

# delete reminder

•HTTP method: `DELETE`.
•Endpoint: `localhost:3000/todos/reminder/:id`

# list reminder(s)

•HTTP method: `GET`.
•Endpoint: `localhost:3000/todos/reminder/:id`
(enter id as `all` to list all reminders)
