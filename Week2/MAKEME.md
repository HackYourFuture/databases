# Homework week 2
The homework contains 3 parts

## Part 1 : More SQL queries through JS program
Write a node-JS program to get answers of following queries
on the **new_world** database: Note that you are expected to get the input from user
so be careful of possible **sql injections**.

Hint: use [this] (https://github.com/mysqljs/mysql) link to read more
about escaping query values.

1. What is the capital of country X ? (Accept X from user)
2. List all the languages spoken in the region Y (Accept Y from user)
3. Find the number of cities in which language Z is spoken (Accept Z from user)
4. Accept the region and language from the user.
   Are there any countries in this region with the given language
   as the official language ?
   If yes, display those countries.
   If no, display FALSE.
   E.g.
   (A) input region : 'Western Europe' and input language : 'Dutch'
   output should be Belgium and Netherlands
   (B) input region : 'Western Europe' and input language : 'Hindi'
   output should be 'FALSE'
5. List all the continents with the number of languages spoken in each continent


## Part 2 : SQL research
I want to get alerts when a country has >= 10 languages.
E.g. If a country X has 9 languages in the CountryLanguage table,
and a user INSERTs one more row in the CountryLanguage table, then I should get an alert.
*How can I achieve this ?*
- Write the necessary SQL statements for this solution and
- Test your solution with example insert statements.

## Part 3 : Database design
I want to develop a ToDo app in which a user can create a multiple
ToDo lists with different purposes. Each list has at least one item.
Each item can be tagged. Each item can be marked completed.
There could be reminders for some items.

- Draw an Entity Relationship Diagram for the database of the ToDo App.

Read about Entity-relationship diagrams on the Internet
E.g. [here] (https://www.lucidchart.com/pages/er-diagrams)
