
SQL Normalization Exercise:
Columns violating 1NF:

food_code and food_description columns violate 1NF as they contain multiple values (e.g., C1, C2 and Curry, Cake).
Extractable Entities:

Members
Dinners
Venues
Foods
3NF Compliant Tables:

Members Table: member_id, member_name, member_address
Dinners Table: dinner_id, dinner_date, member_id
Venues Table: venue_code, venue_description
Foods Table: food_code, food_description
Dinner_Food (Junction Table): dinner_id, food_code