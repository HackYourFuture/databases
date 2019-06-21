DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `additem`(
item_name VARCHAR(50),
list_name VARCHAR(50)
)
BEGIN
	DECLARE list_ID INT(20);
SELECT listID INTO list_ID FROM todolist WHERE name = list_name;
insert into todoitem (name) VALUES (item_name);
insert into iscomplete (iscomplete, todoID, listID) VALUES (false, last_insert_id(), list_ID);
END$$
DELIMITER ;


DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `addlist`(
listname VARCHAR(50),
username VARCHAR(50),
catname VARCHAR(50),
deadline_date DATETIME
)
BEGIN
insert into todolist (name, userID, catID, deadline) VALUES (listname, 
(SELECT userID from `user` WHERE name = username), 
(SELECT catID from `category` WHERE categoryname = catname),
deadline_date
);


END$$
DELIMITER ;