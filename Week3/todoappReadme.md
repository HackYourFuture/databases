# ToDoApp Readme (Abdullah)

ToDoApp is an user based app. Each user can do something in his own environment.
In our case of homework, there is no admin.
Users can; - Create todo list - Add todo item(s) to list - Delete todo list - Delete todo item(s) - Mark item(s) as done - Add reminder to list

## here is methods

## What you can GET:

| path                | What to get                      |
| ------------------- | -------------------------------- |
| /username/list      | All Lists                        |
| /username/todo      | All todo items (with list names) |
| /username/done      | All items marked done            |
| /username/reminders | Reminders with list names        |

## What you can PUT (please check request body instructions):

| path  | What to update                    |
| ----- | --------------------------------- |
| /list | Adds reminder(from body)          |
| /todo | Marks item(s) as done (from body) |

## What you can POST (please check request body instructions):

| path  | What to create                    |
| ----- | --------------------------------- |
| /list | Create a list with provided name  |
| /todo | Add todo item(s) to specific list |

## What you can DELETE (please check request body instructions):

| path   | What to delete                  |
| ------ | ------------------------------- |
| /lists | Delete a list with todo items   |
| /todo  | Delete todo item(s) from a list |

## Request Body

Request body is in the same shape in all cases.

```
{
  "user": "abdullah",
  "list": {
    "name": "nodejs",
    "reminder": "2012-10-05 12:05:00"
  },
  "todo": [{ "description": "drink tea" }]
}
```

### Requirements in cases of request (Request body instructions)

`"user"` and `"list":{"name"}` areas are mandatory in all cases

1- POST /list
`"reminder": "2012-10-05 12:05:00"` is optional

`"todo": []` content of todo array is ignored

2- POST /todo
`"reminder": "2012-10-05 12:05:00"` is ignored

`"todo": [{ "description": "todoItemDescription" }]` is mandatory. All todo items in array will be added

3- PUT /list
`"reminder": "2012-10-05 12:05:00"` is mandatory in mysql datetime format

`"todo": []` content of todo array is ignored

4- PUT /todo
`"reminder": "2012-10-05 12:05:00"` is ignored

`"todo": [{ "description": "todoItemDescription" }]` is mandatory. All todo items in array will be marked as done

5- DELETE /list
`"reminder": "2012-10-05 12:05:00"` is ignored

`"todo": []` content of todo array is ignored.

6- DELETE /todo
`"reminder": "2012-10-05 12:05:00"` is ignored
`"todo": [{ "description": "todoItemDescription" }]` is mandatory. All todo items in array will be deleted.

### USERNAMES

defined usernames are:
zehra -
yagoup -
veli -
utku -
unmesh -
talip -
suheyb -
nadin -
irfan -
igor -
hamza -
hani -
ghufran -
andrej -
alusine -
abdullah -

### DUMP

you need to create database first and then load the sql dump file.
database name in my DUMP file is " todoapp "
