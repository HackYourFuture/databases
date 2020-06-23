This folder contains a small codebase to setup a database with some content.
The database will contain information about users their projects and tasks.
Tasks can be assigned to users optionally which make for some nice example queries.

Create a database called `db_qa_session` or make changes to the `knexfile.js`

```
npm install
npx knex migrate:latest
npx knex seed:run
```

Your database should be filled with some demo content :)
