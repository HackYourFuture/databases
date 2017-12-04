// This is the connector (also known as driver)
// that we can use to connect to a MySQL process
// and access its databases.
const readline = require("readline");
const mysql = require('mysql');


class TodoModel {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }

    // Loads all the TODOs in the database
	
    load(callback) {
        const selectTodoItems = "SELECT * FROM todo_items";
        this.dbConnection.query(selectTodoItems, function(err, results, fields) {
            if(err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
    }
    
	
   create(description, user_id, callback) {
        // Write code and query to create a new TODO item
		const query = "Insert Into todo_items(text, user_id) Values(?, ?)";
		this.dbConnection.query(query, [description,user_id], function(err, results, fields){
			if(err) {
				callback(err);
				return;
			}
			
			callback(null, results);
		});
    }

    update(id, description, callback) {
        // Write code and query to update and existing TODO item
		const query = "UPDATE todo_items Set text = ? WHERE id = ?";
		this.dbConnection.query(query, [description,id], function(err, results, fields){
			if(err) {
				callback(err);
				return
			}
			callback(null, results);
		});
    }

    delete(id, callback) {
        // Write code and query to delete an existing TODO item
		const query = "DELETE FROM todo_items WHERE id = ?";
		this.dbConnection.query(query,[id], function(err, results, fields){
			if(err) {
				callback(err);
				return
			}
			callback(null, results);
		});
    }

    tagTodoItem(tagId, callback) {
        // Write code and query add a tag to a TODO item
		const query = "INSERT INTO todo_item_tag(tag_id) VALUES(?)";
		this.dbConnection.query(query,[tagId], function(err, results, fields){
			if (err) {
				callback(err);
				return;
			}
			callback(null, results);
		});
    }
        
    untagTodoItem(todoItemId,callback) {
        // Write code and query remove a tag from a TODO item
		const query = "DELETE FROM todo_item_tag WHERE todo_item_id = ?";
		this.dbConnection.query(query, [todoItemId], function(err, results, fields) {
			if(err) {
				callback(err);
				return;
			}
			callback(null, results);
		});
    }

    markCompleted(todoItemId, callback) {
        // Write code to mark a TODO item as completed
		const query = "UPDATE todo_items SET is_completed = 1 WHERE id = ?";
		this.dbConnection.query(query, [todoItemId,tagId], function(err, results, fields) {
			if(err) {
				callback(err);
				return;
			}
			callback(null, results);
    });
}
}

 const dbConnection = mysql.createConnection({
    host     : 'localhost',
    user     : 'todo_user',
    password : '123',
    database : 'todo_app'
});

dbConnection.connect(function(err) {
    if (err != null) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + dbConnection.threadId);

    const todoModel = new TodoModel(dbConnection);
    todoModel.load(function(err, todoItems) {
        if(err) {
            console.log("error loading TODO items:", err);
        }

        console.log("existing todo items:", todoItems);
    

const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
	})
rl.question("What do you want to do in the todo_app database? you can create/update/delete", (answer)=>{
	if(answer.trim() == "create"){
		rl.question("What do you want to add in the new item?", (answer)=>{
					const createItem = answer.trim();
			todoModel.create(createItem, 5 , function(err, result){
		if(err){
			console.log("error creating TODO items", err);
		}
		console.log("a new TODO item has been created", result);
                  todoModel.tagTodoItem(5, function(err, result){
                        if(err){
                            console.log("error adding a tag id number", err);
                        }
                        console.log("a new tag id number has been created", result);
                                  dbConnection.end();
                        rl.close();	
                   })
        	});
    	});
  
	} else if(answer.trim() == "update"){
		rl.question("Write a number of the id do you like to update it:", (answer)=>{
					const updateId = answer.trim();
			           rl.question("what is the update?", (answer)=>{
						   const updatsText = answer.trim();
						   todoModel.update(updateId, updatsText, function(err, result){
		                        if (err){
			                       console.log("error updating todo item", err);
	                         	}
		                        console.log("a todo item has been updated successfully", result);
                                dbConnection.end();
							    rl.close();	
                            	});
					   });
				});
	} else if(answer.trim() == "delete"){
		rl.question("Write the number of the id do you like to delete it: ", (answer)=>{
			const deleteId = answer.trim();
			todoModel.delete(deleteId, function(err, result){
				if (err){
					console.log("error deleting todo item", err);
				}
				console.log("a todo item has been deleted successfully")
                todoModel.untagTodoItem(deleteId, function(err, result){
                    if(err){
                        console.log("erro deleting todo item id", err);
                    }
                    console.log("a todo item id has been deleted successfully", result);
                    dbConnection.end();
                    rl.close();	
                })
			})
		  })
    	}
   });
 });
});
