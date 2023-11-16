-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Nov 11, 2023 at 10:45 PM
-- Server version: 5.7.24
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `userdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `recipe`
--





/*Recipe Table*/
CREATE TABLE Recipes (
    RecipeID INT PRIMARY KEY,
    RecipeName VARCHAR(255),
    Description TEXT,
   
);
/*Categories Table*/
CREATE TABLE Categories (
    CategoryID INT PRIMARY KEY,
    Category VARCHAR
);
/*Ingredients Table*/
CREATE TABLE Instruction (
    instruction_id Integer NOT NULL,
    instruction_description TEXT NOT NULL,
    
);
/*Steps Table*/
CREATE TABLE Steps (
    StepID INT PRIMARY KEY,
    StepDescription TEXT
);
/*RecipeCategory Junction Table*/
CREATE TABLE RecipeCategory (
    RecipeID INT,
    CategoryID INT,
    FOREIGN KEY (RecipeID) REFERENCES Recipes(RecipeID),
    FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID)
);


/*RecipeIngredent  Table*/
CREATE TABLE RecipeIngredient (
    RecipeID INT,
    IngredientID INT,
    Quantity VARCHAR(255),
    FOREIGN KEY (RecipeID) REFERENCES Recipes(RecipeID),
    FOREIGN KEY (IngredientID) REFERENCES Ingredients(IngredientID)
);



/*RecipeSteps Table*/
CREATE TABLE RecipeStep (
    RecipeID INT,
    StepID INT,
    StepOrder INT,
    FOREIGN KEY (RecipeID) REFERENCES Recipes(RecipeID),
    FOREIGN KEY (StepID) REFERENCES Steps(StepID)
);




