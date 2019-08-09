#Hello, Welcome to Full ToDo App!

##Here is how to use it:

###How to provide information:

The information you provide need to be in JSON format with specific ids.
Content type needs to be <application/json>.

For example, to create a user, you need to provide:

```json
{
  "username": "Alex",
  "gender": "F"
}
```

You can omit optional information (gender is optional).

###What you can GET:

| path                             | What to get                      |
| -------------------------------- | -------------------------------- |
| /                                | Display this Readme              |
| /users                           | All users                        |
| /users/_id_                      | User with the _id_               |
| /lists                           | All lists                        |
| /lists/_id_                      | List with the _id_               |
| /lists/done                      | Completed lists                  |
| /items                           | All items (todos)                |
| /items/_id_                      | Item with the _id_               |
| /reminders                       | All reminders                    |
| /reminders/_id_                  | Reminder with the _id_           |
| /itemsinlists                    | Lists that have items            |
| /lists/items/done OR /items/done | Completed items (todos)          |
| /lists/users                     | All lists associated with a user |

###What you can POST:

| path                                   | What to create                            | What to provide                                                |
| -------------------------------------- | ----------------------------------------- | -------------------------------------------------------------- |
| /users                                 | user                                      | username, gender(optional)                                     |
| /lists                                 | list                                      | name, description(optional), created(optional), done(optional) |
| /items                                 | item                                      | todo                                                           |
| /reminders                             | reminder                                  | title(optional), when                                          |
| /lists/_listId_/reminders/_reminderId_ | set reminder to list                      |
| /lists/_listId_/items/_itemId_         | add item to list                          |
| /lists/_listId_/done                   | mark the list as done                     |
| /lists/_listId_/items/_itemId_/done    | put item(todo) in list to completed todos |
| /lists/_listId_/users/_userId_         | associate a list with a user              |

###What you can DELETE:

| path                                | What to delete                                 |
| ----------------------------------- | ---------------------------------------------- |
| /lists/_listId_/done                | mark the list as NOT done                      |
| /users/_userId_                     | delete user                                    |
| /lists/_listId_                     | delete list                                    |
| /items/_itemId_                     | delete item(todo)                              |
| /reminders/_reminderId_             | delete reminder                                |
| /lists/_listId_/items/_itemId_/done | remove item(todo) in list from completed todos |
| /lists/_listId_/items/_itemId_      | remove item(todo) from the list                |
| /lists/_listId_/users/_userId_      | remove the association between list and user   |
