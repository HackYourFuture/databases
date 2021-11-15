**Exercise 1 : Normalization**
1- food_code, food_description as they are violating the rule (every column should only contain a single value)

2- Members, Dinners, Venues, Food.

3- In this exercise I am assuming that the dinner happen in a specific venue, and that venue is responsible of what type of food is being served.Tabel(column1, column2, ..)
Mambers(member_id, member_name, member_address)
Dinners(dinner_id, dinner_date, venue_code)
Diner-Member(dinner_id, member_id)
Venues(venue_code, venue_Description)
Foods(food_code, food_description)
venue-food(venue_code, food_code)
