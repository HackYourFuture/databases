'use-strict';

const userError = `{
  "user": "string", (required)
  "email": "valid email" (required)
  }`;

const listError = `
  {
    "todoListName": "string",  (required)
    "reminder": "dd/mm/yyyy",
    }`;

const todoError = `
    {
      "todo": "string", (required)
      "done": "false",
      "dueDate": "dd/mm/yyyy",
      "tag": "xxx"
      }`;

const errorHandler = (req, res, error) =>
  res.status(400) &&
  res.send(`Error !!!
  You should run the functions by:

- selecting proper method

- using proper url

- inputting necessary information if needed at body in postman

Accept: application/json

${error}
`);

module.exports = { errorHandler, userError, listError, todoError };
