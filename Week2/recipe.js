const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: '8080',
    database: 'myRecipes'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database!');

    const query = `SELECT r.name AS Recipe
                   FROM recipes r
                   JOIN recipe_ingredients ri ON r.recipe_id = ri.recipe_id
                   JOIN ingredients i ON ri.ingredient_id = i.ingredient_id
                   JOIN recipe_categories rc ON r.recipe_id = rc.recipe_id
                   JOIN categories c ON rc.category_id = c.category_id
                   WHERE c.name = 'Vegetarian' AND i.name = 'Potato'`;

    connection.query(query, (err, results) => {
        if (err) throw err;
        console.log('Vegetarian recipes with potatoes:', results);
    });

    connection.end((err) => {
        if (err) {
            console.error('Error closing the database connection:', err);
            return;
        }
        console.log('Connection closed.');
    });
});
