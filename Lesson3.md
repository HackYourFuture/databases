# Lesson 3: Data Models, Relationships, and Schemas

In the final week, additional theory will be covered to discuss more complex relational data. Students will learn about entity relationship modelling and how to convert these models to a database schema using normalisation and foreign-key constraints. Non-relational data will also be considered, as well as the benefits and drawbacks of relational and non-relational models.

Objective: Students should be able to create an entity relationship diagram based on a qualatative description of data requirements, and translate that into a MySQL database schema. Students should also be able to compare and contrast relational (like MySQL) and NoSQL databases (considering their benefits and drawbacks).

## Pre-Class Readings

- [Choosing Primary Keys](https://www.youtube.com/watch?v=DWaYW5zjWIc&index=14&list=PLYlr48f6CaXtlkXcGMUD49wHmvC7ZTiD0)
- [Creating Relationships](https://www.youtube.com/watch?v=fYBYVk50Aj8&index=16&list=PLYlr48f6CaXtlkXcGMUD49wHmvC7ZTiD0)
- [Defining One-to-Many Relationships](https://www.youtube.com/watch?v=e_7x36a3mig&index=17&list=PLYlr48f6CaXtlkXcGMUD49wHmvC7ZTiD0)
- [Exploring One-to-One Relationships](https://www.youtube.com/watch?v=dsAXn7-FBwA&index=18&list=PLYlr48f6CaXtlkXcGMUD49wHmvC7ZTiD0)
- [Exploring Many-to-Many Relationships](https://www.youtube.com/watch?v=cClFvLkOosM&index=19&list=PLYlr48f6CaXtlkXcGMUD49wHmvC7ZTiD0)
- [Understanding Relationship Rules and Referential Integrity](https://www.youtube.com/watch?v=L25ry8JzOCM&index=20&list=PLYlr48f6CaXtlkXcGMUD49wHmvC7ZTiD0)
- [Defining Table Relationships](https://www.youtube.com/watch?v=V5DyvUfsboA)
- [What is a Database Foreign Key](http://databases.about.com/cs/specificproducts/g/foreignkey.htm)
- [NoSQL databases](https://www.youtube.com/watch?v=3T79h-vyYzc&list=PLYlr48f6CaXtlkXcGMUD49wHmvC7ZTiD0&index=39)
- [Rewatch previously recorded session of this week]( https://www.youtube.com/watch?v=ZNLhHUDj6jo)

## Main Topics

- More complex entity relationship diagrams
    - Associative entities from many-to-many relationships
    - Introduction to normalisation
- Foreign key constraints
- Complicated values to store in MySQL
    - Storing prices (floating point errors)
    - Storing dates (datetime vs. timestamp)
- CREATE TABLE syntax
- Brief introduction to non-relational data
- Scaffolding and application generators

## Reference Material

- [Floating Point Inaccuracy](http://stackoverflow.com/questions/2100490/floating-point-inaccuracy-examples#2100502)
- [Example Entity Relationship Diagram (including associative entities)](http://users.csc.calpoly.edu/~jdalbey/308/Lectures/HOWTO-ERD.html)
- Scaffolding tools:
    - [Yeoman](http://yeoman.io) - General framework for creating and scaffolding all types of projects
    - [Sails](http://sails.js) - Lightweight framework for generating APIs and web server apps in Node
    - [Loopback](http://loopback.io/) - A more "enterprise-ready" framework for generating and managing APIs.

## Homework

For this week's homework, please describe the entity relationships for the data model in your application (one to one, one to many, many to many). Then design the database schema including what tables you will need, the columns in these tables, which column is the primary key, and any foreign key constraints between tables.
