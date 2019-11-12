const mysql = require("mysql");
const { promisify } = require("util");
const { databaseConfig } = require("./config");

class DB {
  /**
   * Creates connection to the mysql server with provided config.
   * @param {ConnectionConfig} config
   */
  constructor(config = {}) {
    this._connection = mysql.createConnection(config);
  }

  /**
   * Connects to the mysql database
   * @param {function(Error, string)} callback
   */
  connect(callback) {
    this._connection.connect(err => {
      if (err) return callback(err);
      callback(null, "Successfully connected to mysql server.");
    });
  }

  /**
   * Queries the database with the provided query string and parameters
   * @param {string} queryString Query string without parameters in
   * @param  {Array<string>} args Query strings parameters
   */
  query(queryString, ...args) {
    if (!this._executeQuery) {
      this._executeQuery = promisify(
        this._connection.query.bind(this._connection)
      );
    }
    return this._executeQuery(queryString, ...args);
  }

  /**
   * Closes the connection to the mysql server
   * @param {function(Error)} callback
   */
  cleanup(callback) {
    this._connection.end(callback);
  }
}

/**
 * Exports a Singleton instance of DB class
 */
module.exports = new DB(databaseConfig);
