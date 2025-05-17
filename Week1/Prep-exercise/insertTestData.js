import mysql from 'mysql2'

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'recipesdb'
})

connection.connect()

const inserts = [

  `insert into recipes (name, cooking_time) values 
    ('Borscht', 90),
    ('Pancakes', 20);`,

  `insert into ingredients (name) values 
    ('Beetroot'),
    ('Cabbage'),
    ('Potato'),
    ('Carrot'),
    ('Flour'),
    ('Milk'),
    ('Egg'),
    ('Butter');`,

  `insert into steps (instructions) values
    ('Boil beets until tender'),
    ('Grate and sauté vegetables'),
    ('Add all vegetables to pot and simmer'),
    ('Serve with sour cream'),
    ('Mix flour, milk, and eggs'),
    ('Pour batter onto pan and cook both sides'),
    ('Serve with butter or syrup');`,

  `insert into categories (name) values 
    ('Russian'),
    ('American');`,

  `insert into recipe_ingredients (recipe_id, ingredient_id, quantity) values
    (1, 1, '2 pcs'),
    (1, 2, '200g'),
    (1, 3, '2 pcs'),
    (1, 4, '1 pc'),
    (2, 5, '1 cup'),
    (2, 6, '1 cup'),
    (2, 7, '1'),
    (2, 8, '1 tbsp');`,

  `insert into recipe_steps (recipe_id, step_id, step_order) values
    (1, 1, 1),
    (1, 2, 2),
    (1, 3, 3),
    (1, 4, 4),
    (2, 5, 1),
    (2, 6, 2),
    (2, 7, 3);`,

  `insert into recipe_categories (recipe_id, category_id) values
    (1, 1),
    (2, 2);`
]

inserts.forEach((query, i) => {
  connection.query(query, err => {
    if (err) {
      console.log(`insert ${i + 1} error:`, err.sqlMessage)
    } else {
      console.log(`insert ${i + 1} ok`)
    }
  })
})

connection.end()
