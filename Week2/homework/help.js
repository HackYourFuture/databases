'use strict;';

const help = () => {
  console.log(`
  node-jS App 
  Choose one of these commands to query about every answer:
  use: node select [command] [query] [query]
 
  Options:
  
capital ....... display the capital city of country.
        example: node select capital syria
-------------------------------------------------------------
languages ....... display the languages of region.
        example: node select languages "Middle East"
-------------------------------------------------------------
total ....... display the number of cities in which language is spoken.
        example: node select total arabic
-------------------------------------------------------------
countries ....... display the countries that have the same languages in the same region.
        example: node select countries arabic "Middle East" 
-------------------------------------------------------------
continents ....... display all the continents with the number of languages spoken in each continent.
        use: node select continents
-------------------------------------------------------------
regions ....... display all regions name.
       use: node select regions
-------------------------------------------------------------

--------------------------------------------
To display help ...... use: node select help
--------------------------------------------

    `);
};

module.exports = help;
