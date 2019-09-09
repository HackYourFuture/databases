
First we create a user for our application, we will use this values in the connection in database.js.
mysql> create user 'hyfclass4'@'localhost' identified with mysql_native_password by 'You have to select a good password here!';
Query OK, 0 rows affected (0.10 sec)

We grant everything because IT people like me is lazy but you should try giving the user only privileges on select, insert, update and delete and see what happens
mysql> grant all on world.* to 'hyfclass4'@'localhost';

Flush privileges will commit the privileges changes to the database
mysql> flush privileges;
Query OK, 0 rows affected (0.18 sec)

