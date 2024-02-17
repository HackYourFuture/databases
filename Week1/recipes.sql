-- Create Recipe table
CREATE TABLE Recipe (
  recipe_id INT PRIMARY KEY AUTO_INCREMENT,
  recipe_name VARCHAR(255),
  instructions TEXT
);

-- Create RecipeDetails table (One-to-One Relationship)
CREATE TABLE RecipeDetails (
  recipe_id INT PRIMARY KEY,
  preparation_time INT,
  cooking_time INT,
  servings INT,
  FOREIGN KEY (recipe_id) REFERENCES Recipe(recipe_id)
);

-- Create Ingredient table
CREATE TABLE Ingredient (
  ingredient_id INT PRIMARY KEY AUTO_INCREMENT,
  ingredient_name VARCHAR(255)
);

-- Create RecipeIngredient table (Many-to-Many Relationship)
CREATE TABLE RecipeIngredient (
  recipe_id INT,
  ingredient_id INT,
  FOREIGN KEY (recipe_id) REFERENCES Recipe(recipe_id),
  FOREIGN KEY (ingredient_id) REFERENCES Ingredient(ingredient_id),
  PRIMARY KEY (recipe_id, ingredient_id)
);

-- Create Category table
CREATE TABLE Category (
  category_id INT PRIMARY KEY AUTO_INCREMENT,
  category_name VARCHAR(255)
);

-- Create RecipeCategory table (Many-to-Many Relationship)
CREATE TABLE RecipeCategory (
  recipe_id INT,
  category_id INT,
  FOREIGN KEY (recipe_id) REFERENCES Recipe(recipe_id),
  FOREIGN KEY (category_id) REFERENCES Category(category_id),
  PRIMARY KEY (recipe_id, category_id)
);

-- Insert data into Category table
INSERT INTO Category (category_name) VALUES
('Japanese'),
('Cake'),
('Vegetarian');

-- Insert data into Ingredient table
INSERT INTO Ingredient (ingredient_name) VALUES
('Rice'),
('Nori'),
('Soy sauce'),
('Sugar'),
('Flour'),
('Eggs'),
('Milk'),
('Vegetables');

-- Insert data into Recipe table
INSERT INTO Recipe (recipe_name, instructions) VALUES
('Sushi', '1. Cook rice. 2. Prepare nori. 3. Roll rice and nori. 4. Add fillings. 5. Slice and serve.'),
('Japanese Curry', '1. Prepare vegetables. 2. Cook vegetables and meat. 3. Add curry roux. 4. Simmer until thickened.'),
('Chocolate Cake', '1. Preheat oven. 2. Mix dry ingredients. 3. Mix wet ingredients. 4. Combine wet and dry ingredients. 5. Bake.'),
('Vegetable Stir-fry', '1. Prepare vegetables. 2. Heat oil in a pan. 3. Add vegetables and stir-fry. 4. Add sauce. 5. Serve.');

-- Insert data into RecipeCategory table
INSERT INTO RecipeCategory (recipe_id, category_id) VALUES
(1, 1),
(2, 1),
(3, 2),
(4, 3);

-- Insert data into RecipeIngredient table
INSERT INTO RecipeIngredient (recipe_id, ingredient_id) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 1),
(2, 7),
(2, 8),
(3, 4),
(3, 5),
(3, 6),
(4, 7),
(4, 8);
