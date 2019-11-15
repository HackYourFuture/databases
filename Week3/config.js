const databaseConfig = {
  hostname: "localhost",
  user: "hyfuser",
  password: "password",
  database: "todo"
};

const responseObject = {
  message: "",
  operation: ""
};

const isValidColorHex = testString => {
  return (
    typeof testString === "string" &&
    (testString.length === 6 || testString.length === 3) &&
    !isNaN(Number("0x" + testString))
  );
};

const port = 3000;

module.exports = {
  databaseConfig,
  responseObject,
  isValidColorHex,
  port
};
