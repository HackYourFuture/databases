# Lesson 3: Data Models, Relationships, and Schemas

In the final week, additional theory will be covered to discuss more complex relational data. Students will learn about entity relationship modelling and how to convert these models to a database schema using normalisation and foreign-key constraints. Non-relational data will also be considered, as well as the benefits and drawbacks of relational and non-relational models.

Objective: Students should be able to create an entity relationship diagram based on a qualitative description of data requirements, and translate that into a MySQL database schema. Students should also be able to compare and contrast relational (like MySQL) and NoSQL databases (considering their benefits and drawbacks).

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
    - Storing date and time (datetime vs. timestamp)
    - Timezones when storing date and time
- Brief introduction to non-relational data
- Scaffolding and application generators
- Creating an ER model and a database from existing data

## Reference Material

- [Floating Point Inaccuracy](http://stackoverflow.com/questions/2100490/floating-point-inaccuracy-examples#2100502)
- [Example Entity Relationship Diagram (including associative entities)](http://users.csc.calpoly.edu/~jdalbey/308/Lectures/HOWTO-ERD.html)
- Scaffolding tools:
    - [Yeoman](http://yeoman.io) - General framework for creating and scaffolding all types of projects
    - [Sails](http://sails.js) - Lightweight framework for generating APIs and web server apps in Node
    - [Loopback](http://loopback.io/) - A more "enterprise-ready" framework for generating and managing APIs.
- [Rewatch the previously recorded session](https://www.youtube.com/watch?v=ZNLhHUDj6jo)

## Homework

For the homework this week we will create the database and queries for an application we will continue working on in the [node js class](https://github.com/HackYourFuture-CPH/node.js). 

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

