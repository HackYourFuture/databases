'use strict;';

const help = () => {
  console.log(`
  node-jS App 
  Choose one of these commands to query about every answer:
  use: node select [options]
  Options:
1 .... The names of countries with population greater than 8 million.
2 .... The names of countries that have “land” in their names.
3 .... The names of the cities with population in between 500,000 and 1 million.
4 .... The name of all the countries on the continent ‘Europe’.
5 .... List all the countries in the descending order of their surface areas.
6 .... The names of all the cities in the Netherlands.
7 .... The population of Rotterdam.
8 .... The top 10 countries by Surface Area.
9 .... The top 10 most populated cities in Netherlands.
10 ... The population of the world.


ex: node select 2
-------------------------------
To show help: node select help
-------------------------------
`);
};

module.exports = help;
