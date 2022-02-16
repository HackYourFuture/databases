# Reading Material Databases Week 4

## Agenda

These are the topics for week 4:

TODO!

## 4. NoSQL (with MongoDB)

In NoSQL the concepts of tables and rows have different names, that's because they behave differently.
But you could map them like this:

![rdb-mongo-pic](https://beginnersbook.com/wp-content/uploads/2017/09/RDBMS_MongoDB_Mapping.jpg)

A schema need not be enforced or even exist, you can simply store JSON objects as documents.

For a good understanding of MongoDB you should watch this 36-minute video:
[MongoDB Crash Course](https://www.youtube.com/watch?v=2QQGWYe7IDU)

A small example how to work with Mongo can be found in the folder `/Week3/mongodb`

To increase your understanding check the following materials:

- https://beginnersbook.com/2017/09/mapping-relational-databases-to-mongodb/
- [Transitioning from relational databases to MongoDB](https://www.mongodb.com/blog/post/transitioning-from-relational-databases-to-mongodb)

## 5. Non-relational vs. relational

In MongoDB, one record looks like this JSON object:

```json
{
  "_id": ObjectId("528ba7691738025d11aab772"),
  "proj_no": "123",
  "proj_name": "HackYourDatabase",
  "project_tags": ["lastyear,backend, javascript, nosql"]
}
```

In MySQL a record needs a table, and then the following row:

```sql
| proj_no | proj_name          | start_date   | project_tags                           |
| ------- | ------------------ | ------------ | -------------------------------------- |
| 123     | “HackYourDatabase” | “2019-12-30” | "lastyear, backend, javascript, nosql" |
```

Better, in first normal form:

```sql

| proj_no | proj_name          | start_date   | project_tag  |
| ------- | ------------------ | ------------ | ------------ |
| 123     | “HackYourDatabase” | “2019-12-30” | "lastyear"   |
| 123     | “HackYourDatabase” | “2019-12-30” | "backend"    |
| 123     | “HackYourDatabase” | “2019-12-30” | "javascript" |
```

What happens if I want to update the name of the project? (a peculiar way to do it, but might happen)

```sql
UPDATE proj_name = "HackYourMongo"  where proj_no = 123  and  project_tag = "backend"

| proj_no | proj_name          | start_date   | project_tag  |
| ------- | ------------------ | ------------ | ------------ |
| 123     | “HackYourDatabase” | “2019-12-30” | "lastyear"   |
| 123     | “HackYourMongo”    | “2019-12-30” | "backend"    |
| 123     | “HackYourDatabase” | “2019-12-30” | "javascript" |
```

Oh no! We lost integrity!

## Finished?

Are you finished with going through the materials? High five! If you feel ready to get practical, click [here](./MAKEME.md).
