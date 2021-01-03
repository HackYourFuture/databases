# Reading Material Databases Week 3

## Agenda

These are the topics for week 3:

1. Normalization
   - Normal forms
2. Transactions
3. SQL injection
4. NoSQL (with MongoDB)
   - How to do CRUD operations
5. Non-relational vs. relational

## 0. Video Lectures

Your teachers Igor and Unmesh have made video lectures for this week's material. You can find them here: [Videos 11 - 13](https://www.youtube.com/playlist?list=PLVYDhqbgYpYVq-rHFB1x2-P7esnWotCB7)

<a href="https://www.youtube.com/playlist?list=PLVYDhqbgYpYVq-rHFB1x2-P7esnWotCB7" target="_blank"><img src="../assets/playlist-thumbnail.png" width="600" height="350" alt="HYF Video" /></a>

## 1. Normalization and normal forms

When setting up a database, one of the most important aspects to be taken into account is to ensure that duplication of data is minimized.
If you do store data twice in your database, but on update forget to update all locations you will end up with a data conflict.

A second advantage of a fully normalized database is that it allows its structure to be extended later to accommodate new types of data without changing existing structure too much.
As a result, code interacting with the database is minimally affected.

![if you dont do database normalization you will have a bad time](https://i.imgflip.com/1uidqc.jpg)

Database normalization is a technique that helps in optimally designing the database to ensure the above points. The core idea of database normalization is to divide large tables into smaller subtables and store pointers to data rather than replicating it.

There are various database “Normal” forms. Each normal form (NF) has an importance which helps in optimizing the database to save storage and to reduce redundancies. These normal forms build incrementally. e.g. a database is in 3NF if it is already in 2NF and satisfied the rules for 3rd normal form.

#### 1st normal form (1NF)

The rules for first normal form are:

- Every column should only contain a single value
- Repeating columns are not allowed
- Prevent duplicate records by applying primary keys

Let us look at an example:

| Customer ID | First Name | Surname | Telephone Numbers                    | Shipping Address 1 | Shipping Address 2 | 
| ----------- | ---------- | ------- | ------------------------------------ | ------------------ | ------------------ |
| 123         | Pooja      | Singh   | 555-861-2025, 192-122-1111           | Hoogweg 1          |                    |
| 456         | San        | Zhang   | (555) 403-1659 Ext. 53; 182-929-2929 | High av. 3254      | Low street 2       |
| 789         | John       | Doe     | 555-808-9633                         | Bergweg 2          |                    |

This table violates rule 1 because the column for telephone numbers has multiple values.
The easiest way to fix this is to have two separate phone columns: one for landline and one for mobile.

The second problem involves `Shipping Address 1` and `Shipping Address 2`
The proper way to solve this type of problem would be to identify entities represented in the table and separate them into their own respective tables.
A new table called `Shipping Addresses` would be an option or a table `Addresses` with a column `type ENUM('shipping','financial')` 

#### 2nd normal form (2NF) and 3rd normal form (3NF)

The second and third rules are both about eliminating redundant data.
When attributes can be split into separate entities you should split them.

Let's look at an example:

| Manufacturer (PK) | Model (PK)  | Manufacturer country | Manufacturer country code |
| ----------------- | ----------- | -------------------- | ------------------------- |
| Apple             | MacBook Air | United States        | US |
| Apple             | Macbook Pro | United States        | US |
| Lenovo            | ThinkPad    | China                | CN |
| Lenovo            | IdeaPad     | China                | CN |

This table violates the rule of 2NF and 3NF because data in the column `Manufacturer country` and `Manufacturer country code` depend on the Primary Key that is actually unrelated.
To make the database comply, we have to split up the table into three smaller tables (Countries, Models, Manufacturers):

**Countries**

| Country Code (PK) | Country Name  |
| ----------------- | ------------- |
| US                | United States |
| CN                | China         |

**Models**

| ID (PK) | Name        | Manufacturer ID (FK) |
| ------- | ----------- | -------------------- |
| 1       | MacBook Air | 1                    |
| 2       | Macbook Pro | 1                    |
| 3       | ThinkPad    | 2                    |
| 4       | IdeaPad     | 2                    |

**Manufacturers**

| ID (PK) | Name         | Country Code (FK) |
| ------- | ------------ | ----------------- |
| 1       | Apple        | US                |
| 2       | Lenovo       | CN                |

Before there was a risk for inconsistencies because it was possible to update a country name in just one record.
That cannot occur anymore in these normalized tables because there is only one value for country name for each country code.

#### Higher normal forms

Besides these three normal forms, there are other higher normal forms, for example, the Boyce-Codd normal form (3.5 NF).
Not all of these normal forms are equally important.
Most of the time while designing databases you should aim for the third normal form.
If you still did not get what are the rules for the different normal forms, don't worry.
Over time, you will develop a feel for it.

If you want to increase your understanding, you can study the following materials:

- [Database Normalization in Simple English](https://www.essentialsql.com/get-ready-to-learn-sql-database-normalization-explained-in-simple-english/)
- [Database Normalization with examples](https://www.studytonight.com/dbms/database-normalization.php)
- [Normalization and normal forms](https://hackr.io/blog/dbms-normalization)
- [Normal forms through examples](https://medium.com/@mattburgess/critical-concepts-normalization-f9b5b1bf417e)

## 2. Transactions

A transaction is a set of SQL commands that you want to treat as "one command." It has to either happen in full or not at all.

Imagine writing a program for transferring money from one bank account to another. To do that you have first to withdraw the amount from the source account, and then deposit it to the destination account. The operation has to succeed in full. If there is an error halfway, the money will be lost.

![he did not use transactions](https://i.imgflip.com/3hkxnl.jpg)

To start a transaction in MySQL we use the keyword `BEGIN TRANSACTION;`. Then we execute a series of commands. More concretely, in our money transfer example: `UPDATE account SET balance = balance - 100 WHERE account_no = 987654 ;` and `UPDATE account SET balance = balance + 100 WHERE account_no = 123456 ;`. If there are no errors we use the command `COMMIT;` which finalizes the changes from both update commands. If there was an error we can use the command `ROLLBACK;` which will _undo_ the changes from all commands in the transaction.

Transactions are essentials when building applications since it is very rare that a certain complex functionality can be written as a single SQL command. To do anything useful, several SQL commands need to be executed and in that case transactions are there to ensure that if something fails halfway the data does not stay in this half-changed state.

To increase your understanding, study the following materials:

- [Transaction examples](https://www.mysqltutorial.org/mysql-transaction.aspx/)

## 3. SQL injection

Some SQL clients accept input from the user to fabricate the queries.
A malicious user can tweak the input to acquire more information from the database or
to destroy the database (literally!). Demo program `sql-injection.js` is in the `Week3` folder.

Consider the following query `SELECT name, salary FROM employees where id = X`.

#### Injection to get more information

```sql
/* If X is `101 OR 1=1`, then the query returns all records because 1=1 is always true */
SELECT name, salary FROM employees where id = 101 OR 1=1;
```

#### Injection to destroy the database

```sql
/* If X is `101; DROP database mydb`, then the query will delete the entire database */
SELECT name, salary FROM employees where id = 101; DROP database mydb;
```

To prevent SQL injection you have to use prepared statements. The diagram below summarizes nicely how prepared statements work:

![SQL injection](https://pics.me.me/prepared-statements-sol-injections-let-me-in-adult-swim-sol-62056759.png)

With prepared statements, we instruct the database to treat certain parts of a query only as a string and nothing else. Even if the string is a valid command it will not be evaluated or executed. To make this as safe as possible the SQL query is sent first, followed by the parts which need to be treated as strings. The syntax for prepared statements is:

```sql
PREPARE example FROM SELECT name, salary FROM employees where id = ?;
SET @id = 5;
EXECUTE example USING @id
```

To increase your understanding check the following materials:

- [What is SQL injection?](https://www.youtube.com/watch?v=ciNHn38EyRc)
- [Prepared statements](https://www.databasejournal.com/features/mysql/a-guide-to-mysql-prepared-statements-and-parameterized-queries.html)

## 4. NoSQL (with MongoDB)

![rdb-mongo-pic](https://beginnersbook.com/wp-content/uploads/2017/09/RDBMS_MongoDB_Mapping.jpg)

https://beginnersbook.com/2017/09/mapping-relational-databases-to-mongodb/

A schema need not be enforced or even exist:

![noschema](https://image.slidesharecdn.com/nosql-and-mongodb-sig-14march2017-170315090521/95/introducing-nosql-and-mongodb-to-complement-relational-databases-amis-sig-14032017-45-638.jpg?cb=1489568959)

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

### Preparing you for the homework:

In week 1, you used a mysql database that was 3 tables: `cities`, `countries`, and `countrylanguage`.

We are going to migrate these tables into your Atlas MongoDB account

```sql
select * into outfile 'city.csv' FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' from city;

select * into outfile 'country.csv' FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' from country;

select * into outfile 'countrylanguage.csv' FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' from countrylanguage;
```

Then in Atlas , follow [add my own data](https://docs.atlas.mongodb.com/getting-started/#insert-data-into-your-cluster) to import the csv data into new collections.

For homework, you will perform CRUD operations and aggregations on them. Also queries with joins (you will see perhaps how hard this is).

- [Relational Database Essentials](https://www.youtube.com/watch?v=GfBtPAB7NH0)
- [Transitioning from relational databases to MongoDB](https://www.mongodb.com/blog/post/transitioning-from-relational-databases-to-mongodb)

## Finished?

Are you finished with going through the materials? High five! If you feel ready to get practical, click [here](./MAKEME.md).
