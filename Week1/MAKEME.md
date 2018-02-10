# Homework week 1

## Draw a database design for a TODO App

If you want to use software to do this use MySQL workbench or LucidCharts
(online option)  And a tutorial on how to create an Entity-Relation-Diagram
(ERD) (<https://www.youtube.com/watch?v=9L0CMnDGuLg>). Otherwise pen and paper
is just fine, but take a picture put it in the homework directory! 

*(Note: It's not important you learn how to use a specific drawing tool but it
is important you learn how to design a database!)*

Design a database for an app that keeps track of TODO lists of its users. In
this app a user can:

- Create a TODO item with some text in it
- Add tags to the TODO items, like `homework`, `groceries` etc..
- Mark a TODO item as done

**Bonus round:**

Write a `todo.sql` file and put it in the homework folder where you create the
database structure from your ERD
<https://www.w3schools.com/sql/sql_create_table.asp>. Make sure you can use the
`source` command in MySQL to create the database.

## World database queries!

Create a database called `world` and `source` the SQL data into the database [databases/world.sql](databases/world.sql).

*(Remember: first `create` the database, then `use` it, and then `source` the `world.sql` file.)*

Some SQL refresh tutorial (if needed):

- <https://www.w3schools.com/sql/sql_select.asp>
- <http://www.geeksforgeeks.org/sql-tutorial/>

Answer the following questions using the `world` database and put your answers
in [homework/world-queries.txt](homework/world-queries.txt). You will have to
use keywords that we did not see in class: `ORDER BY`, `LIMIT`, `GROUP BY`:

*(Hint: Use `SHOW tables;` and `DESCRIBE <table>;` to see what the table structure looks like)*

1. What are the names of all the cities in the Netherlands?
2. What is the population of Rotterdam ?
3. What's the name of all the countries on the continent ‘North America’ ? 
4. What's the top 10 countries by SurfaceArea ?
5. What's the top 10 most populated cities?
6. Select the top 3 countries by population that their names start with the letter ‘P’
7. What is the population in Asia?
8. Which languages are spoken in the Region of ‘South America’
9. What are the languages spoken on all cities named ‘Barcelona’ (you may need to join 3 tables =) )
