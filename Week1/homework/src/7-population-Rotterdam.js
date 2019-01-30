   const population_statistics = require('./population_statistcs-function')

   const sql_query = `SELECT population FROM city WHERE name ='Rotterdam';`;
   const message = "population of Rotterdam :"
   const value = 'population';

   population_statistics(sql_query, message, value)