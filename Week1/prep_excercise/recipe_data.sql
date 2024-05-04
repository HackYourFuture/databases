
INSERT INTO recipes_db.Category (name) VALUES 
    ('Japanese'),
    ('Cake'),
    ('Vegetarian');


INSERT INTO recipes_db.Recipe (name, category_id) VALUES 
    ('Sushi Roll', 1),
    ('Chocolate Cake', 2),
    ('Veggie Stir Fry', 3);


INSERT INTO recipes_db.Ingredient (name) VALUES 
    ('Rice'),
    ('Nori Seaweed'),
    ('Salmon'),
    ('Avocado'),
    ('Chocolate'),
    ('Flour'),
    ('Sugar'),
    ('Vegetables');


INSERT INTO recipes_db.RecipeIngredient (recipe_id, ingredient_id, quantity, unit) VALUES 
    (1, 1, 1, 'cup'),  -- Sushi Roll: 1 cup Rice
    (1, 2, 5, 'sheets'), -- Sushi Roll: 5 sheets Nori Seaweed
    (1, 3, 200, 'grams'), -- Sushi Roll: 200 grams Salmon
    (1, 4, 2, 'pieces'), -- Sushi Roll: 2 Avocadoes
    (2, 5, 200, 'grams'), -- Chocolate Cake: 200 grams Chocolate
    (2, 6, 2, 'cups'), -- Chocolate Cake: 2 cups Flour
    (2, 7, 1.5, 'cups'), -- Chocolate Cake: 1.5 cups Sugar
    (3, 8, NULL, NULL); -- Veggie Stir Fry: No specific quantity for vegetables


INSERT INTO recipes_db.Step (description) VALUES 
    ('Cook rice according to package instructions.'),
    ('Lay nori seaweed on a bamboo mat, spread rice evenly, add salmon and avocado, then roll.'),
    ('Melt chocolate in a double boiler, mix flour and sugar, then fold in melted chocolate.'),
    ('Heat a pan, add vegetables, and stir-fry until cooked.');


INSERT INTO recipes_db.RecipeStep (recipe_id, step_id, sequence_number) VALUES 
    (1, 1, 1),
    (1, 2, 2),
    (2, 3, 1),
    (3, 4, 1);
