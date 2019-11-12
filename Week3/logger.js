class Logger {
  constructor(username = "NO_USER_PROVIDED") {
    this._username = username;
  }

  /**
   * Logs the operations to console with state, timestamp and user.
   * @param {string} operation
   */
  log(operation, isError = false) {
    if (isError)
      console.error(
        `Error [${new Date().toISOString()}]:  (${
          this._username
        }) => ${operation}`
      );
    else
      console.log(
        `Success [${new Date().toISOString()}]:  (${
          this._username
        }) => ${operation}`
      );
  }

  /**
   * @param {string} username
   */
  set username(username) {
    this._username = username;
  }
}
/**
 * Exports a Singleton instance of Logger class
 */
module.exports = new Logger();
