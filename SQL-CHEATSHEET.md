# SQL Cheatsheet

## Queries

### Specify what information to extract

```sql
SELECT column
```

## From which table

```sql
FROM table
```

## Only extract rows where the condition holds

(Used with an operator: `>, <, >=, <=, =, <>, BETWEEN, LIKE, IN`)
```sql
WHERE column = 'value'
```

## Combining `WHERE` clauses:

(Used with: `AND, OR`)
```sql
WHERE column = 'value' OR
      column = 'other value'
```

## Aggregating results:

(Used with: `SUM, COUNT, MIN, MAX, AVG`)
```sql
SELECT SUM(column)
FROM table
```

## Aliasing tables

```sql
SELECT column AS alias
FROM table
```
