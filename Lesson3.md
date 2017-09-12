# Lesson 3: Data Models, Relationships, and Schemas

In the final week, additional theory will be covered to discuss more complex relational data. Students will learn about entity relationship modelling and how to convert these models to a database schema using normalisation and foreign-key constraints. Non-relational data will also be considered, as well as the benefits and drawbacks of relational and non-relational models.

Objective: Students should be able to create an entity relationship diagram based on a qualatative description of data requirements, and translate that into a MySQL database schema. Students should also be able to compare and contrast relational (like MySQL) and NoSQL databases (considering their benefits and drawbacks).

## Pre-Class Readings

Before arriving to class on Sunday, please watch all of the videos in [this video playlist](https://www.lynda.com/SharedPlaylist/ae29ea2f495c432793abc220da47baa6) on Lynda.
- Choosing Primary Keys
- Defining One-to-Many Relationships
- Exploring One-to-One Relationships
- Exploring Many-to-Many Relationships
- Understanding Relationship Rules and Referential Integrity
- Defining Table Relationships
- NoSQL databases
- GraphQL: Introduction and History
- Why use GraphQL?

Also, please read the following page that explains database foreign keys.
- [What is a Database Foreign Key](http://databases.about.com/cs/specificproducts/g/foreignkey.htm)

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
- [Rewatch the previously recorded session](https://www.youtube.com/watch?v=ZNLhHUDj6jo)

## Homework

For this week's homework:

Using an entity relationship diagram, design the data model for an application of your choice; this could be anything, but previous students have used a small business (with staff, offices, and job titles), a library (with books, genres, racks, members, and a borrowing log), or a farm (with animals, barns, and farmers). Your application must include at least one many-to-many relationship and any supporting tables (associative entities) that are needed. The entity relationship diagram must describe what tables you will need, the columns in these tables, which column is the primary key, and the relationships between tables.

Next, using the entity relationship diagram as a starting point, write all the necessary `CREATE TABLE` statements to create all tables and relationships (foreign key constraints) for this data model.

Submit an image or PDF of your entity relationship diagram, and a `.sql` file with the `CREATE TABLE` statements.

## Check out the React repo [here](https://github.com/HackYourFuture/React)
And find out how you can prepare for the first React lecture :dancers: