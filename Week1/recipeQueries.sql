-- Query to get all the ingredients for a particular recipe if you know the recipe_id;
SELECT Ingredients.ingredient_name
FROM Ingredients
JOIN RecipeIngredients ON Ingredients.ingredient_id = RecipeIngredients.ingredient_id
WHERE RecipeIngredients.recipe_id = 1;

-- Query to get all the ingredients for a particular recipe if you know the recipe_name
SELECT ingredient_name, recipe_name, cooking_time, preparation_time, spiciness 
FROM recipes AS r 
JOIN recipeingredients AS ri 
ON r.recipe_id = ri.recipe_id 
JOIN ingredients AS i  
ON i.ingredient_id = ri.ingredient_id 
WHERE r.recipe_name like '%Spaghetti%'

-- Query to get all the directions for a particular recipe if you know the recipe_name
SELECT r.recipe_name, d.instruction, dr.step_number
FROM recipes AS r
JOIN recipedirections AS dr
ON r.recipe_id = dr.recipe_id
JOIN directions AS d
ON dr.direction_id = d.direction_id
WHERE r.recipe_name LIKE '%Spaghetti%'
ORDER BY dr.step_number;

-- You should be able to list recipes under a single category e.g. Italian
SELECT r.recipe_name, c.category_name
FROM recipes AS r
JOIN recipecategories AS rc
ON r.recipe_id = rc.recipe_id
JOIN categories AS c
ON c.category_id = rc.category_id
WHERE c.category_name = 'Italian';