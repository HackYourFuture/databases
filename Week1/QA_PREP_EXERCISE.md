# Prep exercise week 1

As a preparation step for the upcoming Q&A, you will work through the following exercise. The expected result is a list of SQL `CREATE TABLE` statements representing the tables you will design.

We suggest you first think of the design of the tables (names, columns, types) and then proceed to write the SQL statements. That way, you're thinking about the problem you're trying to solve (creating a database that holds data) rather than the implementation first (creating a set of SQL statements).

## Exercise

Design the tables for a database that contains food recipes.

- Each recipe should have a name, one or more categories, a list of ingredients, and a list of steps to follow to complete the recipe.
- Many recipes might share the same ingredients or the same list of steps (For example, "cook pasta according to the package instructions" could be a regular step seen in multiple recipes).
- You can create your own data, focusing on Japanese, cake and vegetarian recipes. You can find some inspiration online, but keep it simple!

You don't need to write any specific queries now, but the design should consider that we will execute queries on the tables to extract data such as:

- You should be able to list all the recipes.
- You should be able to list recipes under a single category (Salads, Mexican, etc).

Some questions you can ask yourself:

- Which entities can you spot in the above problem ?
- Which tables do you need to create to store the above data?
- What are the relationships between those entities?

There's a [short video](https://www.youtube.com/watch?v=C3icLzBtg8I) explaining how relationships work, and you can use this for inspiration. We will expand this topic the following week.
