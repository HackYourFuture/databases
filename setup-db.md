# How to setup your first database

In this document you'll learn how to setup your first database. Most of the commands are done in the command line, so make sure you have yours open before you start.

**Step 1: Logging in with the `root` user**

To get started with your new MySQL client, we first have to login with the `root` user.

> A root user, also known as a `superuser` is a special user account that has access to all commands and files of any particular software.

In Windows OS, if you click on the Start menu and type `MySQL Command line Client`, then
the MySQL Command Line Client gives you a `msql>` prompt after typing in your root password.
Note that this password is the one you used for the `root user` of the mysql during the installation.
Linux and MAC users can execute `mysql -uroot -p` and then type your root password.

**Step 2: Creating a `hyfuser` account**

After loggin in with the root user, it's time to create the account we'll be using for this module. Execute the following commands, one after the other:

```bash
# Step 1: This command creates a user 'hyfuser' with password 'hyfpassword' for the database server at 'localhost'

mysql> create user 'hyfuser'@'localhost' identified with mysql_native_password by 'hyfpassword';

# If this does not work try the alternative command:

mysql> create user 'hyfuser'@'localhost' identified by 'hyfpassword';

# Step 2: This command gives all permissions to user 'hyfuser'. The (*.*) means every table of every database.

mysql> grant all privileges on *.* to 'hyfuser'@'localhost';

# Step 3: This command flushes all privileges

msyql> flush privileges;

# Step 4: This command creates a database named 'userdb'

mysql> create database userdb;
```

**Step 3: Installing MySQL driver to use with Node.js**

We want to use MySQL with JavaScript and to this end, we use the following [package](https://github.com/mysqljs/mysql).

-   Use `npm install -g mysql` command to install it.
-   Navigate to the `Week1` folder from the VScode terminal and then execute the command `node connection-test.js`

The output should be `The solution is: 2`.
