# Reading Material Databases Week 3

## Agenda

These are the topics for week 3:

- [Normalization](https://hackyourfuture.github.io/study/#/databases/sql/normalization)
- [Transactions](https://hackyourfuture.github.io/study/#/databases/sql/transactions)
- [SQL injection](https://hackyourfuture.github.io/study/#/databases/sql/sql-injection)
- [NoSQL](https://hackyourfuture.github.io/study/#/databases/nosql/README.md)
    - [MongoDB](https://hackyourfuture.github.io/study/#/databases/nosql/mongodb/README.md)
        - [Basic operations](https://hackyourfuture.github.io/study/#/databases/nosql/mongodb/basic-operations.md)

## Week goals

This week, we'll finalise our SQL knowledge with even more advanced topics. Let's first look at [Normalization](https://hackyourfuture.github.io/study/#/databases/sql/normalization) which is a technique you should always use when designing your databases!

Next we'll look at [Transactions](https://hackyourfuture.github.io/study/#/databases/sql/transactions), which are ways to ensure that your data stays clean. Sometimes certain updates need to either all happen or none happen and transactions allow you to do that.

Lastly for SQL, le'ts dive into the topic of [SQL injection](https://hackyourfuture.github.io/study/#/databases/sql/sql-injection) which you, as backend engineers, you should be wary about. Not handling this could enable others to delete your whole database, which as you well imagine would be a terrible thing...

It is now time to start with the basics of NoSQL. This is an extremely broad topic, as it pretty much includes every way excluding the SQL way. Have a look at the basics of NoSQL [here](https://hackyourfuture.github.io/study/#/databases/nosql/README.md).

Most of NoSQL is out of the scope of our curriculum, as storing data in specific ways (like graphs) is generally only used for very specific use cases. We will look at the documented-oriented way of storing data, as that is the most common thing you will see in the wild. In that field, we will use `MongoDB` as our implementation. Be sure that you know that `MongoDB` is an implementation of a document-oriented database and not the only one. Kind of like how `MySQL` is an implementation of an SQL database. Read up on document-oriented databases [here](https://hackyourfuture.github.io/study/#/databases/nosql/mongodb/README.md) and then have a look at how to do the basic CRUD operations with MongoDB [here](https://hackyourfuture.github.io/study/#/databases/nosql/mongodb/basic-operations.md), so that we can get our feet wet.

## Finished?

Have you gone through all of the materials? High five! If you feel ready to get practical, click [here](./MAKEME.md).
