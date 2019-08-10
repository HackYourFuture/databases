** Creating database with the name of "todo_list". There are three tables. Table User is for User"s information with ID (primary key) and Name. Table TodoList is for todo lists information with ID (primary key), Name, UserID (foreign key) and Reminder (default NULL). Table TodoItem is for todo items information with ID (primary key) description, TodoListID (foreign key), completed (default '0').

** We make a Todo App and Web APIs for ToDo App. 

** Functions of Web APIs;

* Show todo list: To get the contents of a todo list with the ID of 'id' use GET method with this address: (localhost:3000/todoList/:id) 
* Show todo items: To get the items of a todo list with the ID of 'listId' use GET method with this address: (localhost:3000/todoitems/:listId). For example one of the todo list is gardening and ID of it listId. Todo items of the list are water the flowers, cut the grass, give vitamins to the trees...
* Add a todo item to the todo list with the ID of 'listId' use Post method with this address: (localhost:3000/insertTodoItems/:listId). Send a json object with 'ID', 'description', 'TodoListID', 'completed' e.g.  {"ID":"5", "description":"water the flowers", "TodoListID":"1","completed" : 0}
* Delete the todo item with the ID of 'id' from the todo list with the ID of 'listId' use Delete method with this address: (localhost:3000/:listId/deleteTodoItems/:id).
* Create a new todo list use Post method with this address: (localhost:3000/createList). Send a json object with 'ID', 'Name', 'UserID', 'Reminder' e.g.  {"ID":"3", "Name":"Gardening", "UserID":"4","Reminder" : NULL}
* Delete a todo list with the ID of 'id' use Delete method with this address: (localhost:3000/deleteTodoList/:id).
* Mark a todo item as 'completed' with the ID of 'id' and with the TodoListID of 'listId' use Put method with this address: (localhost:3000//:listId/markAsCompleted/:id). 
* Update the todo list with the ID of 'id' use Post method with this address: (localhost:3000/:Id/reminder). Send a json object with 'ID', 'Name', 'UserID', 'Reminder' e.g.  {"ID":"3", "Name":"Gardening", "UserID":"4","Reminder" : "2019-08-20 12:00:00"}