
CREATE TABLE recipes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE ingredients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE steps (
  id SERIAL PRIMARY KEY,
  description TEXT NOT NULL
);

CREATE TABLE recipe_categories (
  recipe_id INT REFERENCES recipes(id),
  category_id INT REFERENCES categories(id),
  PRIMARY KEY (recipe_id, category_id)
);

CREATE TABLE recipe_ingredients (
  recipe_id INT REFERENCES recipes(id),
  ingredient_id INT REFERENCES ingredients(id),
  PRIMARY KEY (recipe_id, ingredient_id)
);

CREATE TABLE recipe_steps (
  recipe_id INT REFERENCES recipes(id),
  step_id INT REFERENCES steps(id),
  PRIMARY KEY (recipe_id, step_id)
);


