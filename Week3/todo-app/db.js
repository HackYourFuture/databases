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
   */
  connect() {
    return new Promise((resolve, reject) => {
      this._connection.connect(err => {
        if (err) reject(err);
        else resolve("Successfully connected to mysql server.");
      });
    });
  }

  /**
   * Queries the database with the provided query string and parameters
   * @param {string} queryString Query string without parameters in
   * @param  {Array<string>} args Query strings parameters
   * @returns {Promise<Array>} queryResult
   */
  query(queryString, ...args) {
    if (!this._executeQuery) {
      this._executeQuery = promisify(
        this._connection.query.bind(this._connection)
      );
    }
    return this._executeQuery(queryString, args);
  }

  /**
   * Closes the connection to the mysql server
   */
  cleanup() {
    return new Promise((resolve, reject) => {
      this._connection.end(err => {
        if (err) reject(err);
        else resolve("Connection ended successfully.");
      });
    });
  }
}

/**
 * Exports a Singleton instance of DB class
 */
module.exports = new DB(databaseConfig);
