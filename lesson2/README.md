# Lesson 2: Data Models, Relationships, and Schemas

In this class, students will learn how to use more complex SQL queries to retrieve information across tables, and interact with data including write operations.

Objective: Students should be able to build CRUD functionality using SQL statements, including INSERT INTO, UPDATE and DELETE. Students should also be able to create an entity relationship diagram based on a qualitative description of data requirements, and translate that into a MySQL database schema.


## Pre-Class Readings
- [Falsehoods Programmers Believe About Names](http://www.kalzumeus.com/2010/06/17/falsehoods-programmers-believe-about-names/)
- [What is a Database Foreign Key](http://databases.about.com/cs/specificproducts/g/foreignkey.htm)
- [Example Entity Relationship Diagram (including associative entities)](http://users.csc.calpoly.edu/~jdalbey/308/Lectures/HOWTO-ERD.html)

## Main Topics

- Data definition language
    - Creating tables
    - Altering tables
    - Indexes
- Foreign key constraints
- INSERT INTO
- UPDATE
- DELETE
- More complex entity relationship diagrams
    - Associative entities from many-to-many relationships
    - Introduction to normalisation
- Complicated values to store in MySQL
    - Storing prices (floating point errors)
    - Storing date and time (datetime vs. timestamp)
    - Timezones when storing date and time
- Creating an ER model and a database from existing data



## Reference Material

- [Floating Point Inaccuracy](http://stackoverflow.com/questions/2100490/floating-point-inaccuracy-examples#2100502)
- [TutorialsPoint MySQL Introduction](http://www.tutorialspoint.com/mysql/mysql-introduction.htm)
- [w3schools tutorial (easy to find how specific commands work)](https://www.w3schools.com/sql/default.asp)
- [Official MySQL Documentation](https://dev.mysql.com/doc/refman/5.7/en/)


## Homework

### Working with tasks

Write the following sql queries:
- Add a task with these attributes: `title, description, created, updated, due_date, status_id, user_id`
- Change the title of a task
- Change a task due date
- Change a task status
- Mark a task as complete
- Delete a task


### Creating a database

Using an entity relationship diagram, design the data model for an application of your choice. This can be anything, previous students have used a small business (with staff, offices, and job titles), a library (with books, genres, racks, members, and a borrowing log), or a farm (with animals, barns, and farmers).

Your application must include at least one many-to-many relationship and any supporting tables (linking tables) that are needed. The entity relationship diagram must describe what tables you will need, the columns in these tables, which column is the primary key, and the relationships between tables.

Next, using the entity relationship diagram as a starting point, write all the necessary `CREATE TABLE` statements to create all tables and relationships (foreign key constraints) for this data model.

Submit an image or PDF of your entity relationship diagram, and a `.sql` file with the `CREATE TABLE` statements.
