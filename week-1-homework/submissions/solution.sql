--- 1.Which car has the highest accelerate value?

select max(accelerate) from cars_data;
select id from cars_data where accelerate=25;
select make from car_names where id in (307,403);

--- 2.List the weight of the cars made in the 1980s (1980 and later).

select weight from cars_data where year>=1980;

--- 3.List all the cars made by chevrolet (where the model is chevrolet).

select make from car_names where model="chevrolet";

--- 4.What is the full name of the maker of the plymouth model?

select maker from models where name="plymouth";
select full_name from car_makers where id=6;


--- 5.Which continent is the Volvo car maker from?

select country from car_makers where maker="volvo";
select continent from countries where id=6;
select continent from continents where id=2;

--- 6.How many car models are audi?

select count(*) from car_names where model="audi";

--- 7.List all makers whose names start with s.

select maker from car_makers where maker like "s%";

--- 8.How many cars have a horsepower more than 100 but less than 200?

select count(*) from cars_data where horsepower between 100 and 200;

--- 9.List all car makers from australia.

select id from countries where name ="australia";
select maker from car_makers where country=11;

--- 10.List all car makers not from sweden, japan, france or germany.

 select *from countries where name in ("sweden","japan","france","germany");
 select *from car_makers where country not in (2,3,4,6);





