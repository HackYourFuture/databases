const mysql = require('mysql');

// Database connection configuration
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    multipleStatements: true // Allows execution of multiple SQL statements
});


// Function to create database and table

function setupDatabase() {
    // Create a connection to the MySQL server
    connection.connect(err => {
      if (err) {
        console.error('Error connecting to MySQL server:', err.stack);
        return;
      }
      console.log('Connected to MySQL server');
  
      // SQL query to create database and table
      const createDatabaseQuery = `
        DROP DATABASE IF EXISTS recipes_db;
        CREATE DATABASE recipes_db;
        USE recipes_db;
  
        CREATE TABLE Recipe (
          recipe_id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL
        );
        CREATE TABLE Category (
          category_id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL
        );

        CREATE TABLE Ingredient (
          ingredient_id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL
        );

        CREATE TABLE Step (
          step_id INT AUTO_INCREMENT PRIMARY KEY,
          description TEXT NOT NULL
        );

        CREATE TABLE RecipeCategory (
          recipe_id INT,
          category_id INT,
          PRIMARY KEY (recipe_id, category_id),
          FOREIGN KEY (recipe_id) REFERENCES Recipe(recipe_id),
          FOREIGN KEY (category_id) REFERENCES Category(category_id)
        );

        CREATE TABLE RecipeIngredient (
          recipe_id INT,
          ingredient_id INT,
          PRIMARY KEY (recipe_id, ingredient_id),
          FOREIGN KEY (recipe_id) REFERENCES Recipe(recipe_id),
          FOREIGN KEY (ingredient_id) REFERENCES Ingredient(ingredient_id)
        );

        CREATE TABLE RecipeStep (
          recipe_id INT,
          step_id INT,
          PRIMARY KEY (recipe_id, step_id),
          FOREIGN KEY (recipe_id) REFERENCES Recipe(recipe_id),
          FOREIGN KEY (step_id) REFERENCES Step(step_id)
        );

        INSERT INTO Recipe (name) VALUES ('Japanese Ramen'), ('Chocolate Cake'), ('Vegetarian Salad');
        INSERT INTO Category (name) VALUES ('Japanese'), ('Cake'), ('Vegetarian');
        INSERT INTO Ingredient (name) VALUES ('Noodles'), ('Broth'), ('Egg'), ('Flour'), ('Sugar'), ('Butter'), ('Lettuce'), ('Tomato'), ('Cucumber');
        INSERT INTO Step (description) VALUES ('Cook noodles according to the package instructions'), ('Prepare the broth'), ('Bake the cake'), ('Mix the salad ingredients together');

        INSERT INTO RecipeCategory (recipe_id, category_id) VALUES 
        (1, 1), (2, 2), (3, 3);

        INSERT INTO RecipeIngredient (recipe_id, ingredient_id) VALUES 
        (1, 1), (1, 2), (1, 3), 
        (2, 4), (2, 5), (2, 6), 
        (3, 7), (3, 8), (3, 9);

        INSERT INTO RecipeStep (recipe_id, step_id) VALUES 
        (1, 1), (1, 2), 
        (2, 3), 
        (3, 4);
      `;
  
      // Execute the query
      connection.query(createDatabaseQuery, (error, results) => {
        if (error) {
          console.error('Error executing SQL query:', error);
          return;
        }
        console.log('Database and table created successfully');
        connection.end();
      });
    });
  }
  
  // Run the setup function
  setupDatabase();