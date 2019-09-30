<h1>Run and Test the project:</h1>

<h3> Clone repository:</h3>

`https://github.com/ShyarK/databases.git`

`npm i`

`npm start`

<h3> To get all users:</h3>

`http://localhost:3000/users`

<h3> To get all todolist:</h3>

`http://localhost:3000/todolist`

<h3> To get all todo items:</h3>

`http://localhost:3000/todoitems`

<h3> To get a user with the given id:</h3>

`http://localhost:3000/user/{id}`

<h3> To get a todoList with the given id:</h3>

`http://localhost:3000/todolist/{id}`

<h3> To get an item with the given id:</h3>

`http://localhost:3000/todoitem/{id}`

<h3>To delete a user, use user's id:</h3>

`http://localhost:3000/user/{id}`

<h3>To delete a todoList use todoList's id:</h3>

`http://localhost:3000/todolist/{id}`

<h3> To delete a item use item's id:</h3>

`http://localhost:3000/todoitem/{id}`

<h3> The todolist object:</h3>

`{ "Todolist_id": 2, "Name": "having dinner", "tag": "fun", "reminder": "2019-12-19T23:00:00.000Z", "user_id": 7 }`
  

  <h3> The item object:</h3> 
  
  ``{
       "Item_id": 2,
       "description": "going to hyf amsterdam",
       "todo_completed": "true",
       "todolist_id": 2
  }``
   
 <h3>The users object:</h3>
 
 ``{
        "User_id": 7,
        "Name": "user3",
        "Email": "use3@gmail.com"
 }``
 
 
 
 <h2>To create or update use Postman:</h2>
 <h4><a href="https://www.getpostman.com/">Postman</a> is a collaboration platform for API development. Postman's features simplify each step of building an API and streamline collaboration so you can create better APIs—faster.</h4>

 <table>
  <thead>
    <tr>
      <th>Methods</th>
      <th>Description</th>
      <th>How to use</th>
      <th>Request URL</th>
      <th> Request body </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Post</td>
      <td>Create a user</td>
      <td>In the postman app select `Post` => `Body` => row and use josn format </td>
      <td>http://localhost:3000/users</td>
      <td>
      {<br>
        "Name": "user",
        "Email": "use@email.com"
      }
      </td>
    </tr>
     <tr>
      <td>Post</td>
      <td>Create a todolist</td>
      <td>In the postman app select `Post` => `Body` => row and use josn format</td>
      <td>http://localhost:3000/todolist</td>
      <td>
      {<br>
        "Name": "{name of the list}",<br>
        "tag": "{type}",
        "reminder": "YY-MM-DD",<br>
        "User_id": {id}
      }
      </td>
    </tr>
     <tr>
      <td>Post</td>
      <td>Create an item</td>
      <td>In the postman app select `Post` => `Body` => row and use josn format </td>
      <td>http://localhost:3000/todoitems</td>
      <td>
      {<br>
       "Description": "{Descripe your todo}",<br>
        "Todo_completed": "false",
        "Todolist_id": 5
      }
      </td>
    </tr>
    <tr>
      <td>Put</td>
      <td>Update a user</td>
      <td>In the postman app select `Post` => `Body` => row and use josn format</td>
      <td>http://localhost:3000/user/{id}</td>
      <td>
      {<br>
        "Name": {You can change the name},<br>
        "Email": {You can change the email}
      }
      </td>
    </tr>
    <tr>
      <td>Put</td>
      <td>Update a todolist</td>
      <td>In the postman app select `Post` => `Body` => row and use josn format</td>
      <td>http://localhost:3000/todolist/{id}</td>
      <td>
      {<br>
      {
      "Name": {change the name},<br>
      "tag": {change the tag},
      "reminder": {change the date}
      }
      </td>
    </tr>
        <tr>
      <td>Put</td>
      <td>Update an item</td>
      <td>In the postman app select `Post` => `Body` => row and use josn format</td>
      <td>http://localhost:3000/todoitem/{id}</td>
      <td>
      {<br>
      {
      "description": {change the description},<br>
      "todo_completed": {change to true or false}
      }
      </td>
    </tr>
  </tbody>
</table>
