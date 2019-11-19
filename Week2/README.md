# Reading Material Databases Week 2

## Agenda

These are the topics for week 2:

1. What’s an identifier (keys)?
   - Primary key
   - Foreign key
   - Composite key
2. What are the 3 types of relationships?
   - One-to-One (1-1)
   - One-to-Many (1-M)
   - Many-to-Many (M-M)
3. What’s domain modeling?
   - Entity-Relation Diagram (ERD)
4. How to use SQL: joins, aggregate Functions, distinct, group by, having
   - Joins
   - Aggregate functions
   - Distinct
   - Group By
   - Having

## 1. What’s an identifier (keys)?

A key or identifier is a single or combination of multiple fields in a table which is used to fetch or retrieve records/data-rows from data table according to the condition/requirement.

Keys are also used to create a relationship among different database tables or views.

### Primary Key

The PRIMARY KEY constraint uniquely identifies each record in a table.
Primary keys must contain UNIQUE values, and cannot contain NULL values.
A table can have only ONE primary key; and in the table, this primary key can consist of single or multiple
columns (fields).

To define a Primary Key while creating the table, you should determine the attribute in Column definition part:

```sql
CREATE TABLE teachers (
      teacher_number INT,
      teacher_name VARCHAR(50),
      date_of_birth DATE,
      subject TEXT,
      gender ENUM('m', 'f'),
      CONSTRAINT PK_Teacher PRIMARY KEY (teacher_number)
);
```

If you already have the table, and you just want to change a column to Primary Key:

```sql
ALTER TABLE teachers ADD PRIMARY KEY (teacher_number);
```

or you can define a primary key later:

```sql
ALTER TABLE teachers ADD CONSTRAINT PK_Person PRIMARY KEY (ID,LastName);
```

### Foreign Key

A FOREIGN KEY is a key used to link two tables together. This KEY is a field
(or collection of fields) in one table that refers to the PRIMARY KEY in another table.

To define a Foreign Key while creating the table, you can use the below query:

```sql
CREATE TABLE students (
    student_number int,
    student_name VARCHAR(50),
    gender ENUM('m', 'f'),
    PRIMARY KEY (student_number),
    CONSTRAINT FK_TEACHER FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_number)
);
```

or you can add a foreign key later:

```sql
ALTER TABLE students
    ADD CONSTRAINT FK_TEACHER FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_number);
```

### Composite Key

A composite key is a key composed of two or more columns in a table that can be used to uniquely identify
each row in the table when the columns are combined **uniqueness is guaranteed**, but when it taken individually
it does not guarantee uniqueness.

```sql
CREATE TABLE students
    student_number int,
    student_name VARCHAR(50),
    gender ENUM('m', 'f'),
    PRIMARY KEY (student_number, student_name));
```

## 2. What are the 3 types of relationships?

There are three specific types of relationships that can exist between a pair of tables:
one-to-one, one-to-many, and many-to-many. The tables participate in only one type of
relationship at any given time. (You'll rarely need to change the type of relationship
between a pair of tables. Only major changes in either of the table's structures could
cause you to change the relationship.)

### One-to-One (1-1)

A pair of tables bears a one-to-one relationship when a single record in the first table is
related to only one record in the second table, and a single record in the second table is
related to only one record in the first table. To implement this relationship, we should
put a foreign key in One side that is referring to another One side.

For example, each teacher has a specific compensation for himself (Not more than one as a teacher)
and each compensation only belongs to one (and just one) teacher. So there is a One-to_one
relationship between entity teacher and entity compensation.

### Many-to-One (1-M)

A one-to-many relationship exists between two tables when a single record in the
first table can be related to **one or more** records in the second table, but a single record
in the second table can be related to only one record in the first table. To implement this
relationship, we should put a foreign key in Many side that is referring to One side.

For example, each teacher can teach to some (zero to several) students, but in reverse direction
each student in one time has just one teacher. So there is a Many-to-One relationship
between entity student and entity teacher.

### Many-to-Many (M-M)

A pair of tables bears a many-to-many relationship when a single record in the first table
can be related to one or more records in the second table and a single record in the second
table can be related to one or more records in the first table. We will see how to implement
this relationship in week 3.

## 3. What’s domain modeling?

Domain Modeling is a way to describe and model real world entities and the relationships between them, which collectively describe the problem domain space.

Derived from an understanding of system-level requirements, identifying domain entities and their relationships provides an effective basis for understanding and helps practitioners design systems for maintainability testability, and incremental development.

### Entity-Relation Diagram (ERD)

Entity-Relation Diagrams (ERD) are used widely in domain modeling. In this diagram, **entities** are showing by boxes and are connected to each other with a line (**relationships**).

An example of ER diagrams are shown below:

![ERD_Student_Teacher](../assets/erd-solution.png)

## 4. How to use SQL: joins, group by, having

### Joins

#### Inner Joins

Let’s say we wanted to get a list of those students and the details of
their teacher. This would be a perfect fit for an inner join, since an inner join
returns records at the intersection of the two tables.

```sql
SELECT s.first_name, s.last_name, s.gender, s.grade, t.full_name
FROM students s
INNER JOIN teachers t
ON s.teacher_number = t.teacher_number
```

#### Self Joins

A self join is a join in which a table is joined with itself (which is also called Unary
relationships), especially when the table has a FOREIGN KEY which references its own
PRIMARY KEY. To join a table itself means that each row of the table is combined with itself
and with every other row of the table. In department, we want to get the employee's information
with their direct manager. Here, each row in employees has a foreign key to itself as manager_id:

```sql
SELECT a.full_name AS full_name, b.full_name AS manager_name
FROM employee a, employee b
WHERE a.manager_id = b.id;
```

#### Right and Left Joins

If we wanted to simply append information about teachers to our students table,
regardless of whether a student has a teacher or not, we would use a left join. A left join
returns all records from table A and any matching records from table B.

```sql
SEKECT s.first_name, s.last_name, t.full_name
FROM studetns s
LEFT JOIN teachers t
ON s.teacher_number = t.teacher_number
```

It can be reversed. The reverse way of querying is called RIGHT JOIN.

### Aggregate Functions in SQL

In database management an **Aggregate Function** is a function where the values of multiple
rows are grouped together as input on certain criteria to form a single value of more
significant meaning.

- Count()
- Sum()
- Avg()
- Min()
- Max()

### Distinct Keyword

DISTINCT statement is used to return only distinct (different) values.
It can be used with aggregation functions. In below example, we retrieve the numbers of teachers
from students table.

```sql
SELECT Count(DISTINCT s.teacher_number) AS no_teachers
FROM students s
```

### Group By

The **GROUP BY** statement groups rows that have the same values into summary rows, like "find the number of students for each teacher".

The **GROUP BY** statement is often used with aggregate functions to group the result-set by one or more columns.

```sql
SELECT Count(s.techer_number) AS no_teachers, s.techer_number AS teacher_number
FROM students s
GROUP BY s.teacher_number
```

### Having

The **Having** clause makes the aggregate functions conditional. It restricts the query results of _group by_ clause.

For example in below example, we just retrieve the teachers who teach more that three students.

```sql
SELECT Count(s.techer_number) AS no_teachers, s.techer_number AS teacher_number
FROM students s
GROUP BY s.teacher_number
HAVING Count(s.teacher_number) > 3
```
