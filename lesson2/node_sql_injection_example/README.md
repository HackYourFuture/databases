# SQL Injection Example App

## How to run it

- Run the SQL in `injection_db_schema.sql`.
- Install dependencies using `npm install` or `yarn install`.
- Copy `config-secret.json.dist` to `config-secret.json`.
- Run the server using `node server.js`, `npm start` or `yarn start`.
- Visit http://localhost:3000/ in your browser.

## Try it out

The DB has one user with email `foo@example.com` and password `password`.
Try logging in with this user to see that it works as expected.

Now try injecting some SQL by writing something like this in the email field:

	foo@example.com' OR 1 = 1; -- 

**Note**: It is important to end the input with a space after the two dashes!
For the password you can just put in a random string.

Will result in this query:

```sql
SELECT * FROM users WHERE email = 'foo@example.com' OR 1 = 1; -- ' AND password = ''
```
