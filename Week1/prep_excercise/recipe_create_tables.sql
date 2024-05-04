CREATE TABLE Category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE Recipe (
    recipe_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category_id INTEGER REFERENCES Category(category_id)
);

CREATE TABLE Ingredient (
    ingredient_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE RecipeIngredient (
    recipe_id INTEGER REFERENCES Recipe(recipe_id),
    ingredient_id INTEGER REFERENCES Ingredient(ingredient_id),
    quantity NUMERIC,
    unit VARCHAR(20),
    PRIMARY KEY (recipe_id, ingredient_id)
);

CREATE TABLE Step (
    step_id SERIAL PRIMARY KEY,
    description TEXT NOT NULL
);

CREATE TABLE RecipeStep (
    recipe_id INTEGER REFERENCES Recipe(recipe_id),
    step_id INTEGER REFERENCES Step(step_id),
    sequence_number INTEGER,
    PRIMARY KEY (recipe_id, step_id)
);
 