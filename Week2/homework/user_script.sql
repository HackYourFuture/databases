--CREATE USER AND GRANT PERMISSIONS--
CREATE USER 'todo_user'@'localhost' IDENTIFIED BY '123';
GRANT ALL PRIVILEGES ON todo_app.* TO 'todo_user'@'localhost';
--OR--
GRANT ALL PRIVILEGES ON todo_app.* To 'todo_user'@'localhost' IDENTIFIED BY '123';

--DELETE USER--
DROP USER 'todo_user'@'localhost';
