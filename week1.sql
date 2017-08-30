use yasersomaf;

select *
from todos;

select *
from statuses;

-- Find out how many todo items are on the list
select count(*) as 'Quantity of todo items'
from todos;

-- Find out how many todo items on the list do not have a valid due date
select count(*) as 'Quantity of todo items that do not have a valid due date'
from todos
where Due is null;

-- Find all the todo items that are marked as done
select *
from todos
where Done = 1;

-- Find all the todo items that are not marked as done
select *
from todos
where Done = 0;

-- Get all the todo items, sorted with the most recent first
select *
from todos
order by Id desc;

-- Get the single most recently added todo item
select *
from todos
order by Id desc
limit 1;

-- Get the name and due date of all todo items about 'databases'
select Name, Due
from todos
where Name like '%databases%';

-- Get the name and status (as a string) of all todos
select todos.Name, statuses.Name as Status
from todos left outer join statuses
on todos.StatusId = statuses.Id;

-- Get the name of each status,
-- along with a count of how many todos have that status
select statuses.Name, count(todos.StatusId) as count
from todos inner join statuses
on todos.StatusId = statuses.Id
group by statuses.Name;

-- Get the names of all statuses,
-- sorted by most todos with that status to least
select statuses.Name
from todos inner join statuses
on todos.StatusId = statuses.Id
group by statuses.Name
order by count(todos.StatusId) desc;