'use strict';

const util = require('util');
const mysql = require('mysql');
const {
  sqlCreateCity,
  sqlCreateCountry,
  sqlCreateWorldDB,
  sqlUseWorldDB,
  selectQueries,
} = require('./queries');

const conn = mysql.createConnection('mysql://hyfuser:hyfpassword@192.168.153.132/userdb');

const runQuery = util.promisify(conn.query.bind(conn));

(async () => {
  conn.connect();
  try {
    await query(sqlCreateWorldDB);
    console.log('world database created.');
    await runQuery(sqlUseWorldDB);
    await query(sqlCreateCountry);
    console.log('country table created.');
    await query(sqlCreateCity);
    console.log('city table created.');
    selectQueries.forEach(async query => {
      const result = await runQuery(query);
      console.log(JSON.parse(JSON.stringify(result)));
    });
  } catch (error) {
    console.log({ error });
  } finally {
    conn.end();
  }
})();
