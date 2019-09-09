'use strict';

const util = require('util');
const mysql = require('mysql');
const {
  sqlCreateCity,
  sqlCreateCountry,
  sqlCreateWorldDB,
  sqlAddCountryFK,
  sqlUseWorldDB,
  selectQueries,
  insertCityData,
  insertCountryData,
} = require('./queries');
// Using virtual ubuntu server on local running mysql instance => 192.168.153.132 IP of VM
const conn = mysql.createConnection('mysql://hyfuser:hyfpassword@192.168.153.132/userdb');

const runQuery = util.promisify(conn.query.bind(conn));

(async () => {
  conn.connect();
  try {
    await runQuery(sqlCreateWorldDB);
    console.log('world database created.');
    await runQuery(sqlUseWorldDB);
    await runQuery(sqlCreateCountry);
    console.log('country table created.');
    await runQuery(sqlCreateCity);
    console.log('city table created.');
    await runQuery(insertCountryData);
    await runQuery(insertCityData);
    console.log('Sample data inserted.');
    selectQueries.forEach(async query => {
      const result = await runQuery(query);
      console.log(JSON.parse(JSON.stringify(result)));
    });
    await runQuery(sqlAddCountryFK);
    console.log('country foreign key created.');
  } catch (error) {
    console.log({ error });
  } finally {
    conn.end();
  }
})();
