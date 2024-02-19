CREATE TABLE Recipes (
    recipe_id INT PRIMARY KEY,
    recipe_name VARCHAR(255) NOT NULL,
    cooking_time INT, -- in minutes
    preparation_time INT, -- in minutes
    spiciness INT -- scale of 1-5, 1 being not spicy, 5 being very spicy
);

CREATE TABLE Ingredients (
    ingredient_id INT PRIMARY KEY,
    ingredient_name VARCHAR(255) NOT NULL
);

CREATE TABLE Directions (
    direction_id INT PRIMARY KEY,
    instruction TEXT NOT NULL
);

CREATE TABLE Categories (
    category_id INT PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL
);

CREATE TABLE RecipeDirections (
    recipe_id INT,
    direction_id INT,
    step_number INT,
    PRIMARY KEY (recipe_id, direction_id),
    FOREIGN KEY (recipe_id) REFERENCES Recipes(recipe_id),
    FOREIGN KEY (direction_id) REFERENCES Directions(direction_id)
);

CREATE TABLE RecipeCategories (
    recipe_id INT,
    category_id INT,
    PRIMARY KEY (recipe_id, category_id),
    FOREIGN KEY (recipe_id) REFERENCES Recipes(recipe_id),
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);

CREATE TABLE RecipeIngredients (
    recipe_id INT,
    ingredient_id INT,
    quantity DECIMAL(10,2), -- e.g., 1.5, 100, etc.
    unit VARCHAR(255), -- e.g., grams, ml, units, etc.
    prep_type VARCHAR(255), -- e.g., chopped, diced, etc.
    PRIMARY KEY (recipe_id, ingredient_id),
    FOREIGN KEY (recipe_id) REFERENCES Recipes(recipe_id),
    FOREIGN KEY (ingredient_id) REFERENCES Ingredients(ingredient_id)
);