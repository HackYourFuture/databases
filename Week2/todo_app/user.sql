--CREATE USER AND GRANT PERMISSIONS--
CREATE USER 'user'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON todo_app.* TO 'todo_user'@'localhost';
--OR--
GRANT ALL PRIVILEGES ON todo_app.* To 'todo_user'@'localhost' IDENTIFIED BY '123';

--DELETE USER--
DROP USER 'todo_user'@'localhost';