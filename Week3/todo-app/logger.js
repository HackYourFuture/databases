const user = require("./user");

class Logger {
  constructor() {
    this._user = user;
  }

  /**
   * Logs the operations to console with state, timestamp and user.
   * @param {string} operation
   */
  log(operation, isError = false) {
    if (isError)
      console.error(
        `Error [${new Date().toISOString()}]:  (${this._user.username}: ${
          this._user.id
        }) => ${operation}`
      );
    else
      console.log(
        `Success [${new Date().toISOString()}]:  (${this._user.username}: ${
          this._user.id
        }) => ${operation}`
      );
  }
}
/**
 * Exports a Singleton instance of Logger class
 */
module.exports = new Logger();
