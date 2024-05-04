CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL
);

CREATE TABLE ingredients (
    ingredient_id INT AUTO_INCREMENT PRIMARY KEY,
    ingredient_name VARCHAR(255) NOT NULL,
    measurement_unit VARCHAR(50),
    amount DECIMAL(10, 2)
);

CREATE TABLE steps (
    step_id INT AUTO_INCREMENT PRIMARY KEY,
    step_name VARCHAR(255) NOT NULL,
    step_description TEXT
);

CREATE TABLE recipes (
    recipe_id INT AUTO_INCREMENT PRIMARY KEY,
    recipe_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

CREATE TABLE recipe_ingredients (
    recipe_id INT,
    ingredient_id INT,
    PRIMARY KEY (recipe_id, ingredient_id),
    FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(ingredient_id)
);

CREATE TABLE recipe_steps (
    recipe_id INT,
    step_id INT,
    step_order INT,
    PRIMARY KEY (recipe_id, step_id),
    FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id),
    FOREIGN KEY (step_id) REFERENCES steps(step_id)
);
