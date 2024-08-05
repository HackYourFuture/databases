const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "recipe_db",
  port: 3306
});
connection.connect();

const create_dataBase_query = "CREATE DATABASE IF NOT EXISTS recipe_db";
connection.query(create_dataBase_query, function (error, results, fields) {
  if (error) throw error;
  console.log("Database 'recipe_db' created or already exists.");

  const use_database_query = "USE recipe_db";
  connection.query(use_database_query, function (error, results, fields) {
    console.log("Using 'recipe_db' database.");

    const CREATE_TABLE = [
      "CREATE TABLE IF NOT EXISTS Recipe (recipe_id INT AUTO_INCREMENT, recipe_name VARCHAR(255) NOT NULL, PRIMARY KEY(recipe_id))",
      "CREATE TABLE IF NOT EXISTS Category (category_id INT AUTO_INCREMENT, category_name VARCHAR(255) NOT NULL, PRIMARY KEY(category_id))",
      "CREATE TABLE IF NOT EXISTS Ingredient (ingredient_id INT AUTO_INCREMENT, ingredient_name VARCHAR(255) NOT NULL, PRIMARY KEY(ingredient_id))",
      "CREATE TABLE IF NOT EXISTS Step (step_id INT AUTO_INCREMENT, step_description TEXT NOT NULL, PRIMARY KEY(step_id))",
      "CREATE TABLE IF NOT EXISTS RecipeCategory (recipe_id INT, category_id INT, PRIMARY KEY(recipe_id, category_id), FOREIGN KEY(recipe_id) REFERENCES Recipe(recipe_id), FOREIGN KEY(category_id) REFERENCES Category(category_id))",
      "CREATE TABLE IF NOT EXISTS RecipeIngredient (recipe_id INT, ingredient_id INT, PRIMARY KEY(recipe_id, ingredient_id), FOREIGN KEY(recipe_id) REFERENCES Recipe(recipe_id), FOREIGN KEY(ingredient_id) REFERENCES Ingredient(ingredient_id))",
      "CREATE TABLE IF NOT EXISTS RecipeStep (recipe_id INT, step_id INT, step_order INT, PRIMARY KEY(recipe_id, step_id), FOREIGN KEY(recipe_id) REFERENCES Recipe(recipe_id), FOREIGN KEY(step_id) REFERENCES Step(step_id))"
    ];

    CREATE_TABLE.forEach((query) => {
      connection.query(query, function (error, results, fields) {
        if (error) throw error;
        console.log(`Table created or already exists.`);
      });
    });
    connection.end();
  });
});
