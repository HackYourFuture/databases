CREATE DATABASE IF NOT EXISTS YemeniRecipesDB;

USE YemeniRecipesDB;

CREATE TABLE IF NOT EXISTS Category (
    category_id INT AUTO_INCREMENT,
    category_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (category_id),
    UNIQUE (category_name)
);

CREATE TABLE IF NOT EXISTS Ingredient (
    ingredient_id INT AUTO_INCREMENT,
    ingredient_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (ingredient_id),
    UNIQUE (ingredient_name)
);

CREATE TABLE IF NOT EXISTS Step (
    step_id INT AUTO_INCREMENT,
    step_description TEXT NOT NULL,
    PRIMARY KEY (step_id)
);

CREATE TABLE IF NOT EXISTS Recipe (
    recipe_id INT AUTO_INCREMENT,
    recipe_name VARCHAR(100) NOT NULL,
    recipe_description TEXT,
    PRIMARY KEY (recipe_id)
);

CREATE TABLE IF NOT EXISTS Recipe_Category (
    recipe_id INT,
    category_id INT,
    PRIMARY KEY (recipe_id, category_id),
    FOREIGN KEY (recipe_id) REFERENCES Recipe(recipe_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES Category(category_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Recipe_Ingredient (
    recipe_id INT,
    ingredient_id INT,
    PRIMARY KEY (recipe_id, ingredient_id),
    FOREIGN KEY (recipe_id) REFERENCES Recipe(recipe_id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES Ingredient(ingredient_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Recipe_Step (
    recipe_id INT,
    step_id INT,
    step_order INT,
    PRIMARY KEY (recipe_id, step_id),
    FOREIGN KEY (recipe_id) REFERENCES Recipe(recipe_id) ON DELETE CASCADE,
    FOREIGN KEY (step_id) REFERENCES Step(step_id) ON DELETE CASCADE
);

INSERT INTO Category (category_name)
VALUES ('Main Course'), ('Dessert'), ('Snack');

INSERT INTO Ingredient (ingredient_name)
VALUES ('Flour'), ('Rice'), ('Chicken'), ('Tomatoes'), ('Onions'), ('Spices'), ('Honey'), ('Butter');

INSERT INTO Step (step_description)
VALUES ('Combine flour and spices'),
       ('Roast chicken until golden brown'),
       ('Cook rice until tender'),
       ('Saute onions and tomatoes'),
       ('Mix honey with butter');

INSERT INTO Recipe (recipe_name, recipe_description)
VALUES ('Mandi', 'Traditional Yemeni rice dish with roasted meat or chicken'),
       ('Bint al-Sahn', 'Yemeni dessert made with honey and butter'),
       ('Fassah', 'Yemeni tomato-based stew');

INSERT INTO Recipe_Category (recipe_id, category_id)
VALUES (1, 1),
       (2, 2),
       (3, 1);

INSERT INTO Recipe_Ingredient (recipe_id, ingredient_id)
VALUES (1, 2),
       (1, 3),
       (1, 6),
       (2, 1),
       (2, 7),
       (2, 8),
       (3, 4),
       (3, 5);

INSERT INTO Recipe_Step (recipe_id, step_id, step_order)
VALUES (1, 2, 1),
       (1, 3, 2),
       (2, 5, 1),
       (3, 4, 1);
