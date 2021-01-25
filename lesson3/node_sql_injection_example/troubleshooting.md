If the server does not start and gives authentication errors as below:
```
Error: 1251 - Client does not support authentication protocol requested by server; consider upgrading MySQL client
```
Then, you need to update the user using the following SQL commands:
```
DROP USER 'injection_app'@'localhost';
OR
DROP USER 'injection_app'@'%';

// Re-create user with different authentication plugin
CREATE USER 'injection_app'@'localhost' IDENTIFIED WITH mysql_native_password BY 'injection123';

// Re-grant permissions
GRANT ALL PRIVILEGES ON injection_app.* TO 'injection_app'@'localhost';
```
