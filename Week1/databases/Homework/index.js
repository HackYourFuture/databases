'use strict';

const util = require('util');
const mysql = require('mysql');
const {
  sqlCreateWorld,
  sqlCreateCountry,
  sqlCreateCity,
  sqlWorld,
  selectQueries,
  insertCityData,
  insertCountryData,
} = require('./query');

const Query = mysql.createConnection('mysql://hyfuser:hyfpassword@localhost/userdb');
const startQuery = util.promisify(Query.query.bind(Query));

(async () => {
  Query.connect();
  try {
    await startQuery(sqlCreateWorld);
    console.log('world database created');
    await startQuery(sqlWorld);
    await startQuery(sqlCreateCountry);
    console.log('country created');
    await startQuery(sqlCreateCity);
    console.log('city created');
    await startQuery(insertCountryData);
    await startQuery(insertCityData);
    console.log('Sample data inserted.')
    selectQueries.forEach(async query => {
      const result = await startQuery(query);
      console.log(JSON.parse(JSON.stringify(result)));
    });  
  } catch (err) {
    console.log({err});
  }finally {
    Query.end();
  }
})();