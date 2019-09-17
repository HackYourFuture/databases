# Week 1 Homework

## Statements and Clauses you are expected to use:
- Select
- Where (also And & Or)
- Between
- Like
- Count
- =, !=, < <=, >, >=
- In
- The Not varieties (Not Like, Not In, etc.)
- Order By

## Loading the Data

You need to load `cars.sql` similarly to how you loaded the musicians and imdb datasets, earlier.

- For mac and linux users who can use mysql from the shell, remember to load it with the `< file.sql` technique.
- For windows users, copy paste into work bench and execute from there.

## Understand the data

After loading the database and tables into mysql, have a look around. Use `show tables` and `describe tables` to study the structure of tables. Perform a few queries to get an idea of what sort of data exists in the tables (try `select * from <table-name> limit 5` on a few different tables).

In order to query properly, you must understand which tables have what kind of data so you know where to look.

## You might have to consult multiple tables to get the result that you need

Imagine the follow task:

1. List all full names of car makers from `japan`.

To solve this you will need to look at the table where it shows the car makers and their countries. By perform the `describe <table>` operation on some of the tables we can see that `car_makers` is the table with info we need:

```
mysql> describe car_makers;
+-----------+---------+------+-----+---------+-------+
| Field     | Type    | Null | Key | Default | Extra |
+-----------+---------+------+-----+---------+-------+
| id        | int(11) | NO   | PRI | NULL    |       |
| maker     | text    | NO   |     | NULL    |       |
| full_name | text    | NO   |     | NULL    |       |
| country   | int(11) | YES  |     | NULL    |       |
+-----------+---------+------+-----+---------+-------+
```

But the country is the id of a country. It's a number.

If we describe the `countries` table, we can see

```
mysql> describe countries;
+-----------+---------+------+-----+---------+-------+
| Field     | Type    | Null | Key | Default | Extra |
+-----------+---------+------+-----+---------+-------+
| id        | int(11) | NO   | PRI | NULL    |       |
| name      | text    | NO   |     | NULL    |       |
| continent | int(11) | NO   |     | NULL    |       |
+-----------+---------+------+-----+---------+-------+
```

It has a mapping of country id and name. So first I need to know the `id` of `japan`.

```
select id from countries where name = 'japan';
```

Result:
```
mysql> select id from countries where name = 'japan';
+----+
| id |
+----+
|  4 |
+----+
1 row in set (0.04 sec)
```

Okay, now I know that the id is `4`.

So I can go ahead and use it to get my result from `car_makers`;
```
select full_name from car_makers where country = 4;
```
Result:
```
mysql> select full_name from car_makers where country = 4;
+---------------+
| full_name     |
+---------------+
| Nissan Motors |
| Honda         |
| Mazda         |
| Subaru        |
| Toyota        |
+---------------+
5 rows in set (0.01 sec)
```

> Note: By the end of the module we'll have learned how to do this in 1 query instead of 2 queries (for the curious ones, we'll be learning `joins` the most powerful feature of relational databases.

Armed with the above example, please complete the following tasks.

## Tasks

1. Which car has the highest *accelerate* value?
1. List the *weight* of the cars made in the 1980s (1980 and later).
1. List all the cars made by *chevrolet* (where the model is *chevrolet*).
1. What is the *full name* of the *maker* of the *plymouth* model?
1. Which continent is the *Volvo* car maker from?
1. How many car models are *audi*?
1. List all makers whose names start with *s*.
1. How many cars have a *horsepower* more than *100* but less than *200*?
1. List all car makers from *australia*.
1. List all car makers _not_ from *sweden*, *japan*, *france* or *germany*.

## Submitting the Homework

Make a PR to this repo, similar branch naming and PR title format as you've been using so far.
Edit the `solution.sql` file.

First mention the task being solved (you can add comments in sql code with `---`). Then add all the sql statements, required, one line for each statement. Continue for the other tasks. Check the `example.sql` for how it's done.

### Bonus
1. List all cars where the *make* starts with an *a* and ends with an *r*.
1. How many cars have more than *6 cylinders*, weight *less than 4000* but *more than 3000*, and was *not* made in the years *1970*, *1975* or *1981*.

> Note: Again, for the curious, I've included the raw csvs and the script I used to turn them into sql.
