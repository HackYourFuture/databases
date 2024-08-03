const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'userdb'
});

// SQL CREATE TABLE statements as an array
const createTablesSQL = [
    `CREATE TABLE IF NOT EXISTS Recipe (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS Category (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS Ingredient (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        quantity VARCHAR(100)
    )`,
    `CREATE TABLE IF NOT EXISTS Step (
        id INT AUTO_INCREMENT PRIMARY KEY,
        description TEXT NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS RecipeCategory (
        recipe_id INT,
        category_id INT,
        FOREIGN KEY (recipe_id) REFERENCES Recipe(id),
        FOREIGN KEY (category_id) REFERENCES Category(id),
        PRIMARY KEY (recipe_id, category_id)
    )`,
    `CREATE TABLE IF NOT EXISTS RecipeIngredient (
        recipe_id INT,
        ingredient_id INT,
        FOREIGN KEY (recipe_id) REFERENCES Recipe(id),
        FOREIGN KEY (ingredient_id) REFERENCES Ingredient(id),
        PRIMARY KEY (recipe_id, ingredient_id)
    )`,
    `CREATE TABLE IF NOT EXISTS RecipeStep (
        recipe_id INT,
        step_id INT,
        step_order INT NOT NULL,
        FOREIGN KEY (recipe_id) REFERENCES Recipe(id),
        FOREIGN KEY (step_id) REFERENCES Step(id),
        PRIMARY KEY (recipe_id, step_id)
    )`
];
//mySQL2 handle the connection for us, so we don't need to call 
//connection.connect() and connection.end() as we did in the previous example.

// Function to create tables
function createTables(index = 0) {
    if (index < createTablesSQL.length) {
        connection.query(createTablesSQL[index], function(err, results) {
            if (err) {
                console.error(`Error creating table: ${err.message}`);
            } else {
                console.log(`Table ${index + 1} created successfully`);
                createTables(index + 1); // Move to the next table
            }
        });
    } else {
        console.log('All tables created successfully');
        connection.end(); // Close the connection
    }
}

// Start creating tables
createTables();
