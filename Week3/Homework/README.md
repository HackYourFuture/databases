### MANUEL for the ToDo App

- To benefit from ToDo App,
  please use the Postman application and follow the instructions below.

## Manipulating Users

- Enter related url into the URL field.
- Make necessary changes on Body section with raw and JSON preferences.
- Choose your method from button regarding the process (e.g. post,put,delete ...)
- Click the Send button to send your request.

* Warning!
  1.  Username and email are unique values. It can be inserted only once.
  2.  If user is deleted, list and items belonged to that user also will be deleted.
      Similarly if list is deleted, its items will be deleted.

# Create a new user

- URL: localhost:3000/user/add
- Body => raw & JSON
  {
  "username":"example",
  "email":"example@mail.com"
  }
- Button: Post

# Get all users

- URL: localhost:3000/user/list
- Button: Get

# Delete a specific user

- URL: localhost:3000/user/delete
- Body => raw & JSON
  {
  "userId":"5"
  }
- Button: Delete

# Update a specific user

- URL: localhost:3000/user/update
- username and email can be changed with existing userId
- Body => raw & JSON
  {
  "userId":4,
  "username":"update name",
  "email":"update email"
  }
- Button: Put

## Manipulating Todo List

# Create a new list

- URL: localhost:3000/list/insert
- Body => raw & JSON
  {
  "username":"example",
  "email":"example@mail.com"
  }
- Button: Post

# Get a specific list (belong to specific user)

- URL: localhost:3000/list/get
- Body => raw & JSON
  {
  "userId": "6"
  }
- Button: Get

# Delete a specific list

- URL: localhost:3000/list/delete
- Body => raw & JSON
  {
  "userId":"5"
  "listName": "Shopping"
  }
- Button: Delete

## Manipulating Items

# Insert a new item

- URL: localhost:3000/item/insert
- Body => raw & JSON
  {
  "listId":"3",
  "itemName":"Lemon"
  "deadline":"2019-12-12 12:12:12"
  }
- Button: Post
- Deadline is a reminder for the user.

# Get items from specific list

- URL: localhost:3000/item/get
- Body => raw & JSON
  {
  "listId": "3"
  }
- Button: Get

# Delete a specific item

- URL: localhost:3000/item/delete
- Body => raw & JSON
  {
  "listId":"6"
  "itemName": "Bread"
  }
- Button: Delete

# Mark item status

- URL: localhost:3000/item/mark
- Body => raw & JSON
  {
  "listId":"6"
  "itemName": "Bread"
  "isDone": 1
  }
- Button: Put
