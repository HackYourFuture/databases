# Lesson Plan Databases Week 2

The lesson plan is primarily written for teachers so that they can
use examples and anecdotes from this document in conjunction with the README
and explain the concepts better in the class.

## Topics

0. Async nature of MySQL-Nodejs interaction
1. Identifiers (Primary key, Foreign key, Composite key)
2. Relationships (One-to-One, One-to-Many, Many-to-Many)
3. Joins (inner, left and right) and aliases
4. More SQL clauses (group by, having, distinct and Aggregate functions)
5. Indexes
6. Domain modeling (ERD)

### 0. Async nature of MySQL-Nodejs interaction

#### Explanation

The nature of database queries is asynchronous.
Some queries can take long time to execute.
When our JavaScript MySQL client is sending the queries to the MySQL server,
it may not want to block until the answer is returned.
However if the JavaScript MySQL client is sending multiple queries such that
the second query (for example insert) depends on the first query (for example create),
then it must wait until the execution of the first query is successful.
To ensure smooth interaction with the MySQL server, promises can be used in conjunction
with the await() method.

#### Example(s)

Demonstrate with four programs at [this repository](https://github.com/unmeshvrije/database_examples)
how

1. Program `1-db-naive.js` fails because the connection is closed prematurely.
2. Program `2-db-callback.js` solves the problem but looks ugly because of the callback-hell.
3. Program `3-db-promise.js` uses the promise chaining to make it better.
   about building those promises
4. Program `4-db-await.js` uses promisify() and await() to make it the best.

#### Exercise

The program called `async-create-insert.js` can be found in `Week2` folder.
Add a select query to that program using await and promisify.

#### Essence

> async keyword : to create asynchronous function and ensure they return promise without having to worry

> await : to call a function returning promise without having to call .then() over that promise

> promisify() : to convert a callback based function to a promise based one.

### 1. Identifiers (Primary key, Foreign key, Composite key)

#### Explanation

1. A column can be declared as the UNIQUE column. Such a column has UNIQUE values.
   It can also have NULL values. Thus, two rows can have same NULL value in the column that
   is declared as UNIQUE (In other words, this is a UNIQUE CONSTRAINT on that column).
2. A column can be declared as the PRIMARY KEY column. Such a column has UNIQUE values too.
   They cannot be NULL values. Thus two rows can NEVER have same values in the column
   that is declared as PRIMARY KEY (In other words, this is a PRIMARY KEY CONSTRAINT on that column).

> There are more constraints in MySQL. Read more about them [here](https://www.w3resource.com//creating-table-advance/constraint.php).

#### Example

Consider the following commands (# represents comments).

```sql
# create table with two columns. one with primary key and one with unique key constraint
CREATE TABLE pri_uniq_demo(id_pr int PRIMARY KEY, id_un int UNIQUE);

# Note the error that says that the primary key column cannot be NULL
INSERT INTO pri_uniq_demo VALUES (NULL, NULL);
#ERROR 1048 (23000): Column 'id_pr' cannot be null

# Note that the UNIQUE key column can be NULL
INSERT INTO pri_uniq_demo VALUES (1, NULL);
#Query OK, 1 row affected (0.00 sec)

# Normal insertion
INSERT INTO pri_uniq_demo VALUES (2, 2);
#Query OK, 1 row affected (0.05 sec)

# Note that you cannot insert 2 in the id_un column because it should be UNIQUE
INSERT INTO pri_uniq_demo VALUES (3, 2);
#ERROR 1062 (23000): Duplicate entry '2' for key 'id_un'

# Note that you cannot insert 2 in the id_pr column because it is PRIMARY KEY
INSERT INTO pri_uniq_demo VALUES (2, 3);
#ERROR 1062 (23000): Duplicate entry '2' for key 'PRIMARY'

```

#### Exercise

```
# Find out type T and Constraint C for each column.
CREATE TABLE Airline_passengers(ticket_numer T C, passenger_name T C, date_of_birth T C, passport_number T C);

Hint: A very young baby may not need a ticket!
```

#### Essence

Primary key is a special case of UNIQUE key. UNIQUE key can be NULL and
primary key cannot be NULL. A table can have multiple UNIQUE keys but ONLY ONE primary key.

### 2.1 Relationships (One-to-One, One-to-Many, Many-to-Many)

#### Explanation

When one entity is related to another, such a relationship has a so called **cardinality**.
The cardinality determines how many instances of one entity can participate in the relationship
with how many other instances of the other entity.

For example, an employee may have only one account in the company.
Also one account is tied to exactly one employee.
This relationship employee and account has `1-1` (read as one-to-one) cardinality.
This means that one instance of Employees (say John Smith) has exactly one account
(instance with account ID 3409011) in some company X.

An employee belongs to exactly one department, however one department may have many employees.
This relationship between employee and department has `M-1` (read as Many-to-one) cardinality.
Reversely, the relationshop between department and employee has `1-M` (read as One-to-many) cardinality.
Note that `1-M` and `M-1` cardinalities are only reverse of each other.
The following two sentences convey the same information in different words.

1. The Sales department (an instance of Department entity) of company X has three employees.
2. John Smith, Raj Joshi and Su Li are employees of company X that belong to the Sales Department.

To represent `1-1` or `1-M` relationship in MySQL tables, we need a column in one table
that `refers` a column in another table. Such a column should be a primary key column of another table
and is called as a `foreign key`.
In the Account table, `employee_id` is the column that acts as the foreign key which **refers to the
employee_id column of the employees table in which it works as the primary key.**
In the Employees table, `dept_id` is the column that acts as the foreign key which **refers to the
dept_id column of the departments table in which it works as the primary key.**

#### Example

```sql
# Add the column dept_id to the employees table
 ALTER TABLE employees ADD COLUMN dept_id int;

# Add the constraint foreign key
 ALTER TABLE employees ADD CONSTRAINT fk_dept FOREIGN KEY(dept_id) REFERENCES departments(dept_id);

# Add some sample rows in the departments table
 INSERT INTO departments VALUES (5001, "Sales");
 INSERT INTO departments VALUES (5002, "Development");
 INSERT INTO departments VALUES (5003, "Marketing");

# Try updating the dept_id of an employee with an existing department
 UPDATE employees SET dept_id = 5001 where employee_id = 101;

# Try updating the dept_id of an employee with a department that does not exist
 UPDATE employees SET dept_id = 9999 where employee_id = 101;

# Example of 1-1 relationship
# Creating table Account with the same primary key as the Employees table
CREATE TABLE Account(
employee_id int,
email varchar(50),
primary key (employee_id),
CONSTRAINT fk_emp FOREIGN KEY(employee_id) REFERENCES employees(employee_id)
);

```

#### Exercise

1. Write an INSERT query for the Account table that returns an error.
2. Write an INSERT query for the Account table that is valid (returns no error).

#### Essence

For a relationship with `1-M` cardinality. The primary key of `1` side of the relationship
becomes the foreign key of the `M` side of the relationship.
E.g. `Departments-Employees`. The primary key of the Departments table (dept_id)
becomes the foreign key in the Employees table.

### 2.2 Relationships (M-M and composite keys)

#### Explanation

The cardinality of a relationship can also be `M-M` (read as Many-to-many) where
one instance of an entity participates in many other instances of the other entity
and vice a versa.
For example, an employee may work on many projects at a time.
A project may have many employees working on it.

To represent an `M-M` relationship in MySQL, we need a **new relationship table**
that uses two foreign keys (primary keys from both tables). For such a relationship
table, primary key is composed of two foreign keys.
For example, one entry in the employee-project relationship table represents
**X** is working on **Y** project.
There can be other rows with the employee **X**,
There can be other rows with the project **Y**
Hence none of these columns can act as the primary key alone.
The primary key must be the combination of two columns. Such a primary
key is called as the **Composite Key**

#### Example

```sql
# create projects table
CREATE TABLE projects (proj_id int, proj_name varchar(50), start_date datetime);

# Insert sample values
INSERT INTO projects VALUES(9001, "Jazz", "2018-01-01");
INSERT INTO projects VALUES(9002, "Mellow", "2019-03-01");
INSERT INTO projects VALUES(9003, "Classical", "2020-01-01");

# create emp_proj relationship table with composite primary key
CREATE TABLE emp_proj (
emp_id int,
proj_id int,
PRIMARY KEY(emp_id, proj_id),
CONSTRAINT fk_emp FOREIGN KEY(emp_id) REFERENCES employees(employee_id),
CONSTRAINT fk_pro FOREIGN KEY(proj_id) REFERENCES projects(proj_id)
);
```

#### Exercise

1. Write an INSERT query for the emp_proj table that returns an error.
2. Write an INSERT query for the emp_proj table that is valid (returns no error).

#### Essence

For a `M-M` relationship between two tables, new table must be created which uses a composite primary
key that consists of foreign keys that reference primary keys of both tables.

### 3.1 Joins (comma, inner)

#### Explanation

When the answer of the query cannot be found from only one table, we must join the two tables.
If we don't join the table, then such a query must be written using nested subquery.
For example, consider the following query: **Find out all employees who work in the Sales department.**
Also assume that the name of the department is obtained from the HTML form as the input.
thus, you must obtain the `dept_id` from the departments table where the name is **Sales**.
The following query should give the answer.
`SELECT dept_id FROM departments where dept_name = Sales;`
Now, we can use the above query as the nested (sub)query as follows:
`SELECT employee_name FROM employees WHERE dept_id in (SELECT dept_id FROM departments where dept_name = Sales);`

Another way of solving this query is to use **joins**.
The preferred way of joining two tables is to use the **INNER JOIN** clause followed by **ON** followed by
the condition that generally matches the columns shared by the two tables we are joining.
Another way is to use a **comma (,) between table names** after FROM and then matching columns in the **WHERE**
clause.

#### Example

```sql
#We must join the tables `employees` and `departments` and then choose the relevant rows.

# INNER JOIN
SELECT employee_name
FROM employees as E
INNER JOIN
departments as D
ON E.dept_id = D.dept_id
WHERE D.dept_name = "Sales";

# Comma (,) or CROSS join
SELECT employee_name
FROM employees as E, departments as D
where E.dept_id = D.dept_id
and D.dept_name = "Sales";
```

#### Exercise

1. Guess the output of the following query.
   `SELECT count(*) FROM employees, departments, projects;`

2. Print the sum of salary of all employees that work in "Sales" department and
   work on "Jazz" project.

#### Essence

> When we use a comma (,) after the FROM clause of MySQL, it gives you the vector product of two tables.

> In MySQL, there is no difference between
> (1) An INNER JOIN with columns-matching condition after ON and
> (2) The join using a comma (,) between tables and where clause with condition for columns-matching.

### 3.2 Joins (self)

#### Explanation

When the answer of the query cannot be easily found with a where clause but the answer(s) can be found
in the same table, then consider the following case:

1. One column of the table contains values from the other column of the same table (but different rows)
   E.g. `reports_to` column of Employees table contains values from the `employee_id`.
2. We want to print rows that share column values from other rows
   E.g. Say we add a column `city` to Employees table, then
   we want to print all employees who come from the same city as `John Smith`

For both of these cases, a table must be joined to itself (self join).
for self join, we must use **aliases** so that disambiguation of column names can be achieved.

#### Example

```sql
When we want to print employees and their reporting mangagers.
SELECT E1.employee_name as Employee, E2. employee_name as Manager
FROM employees as E1
INNER JOIN
employees as E2
ON E1.reports_to = E2.employee_id
```

#### Exercise

```sql
# Add the city column, update records in the employees table
ALTER TABLE employees add column city varchar(50);
UPDATE employees SET city = 'Berlin' where employee_name = 'John';
UPDATE employees SET city = 'Berlin' where employee_name = 'Friend of John';
UPDATE employees SET city = 'Berlin' where employee_name = 'Another friend of John';

SELECT employee_name, city
FROM employees
WHERE city = (SELECT city FROM employees WHERE employee_name = 'John');
```

Re-Write the above query to print names of employees that come from the same city as John using **self join**.

<details><summary>Reveal Query</summary>
<p>

```sql
SELECT E1.employee_name, E2.city
FROM employees as E1
INNER JOIN employees as E2
ON E1.city = E2.city
WHERE E2.employee_name = 'John';
```

</p>
</details>

#### Essence

For self joins, aliases for tables must be used. Otherwise, column names are ambiguous.

### 3.3 Joins (LEFT OUTER and RIGHT OUTER)

#### Explanation

When we join two tables based on a common column, some rows do not have a match in the other table.
In the following statement `FROM A LEFT JOIN B ON A.col = B.col`,
the table A is the LEFT table and the table B i the RIGHT table.
In a LEFT JOIN, we print **all rows** from the LEFT table even though they don't have a match in the RIGHT table.

In the following statement `FROM A RIGHT JOIN B ON A.col = B.col`,
the table A is the LEFT table and the table B i the RIGHT table.
In a RIGHT JOIN, we print **all rows** from the RIGHT table even though they don't have a match in the LEFT table.

#### Example

Some employees may not have a department associated with them but they
are still employed by the company.
Thus, if we want to print all employees and their department names,
then a LEFT JOIN (FROM employees to departments) allows us to print **everything** from the LEFT table
and the matching rows from the other table.

#### Exercise

Use Self left join to print all employees and their managers.
Note that it should include the employees who don't have mangers too.

<details><summary>Reveal Query</summary>
<p>

```sql
SELECT E.employee_name as Employee, E2. employee_name as Manager
FROM employees as E1
LEFT JOIN
employees as E2
ON E1.reports_to = E2.employee_id
```

</p>
</details>

#### Essence

- LEFT JOIN : All rows from the LEFT table
- RIGHT JOIN: All rows from the RIGHT table

### 4.1. Aggregate Functions

#### Explanation

In database management an aggregate function is a function where the values of multiple rows are grouped
together as input on certain criteria.
Some important aggregate functions are

1. SUM
2. COUNT
3. MAX
4. MIN
5. AVG

#### Example

We want to return the sum of the salaries of all female employees:

```sql
SELECT SUM(E.salary) AS Expenses FROM employees as E WHERE gender = 'f';
```

Or get the number of employees:

```sql
SELECT COUNT(*) FROM employees;
```

#### Exercise

Write SQL queries to get the maximum and average of all employees' salaries.

#### Essence

Using these functions, you can do some data processing on Database level. For example, you can get max or min of the data that exists in database with no need to process them.

### 4.2. DISTINCT

#### Explanation

Distinct: this statement is used to return only distinct (different) values. This keyword prevents the duplicate values.

#### Example

We want to to get the number of the departments that have at least one employee:

```sql
SELECT COUNT(DISTINCT E.dept_id) AS Working_Departments
FROM employees as E
```

#### Exercise

N/A

#### Essence

Distinct gives unique values.

#### 4.3 Group by

#### Explanation

Group by: this statement groups rows that have the same value in a certain column and generally
applies an aggregate function on another column

#### Example

We want to get the sum of salary and number of employees grouped by gender:

```sql
SELECT gender, count(employee_id), sum(salary)
FROM employees
GROUP BY gender;
```

#### Exercise

Write a query that retrieves all managers with the number of employees that are reporting to them.

<details><summary>Reveal Query</summary>
<p>

```sql
SELECT E2.employee_name , count(E1.employee_name) as Employee_cnt
FROM employee as E1 LEFT JOIN employee as E2
ON E1.reports_to = E2.employee_id
group by E2.employee_name;
```

</p>
</details>

#### Essence

Group by clause can only print columns that are grouped by or apply aggregate functions on the other columns.

### 4.4 Having

#### Explanation

Having clause was added to SQL because the WHERE keyword could not be used with aggregate functions.
Using having clause you can have conditional clauses on aggregate funtions.

#### Example

Print all departments that are spending more than 5000 in salaries
(In other words, all departments where the sum of salaries of employees working in them is more than 5000)

```sql

SELECT dept_name, sum(salary)
FROM employees as E
INNER JOIN
departments as D
ON E.dept_no = D.dept_no
GROUP BY dept_name
HAVING sum(salary) > 5000;
```

#### Exercise

Write a query that retrieves all managers with more than 3 employees reporting to them.
Hint: In this query use DISTINCT and GROUP BY keywords with HAVING clause.

#### Essence

Having clause can only filter the rows with columns selected by the GROUP BY clause.

### 5. Indexes

#### Explanation

Indexes are a type of a look-up table where the database server can quickly look up rows in the database tables.
Indexes are created when rows are inserted or they are updated when the indexed columns are updated in the database.
Creating or updating indexes takes computation time and storing indexes takes up data storage space.
However, when retrieving a specific row from the database, the database can use these stored indexes to find the requested row(s) much faster.
Therefore, indexes make update or insertion operations more expensive/slow, however they speed-up data retrieval (SELECT/JOIN/WHERE/...) operations.
Also, they increase the total size of the database, as they are stored together with their corresponding tables.

##### Analogy

Imagine a (technical) textbook which has the index at the end. This index contains keywords in that book and it tells you on which pages those keyword appear.
It helps to find pages that contains a word `promise` instead of looking for each page one by one. Note that a keyword may appear on more than one pages.
In this case, you will see all pages on which this keyword appears. In a JavaScript book, the word `function` may appear on many pages while the word
`prototype chaining` may appear only once. In the index, you can quickly find on which page these words appear.

Here is a [link to a Medium article](https://medium.com/javarevisited/indexes-when-to-use-and-when-to-avoid-them-39c56e5a7329) that describes indexes concisely.

#### Example

First we will create a table with a large number of records.
The full program can be found in `Week2/generate_big_table.js`, but here is the snippet

```
async function seedDatabase() {

    const CREATE_TABLE = `
        CREATE TABLE IF NOT EXISTS big
        (
            id_pk INT PRIMARY KEY AUTO_INCREMENT,
            number   INT
        );`;

    execQuery(CREATE_TABLE);
    let rows = []
    for (i = 1; i <= 1000000; i++) {
        rows.push([i]);
        if(i%10000 === 0){
            console.log("i="+i);
            await execQuery('INSERT INTO big(number) VALUES ?',[rows]);
            rows = [];
        }
    }
}
```

The following two queries will show the difference (in execution time) between using the index and not using the index when we retrieve the data.

```
mysql> SELECT * FROM big WHERE id_pk = 1000;
+-------+--------+
| id_pk | number |
+-------+--------+
|  1000 |   1000 |
+-------+--------+
1 row in set (0.00 sec)

mysql> SELECT * FROM big WHERE number = 1000;
+-------+--------+
| id_pk | number |
+-------+--------+
|  1000 |   1000 |
+-------+--------+
1 row in set (0.19 sec)
```

The first query's result is instant because the `WHERE` clause uses the `id_pk` column which is a primary key.
Note that for a primary key column, MySQL automatically creates an index. This can be confirmed with the following query

```
mysql> SHOW indexes from big;
+-------+------------+----------+--------------+-------------+-----------+-------------+----------+--------+------+------------+
| Table | Non_unique | Key_name | Seq_in_index | Column_name | Collation | Cardinality | Sub_part | Packed | Null | Index_type |
+-------+------------+----------+--------------+-------------+-----------+-------------+----------+--------+------+------------+
| big   |          0 | PRIMARY  |            1 | id_pk       | A         |    12769223 |     NULL |   NULL |      | BTREE      |
+-------+------------+----------+--------------+-------------+-----------+-------------+----------+--------+------+------------+
1 row in set (0.01 sec)
```

The query `SELECT * FROM big WHERE number = 1000` takes longer to run because the column `number` is not indexed. MySQL has to
go in the `big` table and search row by row to check which row contains the value 1000 in `number` column.

The `describe` command shows how many rows are accessed to fetch the result of the query.
Check the `rows` column in the output of the following queries.

```
mysql> DESCRIBE SELECT * FROM big WHERE number = 1000;
+----+-------------+-------+------------+------+---------------+------+---------+------+----------+----------+-------------+
| id | select_type | table | partitions | type | possible_keys | key  | key_len | ref  | rows     | filtered | Extra       |
+----+-------------+-------+------------+------+---------------+------+---------+------+----------+----------+-------------+
|  1 | SIMPLE      | big   | NULL       | ALL  | NULL          | NULL | NULL    | NULL | 998568   |    10.00 | Using where |
+----+-------------+-------+------------+------+---------------+------+---------+------+----------+----------+-------------+
1 row in set, 1 warning (0.00 sec)

mysql> DESCRIBE SELECT * FROM big WHERE id_pk = 1000;
+----+-------------+-------+------------+-------+---------------+---------+---------+-------+------+----------+-------+
| id | select_type | table | partitions | type  | possible_keys | key     | key_len | ref   | rows | filtered | Extra |
+----+-------------+-------+------------+-------+---------------+---------+---------+-------+------+----------+-------+
|  1 | SIMPLE      | big   | NULL       | const | PRIMARY       | PRIMARY | 4       | const |    1 |   100.00 | NULL  |
+----+-------------+-------+------------+-------+---------------+---------+---------+-------+------+----------+-------+
```

We can now create an index on the `number` column as follows:

```
CREATE INDEX idx_number ON big(number);
```

Now we can re-run the select query which will be faster:

```
mysql> SELECT * FROM big WHERE number = 1000;
+-------+--------+
| id_pk | number |
+-------+--------+
|  1000 |   1000 |
+-------+--------+
1 row in set (0.00 sec)
```

We have seen that having an index helps in fetching the data faster. However, for updates/inserts, having an index
is more expensive. After doing an update to the indexed column, MySQL also has to internally update indexes for that column.

Look at the query below:

```
mysql> UPDATE big SET number = number + 100000;
Query OK, 1000000 rows affected (14.01 sec)
Rows matched: 1000000  Changed: 1000000  Warnings: 0
```

Now, let us remove the index

```
mysql> DROP INDEX idx_number ON big;
Query OK, 0 rows affected (1.59 sec)
Records: 0  Duplicates: 0  Warnings: 0
```

and re-run the update query.

```
mysql> UPDATE big SET number = number + 100000;
Query OK, 1000000 rows affected (6.14 sec)
Rows matched: 1000000  Changed: 1000000  Warnings: 0
```

We can see that without the index, update of the number column is much faster (6 seconds as compared to 14).

#### Exercise

Create a composite index using columns (`employee_name and salary`) on the `employees` table and check the query performance of following queries

```
DESCRIBE SELECT * FROM employees WHERE employee_name = 'John' and salary = 50000
DESCRIBE SELECT * FROM employees WHERE employee_name = 'John'
DESCRIBE SELECT * FROM employees WHERE salary = 50000
```

Make sure to have at least 100 records in the `employees` table including someone named `John` with salary 50000.

#### Essence

Indexes in databases can be used to increase the performance for finding and retrieving specific rows.
However, they do also add overhead to the database (especially for updates/inserts), so they should be used with care.

### 6. Domain Modeling

#### Explanation

- Domain modeling is making the models for the domain of the problem or the system.
- It makes use of the concepts like entities and relations.
- Entity Relationship Diagrams (ERD) are used widely in domain modeling.
- In ERD, **entities** are shown by boxes and are abstract things. E.g. John Smith is an instance. Student is the entity. An entity in ERD is converted to a table in MySQL.
- Entities are connected to each other with a line (**relationships**) with **cardinalities** (1-1, 1-M etc.).
- Entities have **attributes** shown in the shape of an ellipse. An attribute of the entity is translated to
  the column of the corresponding table.

#### Example

Draw the **ERD** for the employees, departments and projects.

#### Exercise

Draw the **ERD** for the school database. Identify tables, attributes and relationships.

#### Essence

Domain Modeling using ERD diagrams helps the system analysts and database designers to have a concrete view to the system and how to apply it in databases.
