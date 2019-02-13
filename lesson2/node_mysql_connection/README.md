# Node MySQL connection

## How to run it

- Install dependencies using `npm install` or `yarn install`.
- Copy `config-secret.json.dist` to `config-secret.json` and fill in database, username and password.
- Run it with `node index.js`.

## Troubleshooting

If you see this error in the console:

> ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MariaDB client

You need to run this in workbench before you can connect to the database from Node:

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'my_password';
```

Change `my_password` to the MySQL root password you chose when installing MySQL.
