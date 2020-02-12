# MongoDB Exercise one
We are using the  database from the lesson 1: 
https://github.com/babakbandpey/databases/blob/master/lesson1/lesson-data.sql

Export the tables into JSON files using MySQL Workbench

Please use the following guide to export your tables' data into respected JSON files:

**Avoid exporting the primary keys and foreign keys fields**

https://www.got-it.ai/solutions/sqlquerychat/sql-help/data-query/mysqlexport-sql-to-json-querychat/ 



#### Start your MongoDB server: "mongod.exe"

#### Start your MongoDB shell: "mongo.exe"

Please post the following operations in your PR (Pull Request)

1. Create a database **"Todo"**
2. Insert the exported data into the related collections
3. Find the length of each collection using db."collection_name".find().length()
4. Return the first document of tasks collection using .limit()
5. Return the third document of the task collection using .skip() and .limit()
6. Find the documents which "description" is "learning Danish during physical working" using .find({_condition_})


