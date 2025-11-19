-- table "steps" was cut as nonlicuide

-- What nationality does the dish belong to
CREATE TABLE cuisines (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- who create a dish (cafe, home, restaurant, etc)
CREATE TABLE places (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- core ingredients table (only general ones like chicken, beef, fish, etc)
CREATE TABLE main_ingredients (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- cooking methods table
CREATE TABLE cooking_methods (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- recipes table (GENERAL TABLE FOR ALL RECIPES)
CREATE TABLE recipes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    cuisine_id INT,
    place_id INT,
    main_ingredient_id INT,
    FOREIGN KEY (cuisine_id) REFERENCES cuisines(id),
    FOREIGN KEY (place_id) REFERENCES places(id),
    FOREIGN KEY (main_ingredient_id) REFERENCES main_ingredients(id)
);

-- categories table custom tags for recipes (morning, dessert, quick, dinner, etc)
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- categories many-to-many relationship table
CREATE TABLE recipe_categories (
    recipe_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (recipe_id, category_id),
    FOREIGN KEY (recipe_id) REFERENCES recipes(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- all ingredients table
CREATE TABLE ingredients (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- all-ingredients many-to-many relationship table
CREATE TABLE recipe_ingredients (
    recipe_id INT NOT NULL,
    ingredient_id INT NOT NULL,
    amount VARCHAR(50),
    PRIMARY KEY (recipe_id, ingredient_id),
    FOREIGN KEY (recipe_id) REFERENCES recipes(id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
);

-- cooking_methods many-to-many relationship table
CREATE TABLE recipe_cooking_methods (
    recipe_id INT NOT NULL,
    cooking_method_id INT NOT NULL,
    PRIMARY KEY (recipe_id, cooking_method_id),
    FOREIGN KEY (recipe_id) REFERENCES recipes(id),
    FOREIGN KEY (cooking_method_id) REFERENCES cooking_methods(id)
);
