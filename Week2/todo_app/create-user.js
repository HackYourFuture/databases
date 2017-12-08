//To create user in MySQL/MariaDB 5.7.6 and higher, use CREATE USER syntax:
CREATE USER 'john_smith'@'localhost' IDENTIFIED BY 'supersecret';

//then to grant all access to the database (e.g. my_db), use GRANT Syntax, e.g.
GRANT ALL ON todo_app.* TO 'john_smith'@'localhost';