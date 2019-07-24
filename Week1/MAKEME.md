> This homework assumes you have installed the software [MySQL](https://dev.mysql.com/downloads/installer/) to your computer. If not please do that first!

# Homework week 1

This week you'll be writing a Node.js file that makes a connection to a MySQL database instance. These are the requirements that the file must have:

1. Use the `mysql` package (https://www.npmjs.com/package/mysql)
2. Make a connection to MySQL, using your MySQL `root` login credentials
3. Write JavaScript code that incorporates SQL commands for the following:

   - Create a database called 'world'
   - Create a table called 'country'. Make a column (and define the appropriate data type) for...
     - Name
     - Continent
     - Region
     - SurfaceArea
     - IndepYear
     - Population
     - LifeExpectancy
     - GNP
     - GNPOld
     - LocalName
     - GovernmentForm
     - HeadOfState
     - Capital
   - Create a table called 'city'. Make a column (and define the appropriate data type) for...
     - ID
     - Name
     - CountryCode
     - District
     - Population

4. Write queries (that's a technical term meaning 'requests for information from a database') that will retrieve data that answers the following questions:
   1. What are the names of the countries with population greater than 8 million
   2. What are the names of the countries that have “land” in their names ?
   3. What are the names of the cities with population in between 500,000 and 1 million ?
   4. What are the names of all the countries on the continent ‘Europe’ ?
   5. List all the countries in the descending order based on their surface areas.

If you have time left and want more practice you can try these optional homework exercises:

5. Write queries that answer the following questions:
   1. What are the names of all the cities in the Netherlands?
   2. What's the population of Rotterdam?
   3. What's the top 10 countries based on surface area?
   4. What's the top 10 cities with the highest population?
   5. What's the population of the world ?

Tip: Before writing any query, first get a working version of the [example](https://www.npmjs.com/package/mysql#introduction) going. This will help you understand the basic structure of making a database connection and query. When doing this, make sure you replace the `user`, `password` and `database` values with the ones you've created for HackYourFuture: `hyfuser`, `hyfpassword` and `user_db`.

Tip: When creating the tables, make sure you know what data type each column should have. Check the [following](https://dzone.com/articles/mysql-data-types-an-overview-of-the-data-types-in) to read about the different data types recognized by MySQL.

Tip: If you want to learn how to use the SQL language in its various ways, check out the following online tutorial: [SQL Teaching](https://www.sqlteaching.com/)
