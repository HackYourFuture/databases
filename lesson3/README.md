# Lesson 3: Data Models, Relationships, and Schemas

In the final week, students will learn how to use NodeJS to interact with a MySQL database. MongoDB, as an example of a non-relational database, will also be introduced, as well as the benefits and drawbacks of relational and non-relational models.

Objective: Students will have a basic understanding of database usage in a web application, including parameter validation, escaping, and prepared statements. Students should also be able to compare and contrast relational (like MySQL) and NoSQL databases (considering their benefits and drawbacks).


## Pre-Class Readings

Also, please read the following pages that explains the ACID database model and connecting to MySQL from node.
- [The ACID Database Model](https://www.thoughtco.com/the-acid-model-1019731)
- [Node MySQL Documentation on Github](https://github.com/mysqljs/mysql)
- [Why you should never use MongoDB](http://www.sarahmei.com/blog/2013/11/11/why-you-should-never-use-mongodb)


## Main Topics

- Security
    - SQL Injection
    - User GRANTS
- Introduction to non-relational data with MongoDB
    - MongoDB vs. SQL
    - Create/Drop database
    - Insert/Update/Delete data
    - Query data
    - Relationships: embedded vs. referenced
    - Replication and sharding
    - Atomicity


## Reference Material

- [OWASP on SQL Injection](https://www.owasp.org/index.php/SQL_injection)
- [Parameter Validation on Wikipedia](https://en.wikipedia.org/wiki/Parameter_validation)
- [Node MySQL Escaping Query Values](https://github.com/mysqljs/mysql#escaping-query-values)
- [Node MySQL Preparing Queries (automatic escaping)](https://github.com/mysqljs/mysql#preparing-queries)
- [MySQL SHOW GRANTS](https://dev.mysql.com/doc/refman/5.7/en/show-grants.html)

## Homework

### Part 1: Creating a database

Using an entity relationship diagram, design the data model for an application of your choice. This can be anything, previous students have used a small business (with staff, offices, and job titles), a library (with books, genres, racks, members, and a borrowing log), or a farm (with animals, barns, and farmers).

Your application must include at least one many-to-many relationship and any supporting tables (linking tables) that are needed. The entity relationship diagram must describe what tables you will need, the columns in these tables, which column is the primary key, and the relationships between tables.

Next, using the entity relationship diagram as a starting point, write all the necessary `CREATE TABLE` statements to create all tables and relationships (foreign key constraints) for this data model.

Submit an image or PDF of your entity relationship diagram, and a `.sql` file with the `CREATE TABLE` statements.


### Part 2: Meal application

For the homework this week we will create the database and queries for an application we will continue working on in the [node js class](https://github.com/HackYourFuture-CPH/node.js). 

For those who haven't finished this part of the homework last week, now it's the time to finish :)

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

