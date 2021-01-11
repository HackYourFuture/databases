# Lesson 3: Security and Non-Relational Databases

In the final week, the students will be introduced to SQL injections and common security practices around MySQL permissions. MongoDB, as an example of a non-relational database, will also be introduced, as well as the benefits and drawbacks of relational and non-relational models.

Objective: the students should know how SQL injections happen, and how to define user permissions in MySQL to limit the potential damage that can be done with a SQL injection. The students should also be able to compare and contrast relational (like MySQL) and NoSQL databases (considering their benefits and drawbacks).

## Pre-Class Readings

Please read the following pages that explains the ACID database model:

- [The ACID Database Model](https://www.thoughtco.com/the-acid-model-1019731)
- [Why you should never use MongoDB](http://www.sarahmei.com/blog/2013/11/11/why-you-should-never-use-mongodb)

Also the students should watch this video: https://youtu.be/HSt4nlUIF-A

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
- [Advanced database schema exercise](social_media_exercise.md)

## Reference Material

- [OWASP on SQL Injection](https://owasp.org/www-community/attacks/SQL_Injection)
- [Parameter Validation on Wikipedia](https://en.wikipedia.org/wiki/Parameter_validation)
- [Node MySQL Escaping Query Values](https://github.com/mysqljs/mysql#escaping-query-values)
- [Node MySQL Preparing Queries (automatic escaping)](https://github.com/mysqljs/mysql#preparing-queries)
- [MySQL SHOW GRANTS](https://dev.mysql.com/doc/refman/8.0/en/show-grants.html)

## Get git ready to work on homework

Using the `hyf-homework` repo. In the terminal run `git status`

If there are changes that have not been committed, figure out what to do with those changes

- Should they be committed to another branch?
- Should they be committed to `master`?
- Should they be discarded?

When you have figured out what to do with the changes and fixed those. Write `git status` again. If it says `nothing to commit, working tree clean`. Then you are ready to create the branch for this weeks homework.

### Creating the branch

Using the `hyf-homework` repo write this command

`git checkout master` - You are now on the `master` branch

`git checkout -b databases/week3`

This will create and checkout the branch so you are ready make commits to it

[This video](https://www.youtube.com/watch?v=XYlgh9hSWtw) can help. On slack use the #git-support channel to ask questions about git

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

| Queries to write                                                                          |
| ----------------------------------------------------------------------------------------- |
| Get all meals                                                                             |
| Add a new meal                                                                            |
| Get a meal with any id, fx 1                                                              |
| Update a meal with any id, fx 1. Update any attribute fx the title or multiple attributes |
| Delete a meal with any id, fx 1                                                           |

### Reservation

| Queries to write                                                                                 |
| ------------------------------------------------------------------------------------------------ |
| Get all reservations                                                                             |
| Add a new reservation                                                                            |
| Get a reservation with any id, fx 1                                                              |
| Update a reservation with any id, fx 1. Update any attribute fx the title or multiple attributes |
| Delete a reservation with any id, fx 1                                                           |

### Review

| Queries to write                                                                            |
| ------------------------------------------------------------------------------------------- |
| Get all reviews                                                                             |
| Add a new review                                                                            |
| Get a review with any id, fx 1                                                              |
| Update a review with any id, fx 1. Update any attribute fx the title or multiple attributes |
| Delete a review with any id, fx 1                                                           |

### Additional queries

Now add a couple of different meals, reservations and reviews with different attributes. With those meals create the following queries

| Functionality                                                                                                  |
| -------------------------------------------------------------------------------------------------------------- |
| Get meals that has a price smaller than a specific price fx 90                                                 |
| Get meals that still has available reservations                                                                |
| Get meals that partially match a title. `Rød grød med` will match the meal with the title `Rød grød med fløde` |
| Get meals that has been created between two dates                                                              |
| Get only specific number of meals fx return only 5 meals                                                       |
| Get the meals that have good reviews                                                                           |
| Get reservations for a specific meal sorted by created_date                                                    |
| Sort all meals by average number of stars in the reviews                                                       |

## Hand in Homework:

Watch [this video](https://www.youtube.com/watch?v=XYlgh9hSWtw) for a more detailed go-through of how to hand in homework!

- Use the branch called `databases/week3`
- Add all your changes to this branch in the `databases/week3` folder.
- Go through the [Homework checklist](#homework-checklist)
- Create a pull request using the `databases/week3` branch
- Wait for mentor feedback
- Implement feedback, `add`, `commit` and `push` the changes
- Now you can merge the changes into `master`
- When merged you can **share the github link** to your classes slack channel if you are **proud of what you did** 💪
- Now celebrate 🎉🎉🎉

## Homework checklist

Go over your homework one last time:

- [ ] Does every file run without errors and with the correct results?
- [ ] Have you used `const` and `let` and avoided `var`?
- [ ] Do the variable, function and argument names you created follow the [Naming Conventions](https://github.com/HackYourFuture/fundamentals/blob/master/fundamentals/naming_conventions.md)?
- [ ] Is your code well-formatted (see [Code Formatting](https://github.com/HackYourFuture/fundamentals/blob/master/fundamentals/naming_conventions.md))?

## Feedback giving time!

Find a student to give feedback using this site: https://hyf-peer-review.herokuapp.com/. The feedback should be given after the homework has been handed in, preferably two days after.

Give the review on the PR exactly how the mentors do it! To find the link for the PR ask the person you are reviewing :) You can see how to give feedback on a PR using github [here](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/commenting-on-a-pull-request)

To help you get started with reviewing we have created [some ressources](https://github.com/HackYourFuture-CPH/curriculum/tree/master/review) about giving feedback. Find them

Why is it important to give feedback? Because it will make you a [better](https://www.brightspot.com/blog/developer-life-5-reasons-why-the-code-review-process-is-critical-for-developers) [developer](https://www.sitepoint.com/the-importance-of-code-reviews/)
