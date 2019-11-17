1. put ---> localhost:3000/createList/:addNameForNewList
   It would create a todo list has name whatever you want.

2. put ---> localhost:3000/createUserList
   It would create only user list.

3. post ---> localhost:3000/addUser
   It would insert new user into user list.
   Needs specific requirement values name and email with json form.

4. post ---> localhost:3000/insert/:chooseAList
   It would insert new todo into list that you choose.
   Needs specific requirement values todo, done and user_id with json form.

5. delete ---> localhost:3000/deleteItem/:todoList/:todoId
   It would delete specific todo that has todoId inside todoList.

6. delete ---> localhost:3000/delete/:todoList
   It would delete todoList that you choose.

7. put ---> localhost:3000/itemCompleted/:todoList/:todoId
   It would set a done value false to true inside todoList and todo has todoId
