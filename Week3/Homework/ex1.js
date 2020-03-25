/* Exercise 1 : Normalization


How can you convert the table into 1NF ?

First, the food_code contains multiple values. It should have only atomic values. So there should be another
table with food_code and from that table there can be a foriegn  key. 
Second, the second column's name should be change to member_name because the it has the same attribute 
as the first column.

////////////////////////////////////////////////////////////
What are the super, candidate, primary keys ?

Super keys are {member_id, member_name, member_address, dinner_id, venue_code, venue_description} because these columns can uniquely identify the row. 

Candidate keys are the minimum set of columns needed to identify a row. In this table they are
{member_id, member_id(2) }, {member_id}, {member_address, venue_code}, {member_address ,dinner_id (or dinner_date)}

The primary keys are member_id, member_id(2), member_address. 

////////////////////////////////////////////////////////////
What are the potential relationships between different possible tables ?

Dinner_id is probably a foreign key from another table. The same goes for venue_code. 

////////////////////////////////////////////////////////////
How can you develop the set of 2NF tables?

For a table to be in the 2NF, there should be no non-primary-key attribute dependency. 
In this table venue_description depends on venue_code and doesn't depend on the primary keys (like member_id). 
They need to be moved to another table and 

////////////////////////////////////////////////////////////
How can you develop the set of 3NF tables?

To be in the 3NF the table should only have columns that are non-transitively dependent on the primary key.
Here dinner_id depends on dinner_date and venue_code on which venue_description depends on. 
They should be in a different table. 

////////////////////////////////////////////////////////////

+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+
| member_id | member_id   | member_address | dinner_id | dinner_date | venue_code | venue_description | food_code | food_description |
+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+
|         1 | Amit          | 325 Max park   | D00001001 | 2020-03-15  | B01        | Grand Ball Room   | C1, C2    | Curry, Cake      |
|         2 | Ben           | 24 Hudson lane | D00001002 | 2020-03-15  | B02        | Zoku Roof Top     | S1, C2    | Soup, Cake       |
|         3 | Cristina      | 516 6th Ave    | D00001002 | 2020-03-15  | B02        | Zoku Roof Top     | S1, C2    | Soup, Cake       |
|         4 | Dan           | 89 John St     | D00001003 | 2020-03-20  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
|         5 | Ema           | 91 Pixar St    | D00001003 | 2020-03-20  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
|         6 | Fatima        | 56 8th Ave     | D00001004 | 2020-03-20  | B04        | Mama's Kitchen    | F1, M1    | Falafal, Mousse  |
|         7 | Gabor         | 54 Vivaldi St  | D00001005 | 2020-02-20  | B05        | Hungry Hungary    | G1, P2    | Goulash, Pasca   |
|         8 | Hema          | 9 Peter St     | D00001003 | 2020-03-20  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+




*/ 