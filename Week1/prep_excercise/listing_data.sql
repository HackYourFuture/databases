SELECT recipe_id, name FROM recipes_db.Recipe;

SELECT r.recipe_id, r.name FROM Recipe r
INNER JOIN Category c ON r.category_id = c.category_id
WHERE c.name = 'Japanese';