> An SQL JOIN clause is used to combine rows from two or more tables,
> based on a common field between them.

There are different types of joins available in SQL:

**INNER JOIN**: returns rows when there is a match in both tables.

**LEFT JOIN**: returns all rows from the left table, even if there are no matches in the right table.

**RIGHT JOIN**: returns all rows from the right table, even if there are no matches in the left table.

**FULL JOIN**: It combines the results of both left and right outer joins.

The joined table will contain all records from both the tables and fill in NULLs for missing matches on either side.

**SELF JOIN**: is used to join a table to itself as if the table were two tables, temporarily renaming at least one table in the SQL statement.

**CARTESIAN JOIN**: returns the Cartesian product of the sets of records from the two or more joined tables.

WE can take each first four joins in Details :

We have two tables with the following values.

**TableA**

    id	firstName			       lastName
    .......................................
    1	arun                     	prasanth                 
    2	ann                      	antony                   
    3	sruthy                   	abc                      
    6	new                      	abc                                           

**TableB**

    id2	age	Place
    ................
    1	24	kerala
    2	24	usa
    3	25	ekm
    5	24	chennai


....................................................................

**INNER JOIN**

**Note** :it gives the intersection of the two tables, i.e.  rows they have common in TableA and TableB

Syntax

    SELECT table1.column1, table2.column2...
      FROM table1
     INNER JOIN table2
        ON table1.common_field = table2.common_field;

Apply it in our sample table :

    SELECT TableA.firstName,TableA.lastName,TableB.age,TableB.Place
      FROM TableA
     INNER JOIN TableB
        ON TableA.id = TableB.id2;

Result Will Be 

    firstName	    lastName	   age	Place
    ..............................................
    arun            prasanth        24	kerala
    ann             antony          24	usa
    sruthy          abc             25	ekm

**LEFT JOIN**

**Note** : will give all selected rows in TableA, plus any common selected rows in TableB.

Syntax 

    SELECT table1.column1, table2.column2...
      FROM table1
      LEFT JOIN table2
        ON table1.common_field = table2.common_field;

Apply it in our sample table :

    SELECT TableA.firstName,TableA.lastName,TableB.age,TableB.Place
      FROM TableA
      LEFT JOIN TableB
        ON TableA.id = TableB.id2;

Result
 

    firstName			        lastName			        age	  Place
    ...............................................................................
    arun                     	prasanth                 	24	  kerala
    ann                      	antony                   	24	  usa
    sruthy                   	abc                      	25	  ekm
    new                      	abc                      	NULL  NULL

**RIGHT JOIN**

**Note** : will give all selected rows in TableB, plus any common selected rows in TableA.

Syntax 

    SELECT table1.column1, table2.column2...
      FROM table1
     RIGHT JOIN table2
        ON table1.common_field = table2.common_field;

Apply it in our sample table :

    SELECT TableA.firstName,TableA.lastName,TableB.age,TableB.Place
      FROM TableA
     RIGHT JOIN TableB
        ON TableA.id = TableB.id2;


Result 

    firstName			        lastName			        age	    Place
    ...............................................................................
    arun                     	prasanth                 	24	   kerala
    ann                      	antony                   	24	   usa
    sruthy                   	abc                      	25	   ekm
    NULL				        NULL				        24	   chennai

**FULL JOIN**

**Note** :It will return all selected values from both tables.

Syntax 

    SELECT table1.column1, table2.column2...
      FROM table1
      FULL JOIN table2
        ON table1.common_field = table2.common_field;


Apply it in our sample table :

    SELECT TableA.firstName,TableA.lastName,TableB.age,TableB.Place
      FROM TableA
      FULL JOIN TableB
        ON TableA.id = TableB.id2;

Result 

    firstName			        lastName			        age	   Place
    ...............................................................................
    arun                     	prasanth                 	24	  kerala
    ann                      	antony                   	24	  usa
    sruthy                   	abc                      	25	  ekm
    new                      	abc                      	NULL  NULL
    NULL				        NULL				        24	  chennai


**Interesting Fact**

For INNER joins the order doesn't matter

For (LEFT, RIGHT or FULL) OUTER joins,the order matter

Better to go check this **[Link][1]** it will give you interesting details about join order


  [1]: https://stackoverflow.com/questions/9614922/does-the-join-order-matter-in-sql