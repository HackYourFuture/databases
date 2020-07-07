# Lesson 3: Data Models, Relationships, and Schemas

In the final week, the students will be introduced to SQL injections and common security practices around MySQL permissions. MongoDB, as an example of a non-relational database, will also be introduced, as well as the benefits and drawbacks of relational and non-relational models.

Objective: the students should know how SQL injections happen, and how to define user permissions in MySQL to limit the potential damage that can be done with a SQL injection. The students should also be able to compare and contrast relational (like MySQL) and NoSQL databases (considering their benefits and drawbacks).


## Pre-Class Readings

Also, please read the following pages that explains the ACID database model and connecting to MySQL from node.
- [The ACID Database Model](https://www.thoughtco.com/the-acid-model-1019731)
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
- [MySQL SHOW GRANTS](https://dev.mysql.com/doc/refman/8.0/en/show-grants.html)


## Homework

For the homework this week we will create the database and queries for an application we will continue working on in the [node js class](https://github.com/HackYourFuture-CPH/node.js). 

For those who haven't finished this part of the homework last week, now it's the time to finish :)

The application will be a meal sharing website, where users can book a reservation at a meal another user has created.

So as a user you can both
- Create a new meal for people to join
- Book a reservation at a meal

It will be kind of similar to this website: https://www.mealsharing.com/

### Data model
Lets first start with creating the data model.

Create all the sql for creating this data model: https://dbdiagram.io/d/5f0460690425da461f045a29

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
