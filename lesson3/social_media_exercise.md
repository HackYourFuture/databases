# HackYourFuture Social Media Website

## The task

You have to design a database schema for a social media website for HackYourFuture.

You should create the database schema (a SQL file with `CREATE TABLE` statements) and an ER diagram (pdf or png).

Think carefully about the types of relations and keys you will need.

It's a good idea to also provide some example data (`INSERT INTO` statements) in order to verify that the schema works like you expect.

If you have extra time you can expand on the list of entities. What else could be stored in a social media database?

## List of entities

**User**

- Name
- Email
- Password
- Registration datetime

**Post**

- Title
- Content
- Creation datetime
- Update datetime
- Relation to author

**Comment**

- Content
- Creation datetime
- Update datetime
- Relation to author
- Optional relation to parent post

**Reaction**

Types of reactions:
- like
- highfive
- laugh
- cry

It should be possible to react to posts and comments.

It should be possible for a user to react to the same thing with multiple reaction types, eg. "like" and "laugh" on the same post.

It should however **not** be possible for a user to react to something with the same reaction type more than once.

**Friendship**

Fx: User 1 is friends with user 2
