-- Inserting test data into the Recipes table
INSERT INTO Recipes (recipe_id, recipe_name, cooking_time, preparation_time, spiciness) VALUES
(1, 'Spaghetti Carbonara', 30, 15, 2),
(2, 'Margherita Pizza', 20, 30, 1),
(3, 'Chicken Curry', 40, 20, 4);

-- Inserting test data into the Ingredients table
INSERT INTO Ingredients (ingredient_id, ingredient_name) VALUES
(1, 'Pasta'),
(2, 'Bacon'),
(3, 'Eggs'),
(4, 'Cheese'),
(5, 'Tomato Sauce'),
(6, 'Pizza Dough'),
(7, 'Mozzarella'),
(8, 'Basil'),
(9, 'Chicken'),
(10, 'Curry Powder'),
(11, 'Coconut Milk');

-- Inserting test data into the Directions table
INSERT INTO Directions (direction_id, instruction) VALUES
(1, 'Boil pasta until al dente.'),
(2, 'Cook bacon until crispy.'),
(3, 'Mix eggs and cheese in a bowl.'),
(4, 'Combine pasta with bacon, eggs, and cheese.'),
(5, 'Spread tomato sauce on prepared pizza dough.'),
(6, 'Top with slices of mozzarella and fresh basil.'),
(7, 'Bake in preheated oven at 220C for 15 minutes.'),
(8, 'Brown chicken pieces in a skillet.'),
(9, 'Add curry powder and other spices.'),
(10, 'Pour in coconut milk and simmer until chicken is cooked through.');

-- Inserting test data into the RecipeDirections table
INSERT INTO RecipeDirections (recipe_id, direction_id, step_number) VALUES
(1, 1, 1),
(1, 2, 2),
(1, 3, 3),
(1, 4, 4),
(2, 5, 1),
(2, 6, 2),
(2, 7, 3),
(3, 8, 1),
(3, 9, 2),
(3, 10, 3);

-- Inserting test data into the Categories table
INSERT INTO Categories (category_id, category_name) VALUES
(1, 'Italian'),
(2, 'Fast Food'),
(3, 'Indian');

-- Inserting test data into the RecipeCategories table
INSERT INTO RecipeIngredients (recipe_id, ingredient_id, quantity, unit, prep_type) VALUES
(1, 1, 100, 'grams', 'None'),
(1, 2, 50, 'grams', 'Sliced'),
(1, 3, 2, 'units', 'None'),
(1, 4, 50, 'grams', 'Shredded'),
(2, 5, 100, 'grams', 'None'),
(2, 6, 1, 'unit', 'None'),
(2, 7, 100, 'grams', 'Sliced'),
(2, 8, 5, 'leaves', 'None'),
(3, 9, 200, 'grams', 'Cubed'),
(3, 10, 2, 'tablespoons', 'None'),
(3, 11, 400, 'ml', 'None');

-- Inserting test data into the RecipeIngredients table
INSERT INTO RecipeCategories (recipe_id, category_id) VALUES
(1, 1),
(2, 1),
(2, 2),
(3, 3);
