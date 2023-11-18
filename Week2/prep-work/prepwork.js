const mysql = require('mysql2');




const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'Recipe',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


function executeQuery(description, query, callback) {
  pool.query(query, (err, results) => {
    if (err) {
      console.error(`Error executing query (${description}):`, err);
      return;
    }

    console.log(`* ${description}? ----> results:`);

   
    const recipeNames = results.map((result) => result.name);

   
    if (recipeNames.length > 0) {
      console.log(recipeNames.join(', '));
    } else {
      console.log('No recipes found');
    }

    
    console.log('\n');

    //callback function
    if (callback) {
      callback();
    }
  });
}


const recipeQueries = [
  {
    description: 'Vegetarian recipes with potatoes',
    query:
      `    SELECT R.name
      FROM Recipes R
        JOIN RecipeCategories RC ON R.recipe_id = RC.recipe_id
        JOIN Categories C ON RC.category_id = C.category_id
      WHERE C.name = 'Vegetarian'
        AND R.ingredients LIKE '%Potatoes%';
    `,
  },
  {
    description: 'Cakes that do not need baking',
    query:`
      SELECT r.name
      FROM Recipes r
        JOIN RecipeCategories rc ON r.recipe_id = rc.recipe_id
        JOIN Categories c ON rc.category_id = c.category_id
      WHERE c.name = 'No-Bake'
        AND R.steps NOT LIKE '%Bake%';
    `,
  },
  {
    description: 'Vegan and Japanese recipes',
    query: `
    SELECT r.name
      FROM Recipes r
        JOIN RecipeCategories rc ON r.recipe_id = rc.recipe_id
        JOIN Categories c ON rc.category_id = c.category_id
      WHERE c.name IN ('Vegan', 'Japanese');
    `,
  },
];


function executeQueries(index) {
  if (index < recipeQueries.length) {
    const { description, query } = recipeQueries[index];
    executeQuery(description, query, () => executeQueries(index + 1));
  } else {
   
    pool.end();
  }
}


executeQueries(0);
