import { createConnection } from "mysql";
export const connection = createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "meetup",
});
