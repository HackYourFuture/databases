import mysql from 'mysql2'

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'recipesdb',
})

connection.connect()

const createRecipes = `
  create table recipes (
    id int auto_increment primary key,
    name varchar(100),
    cooking_time int
  );
`

const createIngredients = `
  create table ingredients (
    id int auto_increment primary key,
    name varchar(100)
  );
`

const createSteps = `
  create table steps (
    id int auto_increment primary key,
    instructions varchar(255)
  );
`

const createCategories = `
  create table categories (
    id int auto_increment primary key,
    name varchar(100)
  );
`

const createRecipeIngredients = `
  create table recipe_ingredients (
    primary key (recipe_id, ingredient_id),
    recipe_id int,
    ingredient_id int,
    quantity varchar(50),
    foreign key (recipe_id) references recipes(id),
    foreign key (ingredient_id) references ingredients(id)
  );
`

const createRecipeSteps = `
  create table recipe_steps (
    primary key (recipe_id, step_id),
    recipe_id int,
    step_id int,
    step_order int,
    foreign key (recipe_id) references recipes(id),
    foreign key (step_id) references steps(id)
  );
`

const createRecipeCategories = `
  create table recipe_categories (
    primary key (recipe_id, category_id),
    recipe_id int,
    category_id int,
    foreign key (recipe_id) references recipes(id),
    foreign key (category_id) references categories(id)
  );
`

const queries = [
  createRecipes,
  createIngredients,
  createSteps,
  createCategories,
  createRecipeIngredients,
  createRecipeSteps,
  createRecipeCategories,
]

queries.forEach((q) => {
  connection.query(q, (err) => {
    if (err) console.log('error:', err.sqlMessage)
    else console.log('ok')
  })
})

connection.end()
