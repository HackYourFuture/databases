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


### Part 1: Working with tasks

Write the following sql queries:
- Add a task with these attributes: `title, description, created, updated, due_date, status_id, user_id`
- Change the title of a task
- Change a task due date
- Change a task status
- Mark a task as complete
- Delete a task

In all the above queries, you choose which is the task that you will modify/delete.


### Part 2: School database

- Create a new database containing the following tables:
    - **Class**: with the columns: id, name, begins (date), ends (date)
    - **Student**: with the columns: id, name, email, phone, class_id (foreign key)
- If you are done with the above tasks, you can continue with these advanced tasks:
    - Create an index on the name column of the student table.
    - Add a new column to the class table named **status** which can only have the following values: not-started, ongoing, finished (hint: enumerations).


### Part 3: More queries

You should do these queries on the database `hyf_lesson2`, which we created last class.
You can find the data [here](https://github.com/HackYourFuture-CPH/databases/blob/class12/lesson2/lesson2-data.sql) if you need to create the DB again.

- Get all the tasks assigned to users whose email ends in `@spotify.com`
- Get all the tasks for 'Donald Duck' with status 'Not started'
- Get all the tasks for 'Maryrose Meadows' that were created in september (hint: `month(created)=month_number`)
- Find how many tasks where created in each month, e.g. how many tasks were created in october, how many tasks were created in november, etc. (hint: use group by)


### Part 4: Meal application

By the end of the DB module we want to have created a database and respective CRUD queries for an application that we will continue working on in the [node js class](https://github.com/HackYourFuture-CPH/node.js).

So we will start working on it this week. It is not crucial that you finish everything this week, but you'll definitely have to finish it next week. And if you start early you'll have a chance to ask more questions :)

The application will be a meal sharing website, where users can book a reservation at a meal another user has created.

So as a user you can both
- Create a new meal for people to join
- Book a reservation at a meal

It will be kind of similar to this website: https://www.mealsharing.com/

### Data model
Lets first start with creating the data model.

Create all the sql for creating this data model: https://dbdiagram.io/d/5d5bff66ced98361d6ddc18c

### Queries

Create these queries

### Meal

|  Queries to write |
| ---- |
| Get all meals |
| Add a new meal |
| Get a meal with any id, fx 1 |
| Update a meal with any id, fx 1. Update any attribute fx the title or multiple attributes |
| Delete a meal with any id, fx 1 |


### Reservation

|  Queries to write |
| ---- |
| Get all reservations |
| Add a new reservation |
| Get a reservation with any id, fx 1 |
| Update a reservation with any id, fx 1. Update any attribute fx the title or multiple attributes |
| Delete a reservation with any id, fx 1 |

### Review

|  Queries to write |
| ---- |
| Get all reviews |
| Add a new review |
| Get a review with any id, fx 1 |
| Update a review with any id, fx 1. Update any attribute fx the title or multiple attributes |
| Delete a review with any id, fx 1 |

### Additional queries

Now add a couple of different meals, reservations and reviews with different attributes. With those meals create the following queries

|  Functionality |
| ---- |
| Get meals that has a price smaller than a specific price fx 90 |
| Get meals that still has available reservations |
| Get meals that partially match a title. `Rød grød med` will match the meal with the title `Rød grød med fløde` |
| Get meals that has been created between two dates |
| Get only specific number of meals fx return only 5 meals |
| Get the meals that have good reviews |
| Get reservations for a specific meal sorted by created_date |
| Sort all meals by average number of stars in the reviews |


