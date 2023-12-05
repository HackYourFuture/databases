const setup = require("./setup");
const transfer = require("./transfer");

setup()
  .then(() => {
    transfer(201, 202, 2000, "Transfer from account 201 to account 202");
  })
  .catch((err) => {
    console.error("Error during setup:", err);
  });
