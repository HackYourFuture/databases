use mojlbhr;

-- Find out how many todo items are on the list
select
	count(*)
from
	todos;

-- Find out how many todo items on the list do not have a valid due date
select
	count(*)
from 
	todos
WHERE
	Due 
is NULL;

-- Find all the todo items that are marked as done
select
	Id, `Name`, Done
from 
	todos 
WHERE 
	Done = 1;

-- Find all the todo items that are not marked as done
select
	Id, `Name`, Done
from 
	todos 
WHERE 
	Done = 0;

-- Get all the todo items, sorted with the most recent first
select
	* 
from 
	todos 
ORDER BY 
	Id 
desc;
-- Get the single most recently added todo item
select
	* 
from 
	todos
ORDER BY
	id 
DESC LIMIT 1;
-- Get the name and due date of all todo items about 'databases'
select
	`Name`, Due
from 
	todos 
where
	`Name`
like '%databases%';

-- Get the name and status (as a string) of all todos
select
	todos.Name, statuses.Name As `Status`
from 
	todos 
left outer join 
	statuses
on 
	todos.StatusId = statuses.Id;

-- Get the name of each status, along with a count of how many todos have that status
select
	statuses.Name, count(todos.StatusId) AS result
from
	todos 
inner join
	statuses
on 
	todos.StatusId = statuses.Id
group by
	statuses.Name;

-- Get the names of all statuses, sorted by most todos with that status to least
select
	statuses.Name, count(todos.StatusId) AS result
from 
	todos 
inner join 
	statuses
on 
	todos.StatusId = statuses.Id
group by 
	statuses.Name
ORDER BY 
	 result
DESC;