const population_statistics = require('./population_statistcs-function')

const sql_query = ` select SUM(population) from country;`;
const message = "population of the World :";
const objValue = 'SUM(population)';

population_statistics(sql_query, message, objValue);