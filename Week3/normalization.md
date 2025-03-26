# Week 3 - Exercise 3.1: SQL Normalization

## 1. What columns violate 1NF?

The column member_address may contain multiple values (e.g., street, postal code, city) within a single field, which violates the First Normal Form (1NF).  
Also, if a member attends multiple dinners and we store repeated data in multiple rows, it causes data redundancy, which also violates 1NF.

---

## 2. What entities do you recognize that could be extracted?

From the provided table, we can extract the following entities:

- *Members*
- *Dinners*
- *Venues*

---

## 3. Name all the tables and columns that would make a 3NF-compliant solution.

Here is a proposed normalized structure that follows 3NF:

### *Members*
- member_id (Primary Key)  
- member_name  
- member_address

### *Dinners*
- dinner_id (Primary Key)  
- dinner_date

### *Venues*
- venue_code (Primary Key)  
- venue_description

### *Dinner_Attendance*
- member_id (Foreign Key to Members)  
- dinner_id (Foreign Key to Dinners)  
- venue_code (Foreign Key to Venues)

This structure ensures that:
- Each table has a single purpose,
- There is no data redundancy,
- All non-key attributes are fully functionally dependent on the primary key.