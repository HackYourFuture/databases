# How to use :Todo_list_app

## use the accompanied dump file (todo_list_dump.sql) by importing it :

```
mysql -u username -p database_name < file.sql
```

### Prerequisites

- you should use postman if you want to show data
- use the port 3000 in postman
- in the terminal use ( npm start)

```
http://localhost:3000/
```

### Show Data

to show a specific table use the name of it  
name of the tables in this app are : category, todo_item, todo_list, todo_list_item, user, user_todo_list

```
http://localhost:3000/category
```

To add todo_item , you should use post in postman , useing the following (application/json) raws:

```
http://localhost:3000/add_todo_item
```

```
{
        "todo_item_name": "give what you want",
        "isTagged": "1",
        "description": "add some description"
    },
```

To delete todo_item , you should use post in postman , useing the number of the required item

```
http://localhost:3000/delete_todo_item/id
```

To add todo_list , you should use post in postman , useing the following (application/json) raw:

```
http://localhost:3000/add_todo_list
```

```
{
        "list_name": "name",
        "categoryID": ?
    }
```

To delete todo_list , you should use delete in postman , useing the number of the required item

```
http://localhost:3000/delete_todo_list/id
```

to mark todo_list_item as completed , use put in postman , with the following code :

```
http://localhost:3000/markcompleted_todo_list_item/:id
```

to set reminder for user todo_list , use put in postman with the following (application/json) raw:

```
http://localhost:3000/reminder_user_todo_list/id
```

```
{
        "reminder": "2019-08-09 00:00:00"
    }
```