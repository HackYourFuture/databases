This rubric is a guideline for teachers when evaluating students' homework. It sets basic criteria for acceptable and outstanding homework that we can point out to and for students to strive to achieve.

### What needs to be evaluated?
- The JS runs correctly without errors.
- Most of the column types selected are correct or at least, sensible choices.
- Queries return correct results.

### What should not be evaluated at this stage?
We suggest not evaluating these points yet, as they will be covered in the upcoming weeks.

- Use of primary keys, foreign keys, or indexes.
- Errors handling.

### Acceptable homework
These are the basic parameters to know if the homework is correct or not.

- All tables are created but some might have errors, like choosing not-ideal data types, but the code executes correctly.
- All queries return a correct result.
- The seed data is mixed within SQL statements.
- Javascript code is complex but understandable. There's a lot of repeated code, but it follows a logical order.

### Outstanding homework.
While we don't grade homework, it's good to recognize when a student does really well (and perhaps share it with other students as an example), so here are some criteria to identify such a student's homework.

The student provides a thorough and clear description and their approach to the homework in the Pull Request's body.
- The Javascript code is very clean and readable. No unnecessary use of complex abstractions.
- The database is first dropped and recreated rather than failing if DB already exists.
- Seed data is separated from the SQL statements and interpolated at execution.
- Query results are very clear to read and show no additional output.
- The naming of variables is very accurate and helps code readability.
- There's no code repetition unless necessary.
- Rather than creating multiple connections, it reuses a single connection to the DB to execute all queries.
- Makes good use of connection life cycle (closing connections, etc).
