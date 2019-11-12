class Logger {
  constructor(username) {
    this._username = username;
  }

  /**
   * Logs the operations to console with timestamp and user.
   * @param {string} operation
   */
  log(operation) {
    console.log(
      `[${new Date().toISOString()}]:  (${this._username}) => ${operation}`
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
