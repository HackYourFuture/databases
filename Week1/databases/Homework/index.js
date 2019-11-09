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

const Query = mysql.createConnection('mysql://hyfuser:hyfpassword@192.168.153.132/userdb');
const startQuery = util.promisify(Query.query.bind(Query));

(async () => {
  Query.connect();
  try {
    await startQuery(sqlCreateWorld);
    console.log('world database created');
    await startQuery(sqlWorld);
    await startQuery(sqlCreateCity);
    console.log('city created');
    await startQuery(sqlCreateCountry);
    console.log('country created');
    await startQuery(insertCityData);
    await startQuery(insertCountryData);
    selectQueries.forEach(async query => {
      const result = await startQuery(query);
      console.log(JSON.parse(JSON.stringify(result)));
    });  
  } catch (err) {
    console.log({err});
  }
})();